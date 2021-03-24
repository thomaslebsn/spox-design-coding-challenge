import {makeAutoObservable} from "mobx";
import {BILLING_PLAN_COLUMN_INDICATOR} from "../../../constants/BillingPlanModule";
import {notify} from "../../../components/Toast";

class BillingPlanViewModel {
  billingPlanStore = null;
  payLink = null;

  constructor(billingPlanStore) {
    makeAutoObservable(this);
    this.billingPlanStore = billingPlanStore;
  }

  initializeData = () => {

  }

  getPayLinkModel = (planName) => {
    console.log("==== call getPayLink");
    this.billingPlanStore.getPayLink(
      this.callbackGetLinkPayOnSuccessHandler,
      this.callbackGetLinkPayOnErrorHandler,
      planName
    );
  }

  callbackGetLinkPayOnSuccessHandler = (response) => {
    this.payLink = response.result.pay_link;
    //console.log("callbackGetLinkPayOnSuccessHandler", payLInk);
  }

  callbackGetLinkPayOnErrorHandler = (error) => {
    console.log("callbackGetLinkPayOnErrorHandler");
    console.log(error);
    notify(error.message);
  }
}

export default BillingPlanViewModel;
