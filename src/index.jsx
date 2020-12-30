import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./translations/i18n";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import Spinner from "./components/Spinner";

const HomePage = lazy(() => import("./pages/Homepage"));

const Signuppage = lazy(() => import("./pages/Signuppage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const VerifyEmailPage = lazy(() => import("./pages/VerifyEmailPage"));
const WizardProjectPage = lazy(() => import("./pages/WizardProjectPage"));
const WizardPage = lazy(() => import("./pages/WizardPage"));

const CreateContentPage = lazy(() => import("./pages/CreateContentPage"));
const CampaignsPage = lazy(() => import("./pages/CampaignsPage"));
const WizardPopup = lazy(() => import("./pages/WizardPopup"));
const ChannelsPage = lazy(() => import("./pages/ChannelsPage"));
const SocialMediaPage = lazy(() => import("./pages/SocialMediaPage"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));
const PersonasPage = lazy(() => import("./pages/PersonasPage"));
const ContentPage = lazy(() => import("./pages/ContentPage"));

const Projects = lazy(() => import("./containers/Projects"));
const LoginPage = lazy(() => import("./containers/Loginpage"));

const history = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter>
    <Router history={history}>
      <App>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={Signuppage} />
            <Route
              exact
              path="/forgot-password"
              component={ForgotPasswordPage}
            />
            <Route exact path="/verify" component={VerifyEmailPage} />
            <Route exact path="/wizardproject" component={WizardProjectPage} />
            <Route exact path="/wizard" component={WizardPage} />
            <Route exact path="/createcontent" component={CreateContentPage} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/campaigns" component={CampaignsPage} />
            <Route exact path="/wizard-popup" component={WizardPopup} />
            <Route exact path="/channels" component={ChannelsPage} />
            <Route exact path="/social-media" component={SocialMediaPage} />
            <Route exact path="/calendar" component={CalendarPage} />
            <Route exact path="/personas" component={PersonasPage} />
            <Route exact path="/content" component={ContentPage} />
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
