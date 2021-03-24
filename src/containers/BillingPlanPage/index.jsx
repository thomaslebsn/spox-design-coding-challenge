import React, { lazy } from "react";

import { Route } from "react-router-dom";
import ComponentBillingPlan from "../../components/ComponentBillingPlan";
import BillingPlanStore from "./BillingPlanStore/BillingPlanStore";
import BillingPlanViewModel from "./BillingPlanViewModel/BillingPlanViewModel";

const billingPlanStore = new BillingPlanStore();
const billingPlanViewModel = new BillingPlanViewModel(billingPlanStore);
function BillingPlanPage({ match }) {
  return (
    <div className="py-4 px-3">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="text-blue-0">Billing & Plan</h2>
      </div>
      <ComponentBillingPlan billingPlanViewModel={billingPlanViewModel}/>
    </div>
  );
}

export default BillingPlanPage;
