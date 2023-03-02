import React from 'react';
import {Board, ButtonGroup, Controller, Header} from '@/components';

import './App.scss';

export const App = () => {
  return (
    <div className={'app'}>
      <Controller>
        <Header />
        <Board />
        <ButtonGroup />
      </Controller>
    </div>
  );
};
