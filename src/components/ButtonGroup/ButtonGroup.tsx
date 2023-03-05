import React, {useContext} from 'react';
import {Button, ControllerContext} from '@/components';

import './ButtonGroup.scss';

export const ButtonGroup = () => {
  const controllerContext = useContext(ControllerContext);

  return (
    <div className="button-group">
      <Button
        text="PAUSE"
        onClick={controllerContext?.onPauseClick}
        disabled={controllerContext?.isModalOpen}
      />
      <Button
        text="START OVER"
        onClick={controllerContext?.onStartOverClick}
        disabled={controllerContext?.isModalOpen}
      />
    </div>
  );
};
