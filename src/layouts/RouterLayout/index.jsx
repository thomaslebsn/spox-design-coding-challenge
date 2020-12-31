import React from "react";

import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import { authRoutes, mainRoutes } from "../../routes/routes";

import AuthLayout from "../AuthLayout";
import MainLayout from "../MainLayout";

import history from "../../routes/history";

const RouterLayout = () => {
  const authPath = authRoutes
    .map((item) => {
      return item.path;
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  const mainPath = mainRoutes
    .map((item) => {
      return item.path;
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  return (
    <BrowserRouter>
      <Router history={history}>
        <Switch>
          <Route exact path={authPath}>
            <AuthLayout />
          </Route>
          <Route exact path={mainPath}>
            <MainLayout />
          </Route>
        </Switch>
      </Router>
    </BrowserRouter>
  );
};

export default RouterLayout;
