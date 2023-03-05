import React, {useContext} from 'react';
import {Cell, ControllerContext} from '@/components';
import {BOARD_SIZE} from '@/constants';

import './GameBoard.scss';

const boardCells: null[] = new Array(BOARD_SIZE).fill(null);

export const GameBoard = () => {
  const controllerContext = useContext(ControllerContext);

  return (
    <div className="game-board__container" tabIndex={0} onKeyDown={controllerContext?.onKeyPressed}>
      {boardCells.map((_, index) => {
        return <Cell key={index} cellCoords={index}></Cell>;
      })}
    </div>
  );
};
