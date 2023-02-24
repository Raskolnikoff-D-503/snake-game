import React, {KeyboardEvent, useCallback, useEffect, useState} from 'react';
import {Cell} from './Cell';

import './App.scss';

export type SnakeBodyPart = {
  coords: number;
  direction: number | null;
};

const SPEED = 200;

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

const getRandomCoordinates = (): number => Math.floor(Math.random() * 400);
const boardCells: null[] = new Array(400).fill(null);
const initialSnakeCoords: SnakeBodyPart[] = [
  {
    coords: 150,
    direction: null,
  },
];

export const App = () => {
  const [snakeCoords, setSnakeCoords] = useState<SnakeBodyPart[]>(initialSnakeCoords);
  const [appleCoords, setAppleCoords] = useState<number>(getRandomCoordinates());
  const [snakeMove, setSnakeMove] = useState<string | null>(null);
  const [moveElementCoords, setMoveElementCoords] = useState<SnakeBodyPart[]>([]);

  const onKeyPressed = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();

      if (event.key === 'w' || event.key === 's' || event.key === 'd' || event.key === 'a') {
        // setMoveElementCoords((current) => {
        //   return [
        //     ...current,
        //     {coords: snakeCoords[0].coords, direction: KEYBOARD_DIRECTION[event.key]},
        //   ];
        // });
        setSnakeMove(event.key);
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
  }, []);

  useEffect(() => {
    console.log(KEYBOARD_DIRECTION[snakeMove], moveElementCoords.at(-1)?.direction);
    setMoveElementCoords((current) => [
      ...current.reduce<SnakeBodyPart[]>((acc, curr) => {
        if (snakeCoords.find((item) => item.coords === curr.coords)) {
          return [...acc, curr];
        } else {
          return [...acc];
        }
      }, []),
      ...(KEYBOARD_DIRECTION[snakeMove] !== current.at(-1)?.direction
        ? [{coords: snakeCoords[0].coords, direction: KEYBOARD_DIRECTION[snakeMove]}]
        : []),
    ]);
  }, [snakeCoords, snakeMove]);

  useEffect(() => {
    let moveSnakeHandler: NodeJS.Timeout | undefined;
    clearTimeout(moveSnakeHandler);

    if (snakeMove !== null) {
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
    }

    return () => {
      clearTimeout(moveSnakeHandler);
    };
  }, [snakeMove, snakeCoords]);

  useEffect(() => {
    if (snakeCoords?.find((coords) => coords.coords === appleCoords)) {
      setAppleCoords(getRandomCoordinates());
      setTimeout(() => {
        setSnakeCoords((current) => [
          ...current,
          {coords: appleCoords, direction: current.at(-1).direction},
        ]);
      }, SPEED * (snakeCoords.length + 1));
    }
  }, [snakeCoords, appleCoords]);

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
