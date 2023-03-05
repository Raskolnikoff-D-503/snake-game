import React, {ChangeEvent, KeyboardEvent, useContext, useState, useCallback} from 'react';
import {Button, ControllerContext} from '@/components';
import {ADDITIONAL_CONTROL_KEYS, NAME_LENGTH} from '@/constants';

import './NewRecordForm.scss';

const nameRegEx = /^[A-Za-z]+$/;

export const NewRecordForm = () => {
  const controllerContext = useContext(ControllerContext);

  const [txt, setTxt] = useState<string>('');

  const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;

    if (value === '' || nameRegEx.test(value)) {
      setTxt(value.toUpperCase());
    }
  }, []);

  const onClick = useCallback(() => controllerContext?.onSaveClick(txt), [txt]);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === ADDITIONAL_CONTROL_KEYS.SAVE) {
      onClick();
    }
  };

  return (
    <div className="new-record-form__container">
      <h3>NEW RECORD!</h3>
      <input
        value={txt}
        autoFocus
        className="new-record-form__input"
        maxLength={NAME_LENGTH}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
      />
      <Button text="SAVE" onClick={onClick} />
    </div>
  );
};
