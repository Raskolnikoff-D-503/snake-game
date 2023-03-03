import React, {KeyboardEvent, ReactNode, useState, useCallback, useEffect} from 'react';
import {SnakeBodyPart, ControlKeys} from '@/types';
import {ControllerContext} from './ControllerContext';
import {getRandomCoordinates, isControlKeys, hasDuplicates} from '@/utils';
import {DIRECTION, KEYBOARD_DIRECTION, SPEED} from '@/constants';

type Props = {
  children: ReactNode;
};

// cases:
// 1. 0-19 & UP: +370 or GAME_OVER
// 2. 20-380 & LEFT: +19 or GAME_OVER
// 3. 380-399 & DOWN: -370 or GAME_OVER
// 4. 19-399 & RIGHT: -19 or GAME_OVER

const initialCoords: number = 312;
const initialSnakeCoords: SnakeBodyPart[] = [
  {
    coords: initialCoords,
    direction: DIRECTION.RIGHT,
  },
];

export const Controller = ({children}: Props) => {
  const [snakeCoords, setSnakeCoords] = useState<SnakeBodyPart[]>(initialSnakeCoords);
  const [appleCoords, setAppleCoords] = useState<number>(getRandomCoordinates());
  const [snakeMove, setSnakeMove] = useState<ControlKeys | null>(null);
  const [newSnakeBodyPart, setNewSnakeBodyPart] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const onKeyPressed = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();

      const key = event.key;
      if (isControlKeys(key) && key !== snakeMove) {
        setSnakeMove(key);
      }
    },
    [snakeCoords],
  );

  const onPause = useCallback(() => {
    setSnakeMove(null);
  }, []);

  const onStartOver = useCallback(() => {
    setIsGameOver(false);
    setSnakeMove(null);
    setSnakeCoords(initialSnakeCoords);
    setAppleCoords(getRandomCoordinates());
    setNewSnakeBodyPart(null);
  }, []);

  const moveSnakeTimeout = (key: ControlKeys) =>
    setInterval(() => {
      setSnakeCoords((current) => {
        return current.map((item, index, array) => {
          if (index === 0) {
            const direction = KEYBOARD_DIRECTION[key];

            // switch (true) {
            //   case item.coords <= 19 && item.direction === KEYBOARD_DIRECTION[KEYBOARD.UP]:
            //     direction = 380;
            //     break;
            //   case item.coords >= 380 && item.direction === KEYBOARD_DIRECTION[KEYBOARD.DOWN]:
            //     direction = -380;
            //     break;
            // }

            return {
              coords: item.coords + direction,
              direction,
            };
          } else {
            const direction = array[index - 1].direction;
            return {coords: item.coords + direction, direction};
          }
        });
      });

      if (snakeCoords[0].coords === 0 && snakeCoords[0].direction === KEYBOARD_DIRECTION[key]) {
        console.log('Game Is Over');

        setSnakeMove(null);
      }
    }, SPEED);

  useEffect(() => {
    let moveSnakeHandler: NodeJS.Timeout | undefined;

    if (snakeMove !== null && !isGameOver) {
      if (hasDuplicates(snakeCoords.map((item) => item.coords))) {
        console.log('Game Is Over');
        setIsGameOver(true);
        setSnakeMove(null);
      }

      moveSnakeHandler = moveSnakeTimeout(snakeMove);

      // if (
      //   snakeCoords[0].coords === 0 &&
      //   snakeCoords[0].direction === KEYBOARD_DIRECTION[KEYBOARD.UP]
      // ) {
      //   console.log('Game Is Over');

      //   setSnakeMove(null);
      // }

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
        setNewSnakeBodyPart(snakeCoords[snakeCoords.length - 1].coords);
        setAppleCoords(getRandomCoordinates());
      }
    }

    return () => {
      clearTimeout(moveSnakeHandler);
    };
  }, [snakeMove, snakeCoords]);

  return (
    <ControllerContext.Provider
      value={{
        onKeyPressed,
        onPause,
        onStartOver,
        points: snakeCoords.length,
        snakeCoords,
        appleCoords,
      }}
    >
      {children}
    </ControllerContext.Provider>
  );
};
