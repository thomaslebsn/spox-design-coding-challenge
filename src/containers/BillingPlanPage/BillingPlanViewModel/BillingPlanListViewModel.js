import { makeAutoObservable } from "mobx";
import { BILLING_PLAN_COLUMN_INDICATOR } from "../../../constants/BillingPlanModule";
import { notify } from "../../../components/Toast";
import PAGE_STATUS from "../../../constants/PageStatus";

class BillingPlanListViewModel {
  billingPlanStore = null;
  tableStatus = PAGE_STATUS.READY;
  isDisable = false;
  show = false;
  hideChangePlanTable = true;
  paddleData = null;
  // subscriptionDetail = null;
  subscriptionDetail = {
    next_payment_amount: 99,
    next_payment_date: "Apr 29, 2021",
    name: "Pro",
    plan_detail: {
      amount: 99,
      name: "Pro",
    },
  };
  invoices = [];

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

  initializeData = () => {
    //get init member subscription detail
    this.billingPlanStore.getMemberSubscriptionDetail(
      (response) => {
        this.subscriptionDetail = response.result.data.subscription;
        this.paddleData = response.result.data.paddleData;
        if (this.subscriptionDetail === null) {
          this.hideChangePlanTable = false;
        }

        setTimeout(() => {
          this.setupPaddle();
        }, 200);
      },
      (error) => {}
    );

    //get member invoices
    this.billingPlanStore.getMemberInvoices(
      (response) => {
        this.invoices = response.list;
      },
      (error) => {}
    );
  };

  setupPaddle() {
    //init Paddle
    this.Paddle = window.Paddle;
    this.Paddle.Setup({
      vendor: parseInt(this.paddleData.vendorId), // paddle vendor id
      eventCallback: function (data) {
        // The data.event will specify the event type
        if (data.event === "Checkout.Complete") {
          console.log("Complete");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else if (data.event === "Checkout.Close") {
          console.log("Close");
        }

        console.log(data.eventData);
      },
    });
  }

  //get pay link
  getPayLinkModel = (planName) => {
    this.closeModal();

    //only get pay link when subscription plan detail is empty
    if (this.subscriptionDetail === null) {
      this.Paddle.Spinner.show();
      this.billingPlanStore.getPayLink(
        planName,
        (response) => {
          this.Paddle.Spinner.hide();
          if (response && response.result.pay_link) {
            this.Paddle.Checkout.open({
              override: response.result.pay_link,
            });
          } else {
            this.tableStatus = PAGE_STATUS.ERROR;
          }
        },
        (error) => {
          this.Paddle.Spinner.hide();
          notify(error.message);
        }
      );
    } else {
      this.changeSubscriptionPlan(planName);
    }
  };

  //upgrade subscription plan
  changeSubscriptionPlan = (planName) => {
    this.closeModal();
    this.Paddle.Spinner.show();
    this.billingPlanStore.changeSubscriptionPlan(
      planName,
      (response) => {
        this.Paddle.Spinner.hide();
        if (response.result.data === true) {
          notify("Update subscription success");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          notify(response.result.data.error, "error");
        }
      },
      (response) => {
        this.Paddle.Spinner.hide();
        notify(response.message, "error");
      }
    );
  };

  //cancel plan
  cancelPlan = () => {
    this.Paddle.Spinner.show();
    this.billingPlanStore.cancelSubscription(
      (response) => {
        this.Paddle.Spinner.hide();
        if (response.result.data === true) {
          notify("Cancel subscription success");
          this.hideChangePlanTable = false;
          this.subscriptionDetail = null;
        } else {
          notify(response.result.data.error, "error");
        }
      },
      (response) => {
        this.Paddle.Spinner.hide();
        notify(response.message, "error");
      }
    );
  };
}

export default BillingPlanListViewModel;
