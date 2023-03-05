import React from 'react';
import {Board, ButtonGroup, Controller, Header, InfoBoard, Leaderboard} from '@/components';

import './App.scss';

export const App = () => {
  return (
    <div className={'app'}>
      <Controller>
        <Header />
        <div className={'app__container'}>
          <InfoBoard />
          <Board />
          <Leaderboard />
        </div>
        <ButtonGroup />
      </Controller>
    </div>
  );
};
