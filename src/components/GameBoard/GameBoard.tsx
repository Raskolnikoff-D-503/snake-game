import React from 'react';
import {Cell} from '@/components';
import {BOARD_SIZE} from '@/constants';

import './GameBoard.scss';

const boardCells: null[] = new Array(BOARD_SIZE).fill(null);

export const GameBoard = () => {
  return (
    <div className="game-board__container">
      {boardCells.map((_, index) => (
        <Cell key={index} cellCoords={index}></Cell>
      ))}
    </div>
  );
};
