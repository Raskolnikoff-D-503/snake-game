import React from 'react';
import {
  Controller,
  Header,
  ButtonGroup,
  Modal,
  GameBoard,
  InfoBoard,
  Leaderboard,
  NewRecordForm,
} from '@/components';

import './App.scss';

export const App = () => {
  return (
    <div className="app">
      <Controller>
        <Header />
        <div className="app__container">
          <InfoBoard />
          <GameBoard />
          <Leaderboard />
        </div>
        <ButtonGroup />
        <Modal>
          <NewRecordForm />
        </Modal>
      </Controller>
    </div>
  );
};
