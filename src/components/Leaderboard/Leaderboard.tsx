import React, {useContext} from 'react';
import {ControllerContext} from '@/components';

import './Leaderboard.scss';

export const Leaderboard = () => {
  const controllerContext = useContext(ControllerContext);

  return (
    <div className={'leaderboard__container'}>
      <h3>LEADERBOARD</h3>
      <ul className={'leaderboard__list'}>
        {controllerContext?.leaderboardData.map((item, index) => (
          <li
            key={`${item.info}${index}`}
            className={'leaderboard__item'}
          >{`${item.serialNumber}. ${item.info}`}</li>
        ))}
      </ul>
    </div>
  );
};
