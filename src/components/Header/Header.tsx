import React, {useContext} from 'react';
import {ControllerContext} from '@/components';

import './Header.scss';

export const Header = () => {
  const controllerContext = useContext(ControllerContext);

  return <div className={'header'}>YOUR CURRENT SCORE: {controllerContext?.points ?? '...'}</div>;
};
