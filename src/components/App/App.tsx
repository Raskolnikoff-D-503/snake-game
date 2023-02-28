import React, {KeyboardEvent, useCallback, useEffect, useState} from 'react';
import {ControlKeys, SnakeBodyPart} from '@/types';
import {Board} from '@/components';
import {getRandomCoordinates, isControlKeys, hasDuplicates} from '@/utils';
import {SPEED, DIRECTION, KEYBOARD_DIRECTION} from '@/constants';

import './App.scss';

const initialCoords: number = 150;
const initialSnakeCoords: SnakeBodyPart[] = [
  {
    coords: initialCoords,
    direction: DIRECTION.RIGHT,
  },
];

export const App = () => {
  const [snakeCoords, setSnakeCoords] = useState<SnakeBodyPart[]>(initialSnakeCoords);
  const [appleCoords, setAppleCoords] = useState<number>(getRandomCoordinates());
  const [snakeMove, setSnakeMove] = useState<ControlKeys | null>(null);
  const [moveElementCoords, setMoveElementCoords] = useState<SnakeBodyPart[]>([]);
  const [newSnakeBodyPart, setNewSnakeBodyPart] = useState<number | null>(null);

  const onKeyPressed = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();

      const key = event.key;
      if (isControlKeys(key) && key !== snakeMove) {
        setSnakeMove(key);
        setMoveElementCoords((current) => {
          const currMoves = [...current];
          const coords = current.map((item) => item.coords);
          const index = coords.indexOf(snakeCoords[0].coords);

          if (index >= 0) {
            currMoves[index];
            return currMoves;
          }

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
    let moveSnakeHandler: NodeJS.Timeout | undefined;
    clearTimeout(moveSnakeHandler);

    if (snakeMove !== null) {
      setMoveElementCoords((current) => [
        ...current.reduce<SnakeBodyPart[]>((acc, curr) => {
          if (snakeCoords.find((item) => item.coords === curr.coords)) {
            return [...acc, curr];
          } else {
            return acc;
          }
        }, []),
      ]);

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
      <Board onKeyPressed={onKeyPressed} snakeCoords={snakeCoords} appleCoords={appleCoords} />
      <div className={'button-group'}>
        <button onClick={onStopClick}>Stop</button>
        <button onClick={onResetClick}>Reset</button>
      </div>
    </div>
  );
};
