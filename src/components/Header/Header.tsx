import React, {useContext} from 'react';
import {ControllerContext} from '@/components';

import './Header.scss';

export const Header = () => {
  const controllerContext = useContext(ControllerContext);

  return (
    <div className={'header'}>
      <h1>SNAKE GAME</h1>
      <h2>
        YOUR CURRENT SCORE: {controllerContext?.points ?? '...'}
      </h2>
    </div>
  );
};
