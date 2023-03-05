import React from 'react';

import './Button.scss';

type Props = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const Button = ({text, onClick, disabled = false}: Props) => {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
