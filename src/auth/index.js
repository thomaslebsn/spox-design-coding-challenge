import history from "../routes/history";
import {notify} from "../components/Toast";
import {EasiiAuthenticationApiService, AUTHORIZATION_KEY} from "easii-io-web-service-library";
import ContentPublishingNotificationWSClient from "../websocket/ContentPublishingNotificationWSClient";

// LOGIN
const login = async ({username, password, remember}) => {
  const authService = new EasiiAuthenticationApiService();
  const result = await authService.login(username, password);
  console.log("==== Debugging Login Function ====");
  console.log(result);
  if (result) {
    localStorage.setItem("auth", true);
    const memberID = localStorage.getItem(AUTHORIZATION_KEY.MEMBER_ID, null);
    const userName = username ? username : null;
    console.log('ContentPublishingNotificationWSClient - USERID', memberID);
      console.log('ContentPublishingNotificationWSClient - USERNAME', userName);
    if(memberID && userName){
      
      ContentPublishingNotificationWSClient.__init(memberID,userName);
    }
    history.push("/");
    return true;
  } else {
    notify("The username or password is incorrect", "error");
    return false;
  }
};

// LOGOUT
const logout = () => {
  localStorage.removeItem("auth");
  localStorage.setItem(AUTHORIZATION_KEY.ACCESS_TOKEN, '');
  localStorage.setItem(AUTHORIZATION_KEY.TOKEN_TYPE, '');
  localStorage.setItem(AUTHORIZATION_KEY.AUTHORIZED_TOKEN_HEADER, '');
  localStorage.setItem(AUTHORIZATION_KEY.TOKEN_USER, '');
  localStorage.setItem(AUTHORIZATION_KEY.TOKEN_USER_EXPIRE, '');
  localStorage.setItem(AUTHORIZATION_KEY.MEMBER_ID, '');
  history.push("/login");
};

// LOGIN STATUS
const isLogin = () => {
  if (localStorage.getItem("auth")) return true;
  return false;
};

export {login, logout, isLogin};
