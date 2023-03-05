import React, {useContext} from 'react';
import {ControllerContext} from '@/components';
import {LABEL, MESSAGE} from '@/constants';

import './InfoBoard.scss';

export const InfoBoard = () => {
  const controllerContext = useContext(ControllerContext);

  return (
    <div className="info-board__container">
      <h3>INFORMATION</h3>
      <div className="info-board__content">
        <h2>{controllerContext?.status ? LABEL[controllerContext?.status] : '---'}</h2>
        <p>{controllerContext?.status ? MESSAGE[controllerContext?.status] : '---'}</p>
      </div>
    </div>
  );
};
