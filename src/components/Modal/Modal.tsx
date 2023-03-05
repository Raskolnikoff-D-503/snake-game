import React, {ReactNode, useContext} from 'react';
import {ControllerContext} from '@/components';

import './Modal.scss';

type Props = {
  children: ReactNode;
};

export const Modal = ({children}: Props) => {
  const controllerContext = useContext(ControllerContext);

  if (!controllerContext?.isModalOpen) {
    return null;
  }

  return <div className="modal">{children}</div>;
};
