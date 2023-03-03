import React from 'react';
import {Board, ButtonGroup, Controller, Header} from '@/components';

import './App.scss';

export const App = () => {
  return (
    <div className={'app'}>
      <h1>SNAKE GAME</h1>
      <Controller>
        <Header />
        <Board />
        <ButtonGroup />
      </Controller>
    </div>
  );
};
