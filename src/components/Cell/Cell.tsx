import React, {useContext} from 'react';
import {ControllerContext} from '@/components';

import './Cell.scss';

type Props = {
  cellCoords: number;
};

export const Cell = ({cellCoords}: Props) => {
  const controllerContext = useContext(ControllerContext);

  const isAppleOnCurrentCell = cellCoords === controllerContext?.appleCoords;
  const isSnakeOnCurrentCell = controllerContext?.snakeCoords?.find(
    (coords) => coords.coords === cellCoords,
  );

  return (
    <div
      className={`cell ${isAppleOnCurrentCell ? 'apple-placement' : ''} ${
        isSnakeOnCurrentCell ? 'snake-placement' : ''
      }`}
    >
      {cellCoords}
    </div>
  );
};
