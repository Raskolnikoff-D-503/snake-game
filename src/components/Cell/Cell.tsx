import React from 'react';
import {SnakeBodyPart} from '@/types';

import './Cell.scss';

type Props = {
  cellCoords: number;
  appleCoords: number;
  snakeCoords: SnakeBodyPart[];
};

export const Cell = ({cellCoords, appleCoords, snakeCoords}: Props) => {
  const isAppleOnCurrentCell = cellCoords === appleCoords;
  const isSnakeOnCurrentCell = snakeCoords?.find((coords) => coords.coords === cellCoords);

  return (
    <div
      className={`cell ${isAppleOnCurrentCell ? 'apple-placement' : ''} ${
        isSnakeOnCurrentCell ? 'snake-placement' : ''
      }`}
    />
  );
};
