import React from 'react';
import {Board, ButtonGroup, Controller, Header} from '@/components';

import './App.scss';

// const initialCoords: number = 150;
// const initialSnakeCoords: SnakeBodyPart[] = [
//   {
//     coords: initialCoords,
//     direction: DIRECTION.RIGHT,
//   },
// ];

export const App = () => {
  // const [snakeCoords, setSnakeCoords] = useState<SnakeBodyPart[]>(initialSnakeCoords);
  // const [appleCoords, setAppleCoords] = useState<number>(getRandomCoordinates());
  // const [snakeMove, setSnakeMove] = useState<ControlKeys | null>(null);
  // const [newSnakeBodyPart, setNewSnakeBodyPart] = useState<number | null>(null);

  // const onKeyPressed = useCallback(
  //   (event: KeyboardEvent) => {
  //     event.preventDefault();

  //     const key = event.key;
  //     if (isControlKeys(key) && key !== snakeMove) {
  //       setSnakeMove(key);
  //     }
  //   },
  //   [snakeCoords],
  // );

  // const onStopClick = useCallback(() => {
  //   setSnakeMove(null);
  // }, []);

  // const onResetClick = useCallback(() => {
  //   setSnakeMove(null);
  //   setSnakeCoords(initialSnakeCoords);
  //   setAppleCoords(getRandomCoordinates());
  //   setNewSnakeBodyPart(null);
  // }, []);

  // useEffect(() => {
  //   let moveSnakeHandler: NodeJS.Timeout | undefined;
  //   clearTimeout(moveSnakeHandler);

  //   if (snakeMove !== null) {
  //     if (hasDuplicates(snakeCoords.map((item) => item.coords))) {
  //       console.log('Game Is Over');

  //       setSnakeMove(null);
  //     }

  //     moveSnakeHandler = setTimeout(() => {
  //       setSnakeCoords((current) => {
  //         return current.map((item, index, array) => {
  //           if (index === 0) {
  //             const direction = KEYBOARD_DIRECTION[snakeMove];
  //             return {
  //               coords: item.coords + direction,
  //               direction,
  //             };
  //           } else {
  //             const direction = array[index - 1].direction;
  //             return {coords: item.coords + direction, direction};
  //           }
  //         });
  //       });
  //     }, SPEED);
  //     const lastElement = snakeCoords.at(-1);

  //     if (
  //       newSnakeBodyPart !== null &&
  //       lastElement &&
  //       !snakeCoords.find((item) => item.coords === newSnakeBodyPart)
  //     ) {
  //       setSnakeCoords((current) => [
  //         ...current,
  //         {coords: newSnakeBodyPart, direction: lastElement.direction},
  //       ]);
  //       setNewSnakeBodyPart(null);
  //     }

  //     if (snakeCoords?.find((coords) => coords.coords === appleCoords)) {
  //       setNewSnakeBodyPart(snakeCoords[snakeCoords.length - 1].coords);
  //       setAppleCoords(getRandomCoordinates());
  //     }
  //   }

  //   return () => {
  //     clearTimeout(moveSnakeHandler);
  //   };
  // }, [snakeMove, snakeCoords]);

  return (
    <div className={'app'}>
      <Controller>
        <Header />
        <Board />
        <ButtonGroup />
      </Controller>
    </div>
  );
};
