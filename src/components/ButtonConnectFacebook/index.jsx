import React, { useState, useEffect } from 'react';
// import loadScript from '../../utils/loadScript';
// import removeScript from '../../utils/removeScript';
import initFacebookSdk from './initFacebookSdk';

const ButtonConnectFacebook = (props) => {
  //   const { scope, appId, onLoadFailure } = props;

  useEffect(() => {
    initFacebookSdk().then();
  }, []);

  const handleClick = () => {
    window.FB.login(
      function (response) {
        console.log(response);
        // handle the response
      },
      { scope: 'email,user_likes' }
    );
  };

  return (
    <>
      <button onClick={handleClick}>test</button>
    </>
  );
};

export default ButtonConnectFacebook;
