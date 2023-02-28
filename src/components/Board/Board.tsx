import React, {KeyboardEvent} from 'react';
import {SnakeBodyPart} from '@/types';
import {Cell} from '@/components';
import {BOARD_SIZE} from '@/constants';

import './Board.scss';

type Props = {
  onKeyPressed: (event: KeyboardEvent) => void;
  snakeCoords: SnakeBodyPart[];
  appleCoords: number;
};

const boardCells: null[] = new Array(BOARD_SIZE.MEDIUM).fill(null);

export const Board = ({onKeyPressed, snakeCoords, appleCoords}: Props) => {
  return (
    <div className={'board'} tabIndex={0} onKeyDown={onKeyPressed}>
      {boardCells.map((_, index) => {
        return (
          <Cell
            key={index}
            cellCoords={index}
            appleCoords={appleCoords}
            snakeCoords={snakeCoords}
          ></Cell>
        );
      })}
    </div>
  );
};
