export default function initInstagramSdk() {
    return new Promise((resolve) => {
      // wait for instagram sdk to initialize before starting the react app
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '128454746018550',
          cookie: true,
          xfbml: true,
          version: 'v10.0',
        });
  
        // auto authenticate with the api if already logged in with instagram
        window.FB.getLoginStatus(({ authResponse }) => {
          console.log(authResponse);
          if (authResponse) {
            //   accountService.apiAuthenticate(authResponse.accessToken).then(resolve);
          } else {
            resolve();
          }
        });
      };
  
      // load instagram sdk script
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    });
  }
  