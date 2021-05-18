import React, { useState, useEffect } from 'react';
// import loadScript from '../../utils/loadScript';
// import removeScript from '../../utils/removeScript';
import initFacebookSdk from './initFacebookSdk';

const ButtonConnectFacebook = (props) => {
  const { scope, onFacebookSuccess, onFacebookFailure, buttonText, isDisable } = props;

  useEffect(() => {
    initFacebookSdk().then();
  }, []);

  const handleClick = () => {
    window.FB.login(
      function (response) {
        if (response.status === 'connected') {
          onFacebookSuccess(response);
        } else {
          onFacebookFailure();
        }
      },
      {
        scope: scope,
      }
    );
  };

  return (
    <>
      <button className="cursor-pointer btn btn-success" onClick={handleClick} disabled={isDisable}>
        <span className="ms-2">{buttonText}</span>
      </button>
    </>
  );
};

export default ButtonConnectFacebook;
