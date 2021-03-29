import React from "react";
import {runInAction} from "mobx";

import {EasiiBillingPlanApiService} from "easii-io-web-service-library";

export default class BillingPlanStore {
  async getPayLink(planName, callbackOnSuccess, callbackOnError) {
    try {
      const billingPlanService = new EasiiBillingPlanApiService();
      let response = null;

      response = await billingPlanService.getPayLink(planName);

      if (response) {
        runInAction(() => {
          callbackOnSuccess(response);
        });
      } else {
        callbackOnError({
          message: "Something went wrong from Server response",
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async cancelSubscription(callbackOnSuccess, callbackOnError) {
    try {
      const billingPlanService = new EasiiBillingPlanApiService();
      let response = null;

      response = await billingPlanService.cancelSubscription();

      if (response) {
        runInAction(() => {
          callbackOnSuccess(response);
        });
      } else {
        callbackOnError({
          message: "Something went wrong from Server response",
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async changeSubscriptionPlan(planName, callbackOnSuccess, callbackOnError) {
    try {
      const billingPlanService = new EasiiBillingPlanApiService();
      let response = null;

      response = await billingPlanService.changeSubscriptionPlan(planName);

      if (response) {
        runInAction(() => {
          callbackOnSuccess(response);
        });
      } else {
        callbackOnError({
          message: "Something went wrong from Server response",
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getMemberSubscriptionDetail(callbackOnSuccess, callbackOnError) {
    try {
      const billingPlanService = new EasiiBillingPlanApiService();
      let response = null;

      response = await billingPlanService.getMemberSubscriptionDetail();

      if (response) {
        runInAction(() => {
          callbackOnSuccess(response);
        });
      } else {
        callbackOnError({
          message: "Something went wrong from Server response",
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getMemberInvoices(callbackOnSuccess, callbackOnError) {
    try {
      const billingPlanService = new EasiiBillingPlanApiService();
      let response = null;

      response = await billingPlanService.getMemberInvoices();

      if (response) {
        runInAction(() => {
          callbackOnSuccess(response);
        });
      } else {
        callbackOnError({
          message: "Something went wrong from Server response",
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
