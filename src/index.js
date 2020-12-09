import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./translations/i18n";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

const HomePage = lazy(() => import("./pages/Homepage"));
const LoginPage = lazy(() => import("./pages/Loginpage"));
const Signuppage = lazy(() => import("./pages/Signuppage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const VerifyEmailPage = lazy(() => import("./pages/VerifyEmailPage"));
const WizardPage = lazy(() => import("./pages/WizardPage"));

const history = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter>
    <Router history={history}>
      <App>
        <Suspense
          fallback={
            <div className="position-fixed top-50 start-50 translate-middle">
              <div className="spinner-border" role="status"></div>
            </div>
          }
        >
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route path="/signup" component={Signuppage} />
            <Route path="/forgot-password" component={ForgotPasswordPage} />
            <Route path="/verify" component={VerifyEmailPage} />
            <Route path="/wizard" component={WizardPage} />
          </Switch>
        </Suspense>
      </App>
    </Router>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
