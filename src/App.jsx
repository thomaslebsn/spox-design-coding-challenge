import React, { Suspense } from "react";

import { BrowserRouter, Router, Route, Switch } from "react-router-dom";

import Spinner from "./components/Spinner";

import "./scss/app.scss";

import routes from "./routes/routes";
import history from "./routes/history";

class App extends React.Component {
  showContentMenu = (routes) => {
    var result = null;

    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={route.main}
          />
        );
      });
    }

    return result;
  };

  render() {
    return (
      <BrowserRouter>
        <Router history={history}>
          <Suspense fallback={<Spinner />}>
            <Switch>{this.showContentMenu(routes)}</Switch>
          </Suspense>
        </Router>
      </BrowserRouter>
    );
  }
}

export default App;
