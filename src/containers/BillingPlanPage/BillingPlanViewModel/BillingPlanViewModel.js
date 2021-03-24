import BillingPlanListViewModel from "./BillingPlanListViewModel";

class BillingPlanViewModel {
  BillingPlanListViewModel = null;

  constructor(billingPlanStore) {
    if (billingPlanStore) {
      console.log("AnalyticsViewModel - Abstract");
      this.BillingPlanListViewModel = new BillingPlanListViewModel(
        billingPlanStore
      );
    }
  }

  getBillingPlanListViewModel = () => this.BillingPlanListViewModel;
}

export default BillingPlanViewModel;
