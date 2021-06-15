import { makeAutoObservable } from 'mobx';
import { BILLING_PLAN_COLUMN_INDICATOR } from '../../../constants/BillingPlanModule';
import { notify } from '../../../components/Toast';
import PAGE_STATUS from '../../../constants/PageStatus';

class BillingPlanListViewModel {
  billingPlanStore = null;
  tableStatus = PAGE_STATUS.READY;
  isDisable = false;
  show = false;
  hideChangePlanTable = true;
  paddleData = null;
  subscriptionDetail = null;
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
        console.log('paddle - initializeData');
        console.log(response);
        this.subscriptionDetail = response.subscription;
        console.log(this.subscriptionDetail);
        this.paddleData = response.paddleData;
        if (this.subscriptionDetail === null || this.subscriptionDetail === undefined) {
          this.hideChangePlanTable = false;
        }
        this.setupPaddle();
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
    console.log('setupPaddle');
    console.log(this.paddleData.vendorId);
    this.Paddle = window.Paddle;
    this.Paddle.Setup({
      vendor: parseInt(this.paddleData.vendorId), // paddle vendor id
      // vendor: 1507, // paddle vendor id
      eventCallback: function (data) {
        // The data.event will specify the event type
        if (data.event === 'Checkout.Complete') {
          console.log('Complete');
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else if (data.event === 'Checkout.Close') {
          console.log('Close');
        }

        console.log(data.eventData);
      },
    });
  }

  // //get pay link
  // getPayLinkModel = (planName) => {
  //   this.closeModal();

  //   //only get pay link when subscription plan detail is empty
  //   if (this.subscriptionDetail === null) {
  //     this.Paddle.Spinner.show();
  //     this.billingPlanStore.getPayLink(
  //       planName,
  //       (response) => {
  //         this.Paddle.Spinner.hide();
  //         if (response && response.result.pay_link) {
  //           this.Paddle.Checkout.open({
  //             override: response.result.pay_link,
  //           });
  //         } else {
  //           this.tableStatus = PAGE_STATUS.ERROR;
  //         }
  //       },
  //       (error) => {
  //         this.Paddle.Spinner.hide();
  //         notify(error.message);
  //       }
  //     );
  //   } else {
  //     this.changeSubscriptionPlan(planName);
  //   }
  // };

  //get pay link
  getPayLinkModel = (planName) => {
    this.closeModal();
    console.log('getPayLinkModel');
    console.log(this.subscriptionDetail);
    //only get pay link when subscription plan detail is empty
    if (
      this.subscriptionDetail === null ||
      this.subscriptionDetail === undefined ||
      this.subscriptionDetail.paddle_status === 'deleted'
    ) {
      this.Paddle.Spinner.show();
      this.billingPlanStore.getPayLink(
        planName,
        (response) => {
          this.Paddle.Spinner.hide();
          if (response) {
            this.Paddle.Checkout.open({
              override: response,
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
    this.Paddle = window.Paddle;
    this.Paddle.Spinner.show();
    this.billingPlanStore.changeSubscriptionPlan(
      planName,
      (response) => {
        console.log('model - changeSubscriptionPlan');
        console.log(response);
        this.Paddle.Spinner.hide();
        if (response == true) {
          notify('Update subscription success');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          notify(response, 'error');
        }
      },
      (response) => {
        this.Paddle.Spinner.hide();
        notify(response.message, 'error');
      }
    );
  };

  //cancel plan
  cancelPlan = () => {
    this.Paddle = window.Paddle;
    this.Paddle.Spinner.show();
    this.billingPlanStore.cancelSubscription(
      (response) => {
        this.Paddle.Spinner.hide();
        if (response == true) {
          notify('Cancel subscription success');
          this.hideChangePlanTable = false;
          this.subscriptionDetail = null;
        } else {
          notify(response, 'error');
        }
      },
      (response) => {
        this.Paddle.Spinner.hide();
        notify(response.message, 'error');
      }
    );
  };
}

export default BillingPlanListViewModel;
