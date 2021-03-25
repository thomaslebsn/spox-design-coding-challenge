import { makeAutoObservable } from "mobx";
import { BILLING_PLAN_COLUMN_INDICATOR } from "../../../constants/BillingPlanModule";
import { notify } from "../../../components/Toast";
import PAGE_STATUS from "../../../constants/PageStatus";

class BillingPlanListViewModel {
  billingPlanStore = null;
  tableStatus = PAGE_STATUS.READY;
  isDisable = false;
  show = false;
  hideChangePlanTable = false;

  constructor(billingPlanStore) {
    makeAutoObservable(this);
    this.billingPlanStore = billingPlanStore;
  }

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.show = false;
  };

  closeChangePlan = () => {
    this.hideChangePlanTable = false;
  };

  initializeData = () => {};

  getPayLinkModel = (planName) => {
    this.isDisable = true;
    this.closeModal();
    this.billingPlanStore.getPayLink(
      this.callbackGetLinkPayOnSuccessHandler,
      this.callbackGetLinkPayOnErrorHandler,
      planName
    );
  };

  callbackGetLinkPayOnSuccessHandler = (response) => {
    this.Paddle = window.Paddle;
    this.Paddle.Setup({
      vendor: 1407,
    });

    if (response) {
      this.isDisable = false;
      this.Paddle.Checkout.open({
        //override: "https://sandbox-checkout.paddle.com/checkout/custom/eyJ0IjoiU3Vic2NyaWJlIGVhc2lpIHBsYW4iLCJpIjoiaHR0cHM6XC9cL3NhbmRib3gtc3RhdGljLnBhZGRsZS5jb21cL2Fzc2V0c1wvaW1hZ2VzXC9jaGVja291dFwvZGVmYXVsdF9wcm9kdWN0X2ljb24ucG5nIiwiciI6Imh0dHA6XC9cL3Rlc3QubG9jYWxcL3BhZGRsZVwvd2ViaG9vay5waHAiLCJjbSI6IiIsInJlIjoxLCJwIjo5NjE2LCJhbCI6MCwiY2MiOnsiVVNEIjoiMCJ9LCJoIjoie1wibWVtYmVyX2lkXCI6NSxcInBsYW5fbmFtZVwiOlwiU21hbGxcIixcInBsYW5faWRcIjpcIjk2MTZcIn0iLCJ5IjoiIiwicSI6MCwicTIiOiIxIiwiZyI6MzYwMTUsImQiOiIxIiwiYSI6W10sInYiOiIxNDA3IiwiZHciOmZhbHNlLCJzIjoiMWEwZDY4MmEwNTBhYTljYWRjNmRkYmYxMWY1ZWFlYmRhZGFjM2Q1YTA0ODRiZGNiZGM2MmRjMWFmOThlYjZjYWM4M2Q3N2E1OGVlNTIzYWM5YWQ5N2RjYzY5ODAyMzc0MzFiZjE3ZmNhOGEzZWIxOTA5ODQ0MzA1ZmQ3ZDVlMDgifQ=="
        override: response.result.pay_link,
      });
      this.Paddle.Environment.set("sandbox");
      this.Paddle.Checkout.open({
        title: "Subscribe easii plan",
        product: 9616,
        email: "demo.kennguyen@gmail.com",
        passthrough:
          '{"member_id": 98765, "plan_name": "Acme Corp", "plan_id": "Acme Corp"}',
      });
      this.hideChangePlanTable = true;
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };

  callbackGetLinkPayOnErrorHandler = (error) => {
    console.log("callbackGetLinkPayOnErrorHandler");
    console.log(error);
    notify(error.message);
  };
}

export default BillingPlanListViewModel;
