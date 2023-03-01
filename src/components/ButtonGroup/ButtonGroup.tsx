import React, {useContext} from 'react';
import {ControllerContext} from '@/components';

import './ButtonGroup.scss';

export const ButtonGroup = () => {
  const controllerContext = useContext(ControllerContext);

  return (
    <div className={'button-group'}>
      <button onClick={controllerContext?.onPause}>PAUSE</button>
      <button onClick={controllerContext?.onStartOver}>START OVER</button>
    </div>
  );
};
