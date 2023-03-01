import React, {useContext} from 'react';
import {Cell, ControllerContext} from '@/components';
import {BOARD_SIZE} from '@/constants';

import './Board.scss';

const boardCells: null[] = new Array(BOARD_SIZE.MEDIUM).fill(null);

export const Board = () => {
  const controllerContext = useContext(ControllerContext);

  return (
    <div className={'board'} tabIndex={0} onKeyDown={controllerContext?.onKeyPressed}>
      {boardCells.map((_, index) => {
        return <Cell key={index} cellCoords={index}></Cell>;
      })}
    </div>
  );
};
