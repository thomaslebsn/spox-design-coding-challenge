import React, { Suspense } from "react";

import { Route } from "react-router-dom";
import { authRoutes } from "../../routes/routes";
import Spinner from "../../components/Spinner";

const AuthLayout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <main>
          <Suspense fallback={<Spinner />}>
            {authRoutes.map(({ path, exact, main }, i) => {
              return (
                <Route key={i} exact={exact} path={path} component={main} />
              );
            })}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
