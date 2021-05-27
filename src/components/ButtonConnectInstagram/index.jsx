import React, { useState, useEffect } from 'react';
import initInstagramSdk from './initInstagramSdk';

const ButtonConnectInstagram = (props) => {
  const { scope, onInstagramSuccess, onInstagramFailure, buttonText, isDisable } = props;

  useEffect(() => {
    initInstagramSdk().then();
  }, []);

  const handleClick = () => {
    window.FB.login(
      function (response) {
        if (response.status === 'connected') {
          onInstagramSuccess(response);
        } else {
          onInstagramFailure();
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

export default ButtonConnectInstagram;
