import React from 'react';

import { BrowserRouter, Router, Route, Switch, Redirect } from 'react-router-dom';
import { mainRoutes } from '../../routes/routes';

import MainLayout from '../MainLayout';

import history from '../../routes/history';

import { Toast } from '../../components/Toast';

const RouterLayout = () => {
  const mainPath = mainRoutes
    .map((item) => {
      return item.path;
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  return (
    <>
      <Toast />
      <BrowserRouter>
        <Router history={history}>
          <Switch>
            <Route exact path={mainPath}>
              <MainLayout />
            </Route>
          </Switch>
        </Router>
      </BrowserRouter>
    </>
  );
};

export default RouterLayout;
