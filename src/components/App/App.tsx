import React from 'react';
import {Board, ButtonGroup, Controller, Header, Leaderboard} from '@/components';

import './App.scss';

export const App = () => {
  return (
    <div className={'app'}>
      <Controller>
        <Header />
        <div className={'app__container'}>
          <div>Additional Information</div>
          <Board />
          <Leaderboard />
        </div>
        <ButtonGroup />
      </Controller>
    </div>
  );
};
