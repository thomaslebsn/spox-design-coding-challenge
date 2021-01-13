import history from "../routes/history";
import { notify } from "../components/Toast";

// LOGIN
export const login = ({ username, password }) => {
  if (username === "demo" && password === "demo") {
    localStorage.setItem("auth", { username, password });
    history.push("/");
  } else {
    notify("The username or password is incorrect", "error");

    return true;
  }
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem("auth");
  history.push("/login");
};

// LOGIN STATUS
export const isLogin = () => {
  if (localStorage.getItem("auth")) return true;
  return false;
};
