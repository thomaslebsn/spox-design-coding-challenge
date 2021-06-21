import React from 'react';
import { runInAction } from 'mobx';

import {
  EasiiBillingPlanApiService,
  EasiiPersonaApiService,
  AUTHORIZATION_KEY,
} from 'easii-io-web-service-library';

export default class BillingPlanStore {
  memberId = localStorage.getItem(AUTHORIZATION_KEY.MEMBER_ID) ?? 0;

  // async getPayLink(planName, callbackOnSuccess, callbackOnError) {
  //   try {
  //     const billingPlanService = new EasiiBillingPlanApiService();
  //     let response = null;

  //     response = await billingPlanService.getPayLink(planName);

  //     if (response) {
  //       runInAction(() => {
  //         callbackOnSuccess(response);
  //       });
  //     } else {
  //       callbackOnError({
  //         message: 'Something went wrong from Server response',
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     runInAction(() => {
  //       callbackOnError(error);
  //     });
  //   }
  // }

  async getPayLink(planName, callbackOnSuccess, callbackOnError) {
    try {
      console.log('================');
      const billingPlanService = new EasiiBillingPlanApiService();
      const servicePersona = new EasiiPersonaApiService();
      let response = null;

      const memberInfo = await servicePersona.getMemberInfo();
      console.log('getPayLink');
      console.log(memberInfo);

      if (memberInfo.result) {
        console.log(memberInfo.result);
        memberInfo.result.plan = planName;
        response = await billingPlanService.createSubscription(memberInfo.result);
        console.log(response);
        if (response) {
          runInAction(() => {
            callbackOnSuccess(response);
          });
        } else {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        }
      } else {
        runInAction(() => {
          callbackOnError('Missing member info');
        });
      }
    } catch (error) {
      console.log('fdsfsdf');
      return;
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

      response = await billingPlanService.cancelSubscription(this.memberId);

      if (response) {
        runInAction(() => {
          callbackOnSuccess(response);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
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
      console.log('changeSubscriptionPlan');
      console.log(this.memberId);
      response = await billingPlanService.changeSubscriptionPlan(planName, this.memberId);
      console.log(response);

      if (response) {
        runInAction(() => {
          callbackOnSuccess(response);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
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
      response = await billingPlanService.getMemberSubscriptionDetail(this.memberId);
      console.log('getMemberSubscriptionDetail - store');
      console.log(response);

      runInAction(() => {
        callbackOnSuccess(response);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getMemberInvoices(callbackOnSuccess, callbackOnError) {
    try {
      console.log('getMemberInvoices');
      const billingPlanService = new EasiiBillingPlanApiService();
      let response = null;
      response = await billingPlanService.getMemberInvoices(this.memberId);

      if (response) {
        runInAction(() => {
          callbackOnSuccess(response);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getMemberUploadHistoryQuotas(callbackOnSuccess, callbackOnError) {
    try {
      const billingPlanService = new EasiiBillingPlanApiService();
      let response = null;
      response = await billingPlanService.getHistoryUploadQuotas(this.memberId);

      if (response) {
        runInAction(() => {
          callbackOnSuccess(response);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
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
