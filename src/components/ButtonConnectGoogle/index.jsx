import React, { useState } from 'react';
import './index.scss';
import useGoogleLogin from './useGoogleLogin';

const ButtonConnectGoogle = (props) => {
  const { scope, clientId, onSuccess, onFailure, onRequest, className, isDisabled, buttonText } =
    props;

  const { signIn, loaded } = useGoogleLogin({
    clientId,
    scope,
    onSuccess,
    onFailure,
    onRequest,
  });

  return (
    <>
      <button type="button" className={className} onClick={signIn} disabled={isDisabled}>
        <span className="ms-2">{buttonText}</span>
      </button>
    </>
  );
};

export default ButtonConnectGoogle;
