import React, { Suspense } from "react";

import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import { authRoutes, mainRoutes } from "../../routes/routes";

import AuthLayout from "../AuthLayout";
import MainLayout from "../MainLayout";

import Spinner from "../../components/Spinner";
import history from "../../routes/history";

const RouterLayout = () => {
  const authPath = authRoutes.map((x) => x.path);
  const mainPath = mainRoutes.map((x) => x.path);

  console.log(mainPath);

  return (
    <BrowserRouter>
      <Router history={history}>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path={authPath}>
              <AuthLayout />
            </Route>

            <Route exact path={mainPath}>
              <MainLayout />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </BrowserRouter>
  );
};

export default RouterLayout;
