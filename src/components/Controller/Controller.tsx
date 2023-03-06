import React, {ReactNode, useState, useCallback, useEffect} from 'react';
import {SnakeBodyPart, ControlKeys, ScoreInfoType, StatusType} from '@/types';
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
import {
  ADDITIONAL_CONTROL_KEYS,
  CONTROL_KEYS,
  DIRECTION_NUMERIC,
  KEYBOARD_DIRECTION,
  MAX_NUMBER_OF_LEADERS,
  NAME_LENGTH,
  SPEED,
  STATUS,
} from '@/constants';

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

export const Controller = ({children}: Props) => {
  const scoreHistory = localStorage;

  const [status, setStatus] = useState<StatusType>(STATUS.START);
  const [currentScore, setCurrentScore] = useState<number>(initialScore);
  const [snakeBody, setSnakeBody] = useState<SnakeBodyPart[]>(initialSnakeCoords);
  const [appleCoords, setAppleCoords] = useState<number>(getRandomCoordinates());
  const [snakeMove, setSnakeMove] = useState<ControlKeys | null>(null);
  const [newSnakeBodyPart, setNewSnakeBodyPart] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onPauseClick = useCallback(() => {
    if (status !== STATUS.START && status !== STATUS.PAUSE) {
      setSnakeMove(null);
      setStatus(STATUS.PAUSE);
    }
  }, [status]);

  const onStartOverClick = useCallback(() => {
    if (status !== STATUS.START) {
      setStatus(STATUS.START);
      setIsGameOver(false);
      setSnakeMove(null);
      setCurrentScore(initialScore);
      setSnakeBody(initialSnakeCoords);
      setAppleCoords(getRandomCoordinates());
      setNewSnakeBodyPart(null);
    }
  }, [status]);

  const onSaveClick = useCallback(
    (value: string) => {
      if (value.length !== NAME_LENGTH) {
        setStatus(STATUS.ON_SAVE_ERROR);
      }

      if (value.length === NAME_LENGTH) {
        if (status === STATUS.ON_SAVE_ERROR) {
          setStatus(STATUS.GAME_OVER);
        }

        const scores: ScoreInfoType[] = Object.keys(scoreHistory).map((item) => getScoreInfo(item));
        const playerScore = getCurrentScoreInfo(currentScore, scores);

        if (scores.length < MAX_NUMBER_OF_LEADERS) {
          localStorage.setItem(transformToStorageData(playerScore), value);
        }

        if (
          scores.length >= MAX_NUMBER_OF_LEADERS &&
          scores.some((score) => score.number < playerScore.number)
        ) {
          localStorage.removeItem(getMinStorageData(scores));
          localStorage.setItem(transformToStorageData(playerScore), value);
        }

        setIsModalOpen(false);
      }
    },
    [scoreHistory, currentScore, status],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;

      if (!isModalOpen) {
        if (isControlKeys(key) && key !== snakeMove) {
          event.preventDefault();
          setSnakeMove(key);
        }

        if (key === ADDITIONAL_CONTROL_KEYS.PAUSE) {
          event.preventDefault();
          onPauseClick();
        }

        if (key === ADDITIONAL_CONTROL_KEYS.START_OVER) {
          event.preventDefault();
          onStartOverClick();
        }
      }
    },
    [snakeMove, isModalOpen],
  );

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

      if (status !== STATUS.GAME_IS_ON) {
        setStatus(STATUS.GAME_IS_ON);
      }

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
      setStatus(STATUS.GAME_OVER);
      setSnakeMove(null);

      const scores: ScoreInfoType[] = Object.keys(scoreHistory).map((item) => getScoreInfo(item));
      const playerScore = getCurrentScoreInfo(currentScore, scores);

      if (
        scores.length < MAX_NUMBER_OF_LEADERS ||
        (scores.length >= MAX_NUMBER_OF_LEADERS &&
          scores.some((score) => score.number < playerScore.number))
      ) {
        setIsModalOpen(true);
      }
    }
  }, [isGameOver]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <ControllerContext.Provider
      value={{
        status,
        points: currentScore,
        leaderboardData: getLeaderboardViewData(scoreHistory),
        snakeBody,
        appleCoords,
        isModalOpen,
        onPauseClick,
        onStartOverClick,
        onSaveClick,
      }}
    >
      {children}
    </ControllerContext.Provider>
  );
};
