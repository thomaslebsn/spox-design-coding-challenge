import React from "react";
import { makeAutoObservable, runInAction } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import { EasiiInvesterContactApiService } from "easii-io-web-service-library";

export default class InvesterContactStore {
  async investerContactSave(callbackOnSuccess, callbackOnError, dataPost) {
    const investerContactService = new EasiiInvesterContactApiService();
    let response = null;
    console.log("dataPost dataPost", dataPost);
    response = await investerContactService.createInvesterContact(dataPost);

    console.log("response dataPost", response);
    if (response == true) {
      runInAction(() => {
        callbackOnSuccess(response);
      });
    } else {
      callbackOnError({
        message: "Something went wrong from Server response",
      });
    }
  }
}
