import React, { Suspense } from "react";

import { Route, Redirect } from "react-router-dom";
import { settingRoutes } from "../../routes/routes";

import Spinner from "../../components/Spinner";
import Header from "../../components/Header";
import SbarLeft from "../../components/SbarLeft";

import { isLogin } from "../../auth";

const SettingLayout = () => {
  return isLogin() ? (
    <div className="container-fluid">
      <div className="row">
        <main className="p-0">
          <Header />
          <div className="main_content vh-100 main_content_dashboard pd-t-80 d-flex">
            <SbarLeft settingPage />
            <div className="flex-1 border-start-1 border-gray bg-blue mh-100 overflow-hidden overflow-y-auto">
              <Suspense fallback={<Spinner />}>
                {settingRoutes.map(({ path, exact, main }, i) => {
                  return (
                    <Route key={i} exact={exact} path={path} component={main} />
                  );
                })}
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default SettingLayout;
