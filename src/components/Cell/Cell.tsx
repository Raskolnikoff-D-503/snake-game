import React, {useContext} from 'react';
import {ControllerContext} from '@/components';

import './Cell.scss';

type Props = {
  cellCoords: number;
};

export const Cell = ({cellCoords}: Props) => {
  const controllerContext = useContext(ControllerContext);

  const isEvenNumber = cellCoords % 2 === 0;
  const isAppleOnCurrentCell = cellCoords === controllerContext?.appleCoords;
  const isSnakeOnCurrentCell = controllerContext?.snakeBody?.find(
    (coords) => coords.coords === cellCoords,
  );

  const conditionalClassNames = `${
    isEvenNumber ? 'cell--dark-background' : 'cell--light-background'
  } ${isAppleOnCurrentCell ? 'apple-placement' : ''} ${
    isSnakeOnCurrentCell ? 'snake-placement' : ''
  }`;

  return <div className={`cell ${conditionalClassNames}`} />;
};
