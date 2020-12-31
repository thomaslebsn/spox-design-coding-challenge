import React, { Component } from "react";

import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import { authRoutes, mainRoutes } from "../../routes/routes";

import Header from "../../components/Header";
import SbarLeft from "../../components/SbarLeft";

const MainLayout = () => {
  console.log("MainLayout");
  return (
    <div className="container-fluid">
      <div className="row">
        <main className="p-0">
          <Header />
          <div className="main_content vh-100 main_content_dashboard pd-t-80 d-flex">
            <SbarLeft />
            <div className="flex-1 border-start-1 border-gray bg-blue mh-100 overflow-hidden overflow-y-auto">
              {mainRoutes.map(({ path, exact, main }) => {
                return <Route exact={exact} path={path} component={main} />;
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
