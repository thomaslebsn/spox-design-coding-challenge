import React, { lazy } from "react";

import { Route } from "react-router-dom";
import ComponentBillingPlan from "../../components/ComponentBillingPlan";

function BillingPlanPage({ match }) {
  return (
    <div className="py-4 px-3">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="text-blue-0">Billing & Plan</h2>
      </div>
      <ComponentBillingPlan />
    </div>
  );
}

export default BillingPlanPage;
