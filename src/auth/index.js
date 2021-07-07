import history from '../routes/history';
import { notify } from '../components/Toast';
import { EasiiAuthenticationApiService, AUTHORIZATION_KEY } from 'easii-io-web-service-library';
import ContentPublishingNotificationWSClient from '../websocket/ContentPublishingNotificationWSClient';

// LOGIN
const login = async ({ username, password, remember }) => {
  const authService = new EasiiAuthenticationApiService();
  const result = await authService.login(username, password);
  console.log('==== Debugging Login Function ====');
  console.log(result);
  if (result) {
    localStorage.setItem('auth', true);
    history.push('/');
    return true;
  } else {
    notify('The username or password is incorrect', 'error');
    return false;
  }
};

const autoLogoutInitalization = () => {
  console.log('autoLogoutInitalization.INITIALIZE');
  const stepInterval = 2000;
  let intervalCheckValidAccess = setInterval(() => {
    console.log('autoLogoutInitalization.TICK');
    const isAuthenticated = localStorage.getItem('auth', false);
    const userID = localStorage.getItem(AUTHORIZATION_KEY.MEMBER_ID, null);
    const userName = localStorage.getItem(AUTHORIZATION_KEY.MEMBER_EMAIL, null);
    if (!isAuthenticated || !userID || !userName) {
      clearInterval(intervalCheckValidAccess);
      logout();
    }
  }, stepInterval);
};

// LOGOUT
const logout = () => {
  localStorage.removeItem('auth');
  localStorage.setItem(AUTHORIZATION_KEY.ACCESS_TOKEN, '');
  localStorage.setItem(AUTHORIZATION_KEY.TOKEN_TYPE, '');
  localStorage.setItem(AUTHORIZATION_KEY.AUTHORIZED_TOKEN_HEADER, '');
  localStorage.setItem(AUTHORIZATION_KEY.TOKEN_USER, '');
  localStorage.setItem(AUTHORIZATION_KEY.TOKEN_USER_EXPIRE, '');
  localStorage.setItem(AUTHORIZATION_KEY.MEMBER_ID, '');

  if (window.ContentPublishingNotificationWSClient) {
    window.ContentPublishingNotificationWSClient.closeWebSocketClientInstance();
  }

  history.push('/login');
};

// LOGIN STATUS
const isLogin = () => {
  const isAuthenticated = localStorage.getItem('auth', false);
  const userID = localStorage.getItem(AUTHORIZATION_KEY.MEMBER_ID, null);
  const userName = localStorage.getItem(AUTHORIZATION_KEY.MEMBER_EMAIL, null);
  if (isAuthenticated && userID && userName) {
    autoLogoutInitalization();
    ContentPublishingNotificationWSClient.__init();
    return true;
  }
  return false;
};

export { login, logout, isLogin, autoLogoutInitalization };
