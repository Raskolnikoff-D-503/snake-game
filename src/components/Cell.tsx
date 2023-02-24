import React from 'react';
import {SnakeBodyPart} from './App';

import './Cell.scss';

type Props = {
  className: string;
  cellCoords: number;
  appleCoords: number;
  snakeCoords: SnakeBodyPart[];
};

export const Cell = ({className, cellCoords, appleCoords, snakeCoords}: Props) => {
  const isAppleOnCurrentCell = cellCoords === appleCoords;
  const isSnakeOnCurrentCell = snakeCoords?.find((coords) => coords.coords === cellCoords);

  return (
    <div
      className={`${className} ${isAppleOnCurrentCell ? 'apple-placement' : ''} ${
        isSnakeOnCurrentCell ? 'snake-placement' : ''
      }`}
    ></div>
  );
};
