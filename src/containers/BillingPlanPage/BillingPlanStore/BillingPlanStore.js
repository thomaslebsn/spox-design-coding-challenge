import React from "react";
import {makeAutoObservable, runInAction} from "mobx";

import {
  EasiiBillingPlanApiService,
} from "easii-io-web-service-library";

export default class BillingPlanStore {

  async getPayLink(
    callbackOnSuccess,
    callbackOnError,
    planName,
  ) {
    try {
      const billingPlanService = new EasiiBillingPlanApiService();
      console.log("==== api call getPayLink");
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
}
