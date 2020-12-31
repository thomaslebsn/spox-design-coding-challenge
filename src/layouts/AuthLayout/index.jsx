import React, { Component } from "react";

import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import { authRoutes, mainRoutes } from "../../routes/routes";

const AuthLayout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <main>
          {authRoutes.map(({ path, exact, main }, i) => {
            return <Route key={i} exact={exact} path={path} component={main} />;
          })}
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
