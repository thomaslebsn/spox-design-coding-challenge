import history from "../routes/history";
import {notify} from "../components/Toast";
import {EasiiAuthenticationApiService} from "easii-io-web-service-library";

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
  history.push("/login");
};

// LOGIN STATUS
const isLogin = () => {
  if (localStorage.getItem("auth")) return true;
  return false;
};

export {login, logout, isLogin};
