import React, {useContext} from 'react';
import {ControllerContext} from '@/components';

import './Cell.scss';

type Props = {
  cellCoords: number;
};

export const Cell = ({cellCoords}: Props) => {
  const controllerContext = useContext(ControllerContext);

  const isAppleOnCurrentCell = cellCoords === controllerContext?.appleCoords;
  const isSnakeOnCurrentCell = controllerContext?.snakeBody?.find(
    (coords) => coords.coords === cellCoords,
  );

  const conditionalClassNames = `${isAppleOnCurrentCell ? ' apple-placement' : ''}${
    isSnakeOnCurrentCell ? ' snake-placement' : ''
  }`;

  return <li className={`cell${conditionalClassNames}`} />;
};
