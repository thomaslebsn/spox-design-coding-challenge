import history from "../routes/history";
import { notify } from "../components/Toast";

// LOGIN
const login = ({ username, password, remember }) => {
  if (username === "demo" && password === "demo") {
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

export { login, logout, isLogin };
