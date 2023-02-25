import React, {KeyboardEvent, useCallback, useEffect, useState} from 'react';
import {Cell} from './Cell';

import './App.scss';

const SPEED = 100;

const DIRECTION = {
  UP: -20,
  RIGHT: 1,
  DOWN: 20,
  LEFT: -1,
} as const;

const KEYBOARD_DIRECTION = {
  w: DIRECTION.UP,
  d: DIRECTION.RIGHT,
  s: DIRECTION.DOWN,
  a: DIRECTION.LEFT,
} as const;

export type SnakeBodyPart = {
  coords: number;
  direction: number;
};

type ControlKeys = keyof typeof KEYBOARD_DIRECTION;

const isControlKeys = (value: string): value is ControlKeys =>
  value === 'w' || value === 'a' || value === 's' || value === 'd';

const getRandomCoordinates = (): number => Math.floor(Math.random() * 400);

const hasDuplicates = (array: (string | number)[]): boolean =>
  array.some((item, index) => {
    return array.indexOf(item) !== index;
  });

const boardCells: null[] = new Array(400).fill(null);
const initialSnakeCoords: SnakeBodyPart[] = [
  {
    coords: 150,
    direction: DIRECTION.RIGHT,
  },
];

export const App = () => {
  const [snakeCoords, setSnakeCoords] = useState<SnakeBodyPart[]>(initialSnakeCoords);
  const [appleCoords, setAppleCoords] = useState<number>(getRandomCoordinates());
  const [snakeMove, setSnakeMove] = useState<string | null>(null);
  const [moveElementCoords, setMoveElementCoords] = useState<SnakeBodyPart[]>([]);
  const [newSnakeBodyPart, setNewSnakeBodyPart] = useState<number | null>(null);

  const onKeyPressed = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();

      const key = event.key;
      if (isControlKeys(key)) {
        setSnakeMove(key);
        setMoveElementCoords((current) => {
          return [...current, {coords: snakeCoords[0].coords, direction: KEYBOARD_DIRECTION[key]}];
        });
      }
    },
    [snakeCoords],
  );

  const onStopClick = useCallback(() => {
    setSnakeMove(null);
  }, []);

  const onResetClick = useCallback(() => {
    setSnakeMove(null);
    setMoveElementCoords([]);
    setSnakeCoords(initialSnakeCoords);
    setAppleCoords(getRandomCoordinates());
    setNewSnakeBodyPart(null);
  }, []);

  useEffect(() => {
    setMoveElementCoords((current) => [
      ...current.reduce<SnakeBodyPart[]>((acc, curr) => {
        if (snakeCoords.find((item) => item.coords === curr.coords)) {
          return [...acc, curr];
        } else {
          return acc;
        }
      }, []),
    ]);
  }, [snakeCoords]);

  useEffect(() => {
    let moveSnakeHandler: NodeJS.Timeout | undefined;
    clearTimeout(moveSnakeHandler);

    if (snakeMove !== null) {
      if (hasDuplicates(snakeCoords.map((item) => item.coords))) {
        console.log('Game Is Over');

        setSnakeMove(null);
      }

      moveSnakeHandler = setTimeout(() => {
        setSnakeCoords((current) => {
          return current.map((item) => {
            const move = moveElementCoords.find((coords) => coords.coords === item.coords);

            if (move) {
              return {coords: item.coords + move.direction, direction: move.direction};
            } else {
              return {...item, coords: item.coords + item.direction};
            }
          });
        });
      }, SPEED);
      const lastElement = snakeCoords.at(-1);

      if (
        newSnakeBodyPart !== null &&
        lastElement &&
        !snakeCoords.find((item) => item.coords === newSnakeBodyPart)
      ) {
        setSnakeCoords((current) => [
          ...current,
          {coords: newSnakeBodyPart, direction: lastElement.direction},
        ]);
        setNewSnakeBodyPart(null);
      }

      if (snakeCoords?.find((coords) => coords.coords === appleCoords)) {
        setNewSnakeBodyPart(appleCoords);
        setAppleCoords(getRandomCoordinates());
      }
    }

    return () => {
      clearTimeout(moveSnakeHandler);
    };
  }, [snakeMove, snakeCoords]);

  return (
    <div className={'app'}>
      <div className={'board'} tabIndex={0} onKeyDown={onKeyPressed}>
        {boardCells.map((_, index) => {
          return (
            <Cell
              key={index}
              className={'cell'}
              cellCoords={index}
              appleCoords={appleCoords}
              snakeCoords={snakeCoords}
            ></Cell>
          );
        })}
      </div>
      <div className={'button-group'}>
        <button onClick={onStopClick}>Stop</button>
        <button onClick={onResetClick}>Reset</button>
      </div>
    </div>
  );
};
