import history from "../routes/history";
import {notify} from "../components/Toast";
import {EasiiAuthenticationApiService, AUTHORIZATION_KEY} from "easii-io-web-service-library";

// LOGIN
const login = async ({username, password, remember}) => {
  const authService = new EasiiAuthenticationApiService();
  const result = await authService.login(username, password);
  console.log("==== Debugging Login Function ====");
  console.log(result);
  if (result) {
    localStorage.setItem("auth", true);
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
  localStorage.setItem(AUTHORIZATION_KEY.MEMBER_FULL_NAME, '');
  history.push("/login");
};

// LOGIN STATUS
const isLogin = () => {
  if (localStorage.getItem("auth")) return true;
  return false;
};

export {login, logout, isLogin};
