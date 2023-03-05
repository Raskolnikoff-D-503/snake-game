import React, {ChangeEvent, useContext, useState} from 'react';
import {Button, ControllerContext} from '@/components';

import './NewRecordForm.scss';

export const NewRecordForm = () => {
  const controllerContext = useContext(ControllerContext);

  const [txt, setTxt] = useState<string>('');

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;

    const re = /^[A-Za-z]+$/;
    if (value === '' || re.test(value)) {
      setTxt(value.toUpperCase());
    }
  };

  return (
    <div className="new-record-form__container">
      <h3>NEW RECORD!</h3>
      <input
        value={txt}
        autoFocus
        className="new-record-form__input"
        maxLength={6}
        onChange={onInputChange}
      />
      <Button text="SAVE" onClick={() => controllerContext?.onSaveClick(txt)} />
    </div>
  );
};
