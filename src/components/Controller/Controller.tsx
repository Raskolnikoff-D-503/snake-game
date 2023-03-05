import React, {KeyboardEvent, ReactNode, useState, useCallback, useEffect} from 'react';
import {SnakeBodyPart, ControlKeys, ScoreInfoType} from '@/types';
import {ControllerContext} from './ControllerContext';
import {
  getCurrentScoreInfo,
  getLeaderboardViewData,
  getMinStorageData,
  getRandomCoordinates,
  getScoreInfo,
  isControlKeys,
  transformToStorageData,
} from '@/utils';
import {CONTROL_KEYS, DIRECTION_NUMERIC, KEYBOARD_DIRECTION, SPEED} from '@/constants';

type Props = {
  children: ReactNode;
};

const initialScore: number = 1;
const initialCoords: number = 312;
const initialSnakeCoords: SnakeBodyPart[] = [
  {
    coords: initialCoords,
    direction: DIRECTION_NUMERIC.RIGHT,
  },
];

getCurrentScoreInfo(3, [
  {number: 3, subIndex: 1},
  {number: 3, subIndex: 2},
  {number: 3, subIndex: 3},
]);

export const Controller = ({children}: Props) => {
  const scoreHistory = localStorage;

  const [currentScore, setCurrentScore] = useState<number>(initialScore);
  const [snakeBody, setSnakeBody] = useState<SnakeBodyPart[]>(initialSnakeCoords);
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
    [snakeBody],
  );

  const onPause = useCallback(() => {
    setSnakeMove(null);
  }, []);

  const onStartOver = useCallback(() => {
    setIsGameOver(false);
    setSnakeMove(null);
    setCurrentScore(initialScore);
    setSnakeBody(initialSnakeCoords);
    setAppleCoords(getRandomCoordinates());
    setNewSnakeBodyPart(null);
  }, []);

  const moveSnakeTimeout = (key: ControlKeys, ms: number) =>
    setInterval(() => {
      setSnakeBody((current) => {
        let isBorder: boolean = false;

        return current.map((item, index, snakeArray) => {
          if (index === 0) {
            const direction = KEYBOARD_DIRECTION[key];

            switch (true) {
              case item.coords % 25 === 0 && direction === KEYBOARD_DIRECTION[CONTROL_KEYS.LEFT]:
              case item.coords % 25 === 24 && direction === KEYBOARD_DIRECTION[CONTROL_KEYS.RIGHT]:
              case item.coords <= 24 && direction === KEYBOARD_DIRECTION[CONTROL_KEYS.UP]:
              case item.coords >= 600 && direction === KEYBOARD_DIRECTION[CONTROL_KEYS.DOWN]:
              case snakeArray.some((snake) => snake.coords === item.coords + direction):
                setIsGameOver(true);
                isBorder = true;
                return {
                  coords: item.coords,
                  direction,
                };
            }

            return {
              coords: item.coords + direction,
              direction,
            };
          } else {
            const direction = snakeArray[index - 1].direction;
            return {coords: isBorder ? item.coords : item.coords + direction, direction};
          }
        });
      });
    }, ms);

  useEffect(() => {
    let moveSnakeHandler: NodeJS.Timeout | undefined;

    if (snakeMove !== null && !isGameOver) {
      moveSnakeHandler = moveSnakeTimeout(snakeMove, SPEED);

      const lastElement = snakeBody.at(-1);

      if (
        lastElement &&
        newSnakeBodyPart !== null &&
        !snakeBody.find((item) => item.coords === newSnakeBodyPart)
      ) {
        setSnakeBody((current) => [
          ...current,
          {coords: newSnakeBodyPart, direction: lastElement.direction},
        ]);
        setNewSnakeBodyPart(null);
      }

      if (snakeBody?.find((coords) => coords.coords === appleCoords)) {
        setCurrentScore((current) => ++current);
        setNewSnakeBodyPart(snakeBody[snakeBody.length - 1].coords);
        setAppleCoords(getRandomCoordinates());
      }
    }

    return () => {
      clearTimeout(moveSnakeHandler);
    };
  }, [snakeMove, snakeBody, isGameOver]);

  useEffect(() => {
    if (isGameOver) {
      console.log('Game Is Over');
      setSnakeMove(null);

      const scores: ScoreInfoType[] = Object.keys(scoreHistory).map((item) => getScoreInfo(item));
      const playerScore = getCurrentScoreInfo(currentScore, scores);

      if (scores.length < 12) {
        localStorage.setItem(transformToStorageData(playerScore), 'ZHENYA');
      }

      if (scores.length >= 12 && scores.some((score) => score.number < playerScore.number)) {
        localStorage.removeItem(getMinStorageData(scores));
        localStorage.setItem(transformToStorageData(playerScore), 'ZHENYA');
      }
    }
  }, [isGameOver]);

  return (
    <ControllerContext.Provider
      value={{
        points: currentScore,
        leaderboardData: getLeaderboardViewData(scoreHistory),
        snakeBody,
        appleCoords,
        onKeyPressed,
        onPause,
        onStartOver,
      }}
    >
      {children}
    </ControllerContext.Provider>
  );
};
