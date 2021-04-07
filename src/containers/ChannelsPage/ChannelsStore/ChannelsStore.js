import React from "react";
import { makeAutoObservable, runInAction } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import { EasiiOrganisationChannelApiService } from "easii-io-web-service-library";

export default class ChannelsStore {
  async getChannelLoginUrl(
    callbackOnSuccess,
    callbackOnError,
    organizationID,
    channelUniqueName
  ) {
    try {
      const channelService = new EasiiOrganisationChannelApiService();
      console.log("channelUniqueName channelUniqueName");
      console.log(channelUniqueName);
      let response = null;

      switch (channelUniqueName) {
        case "facebook":
          response = await channelService.getLoginUrl(
            organizationID,
            channelUniqueName
          );
          break;

        case "twitter":
        case "linkedin":
        case "mailchimp":
        case "instagram":
        case "tumblr":
          response = await channelService.getLoginUrl(
            organizationID,
            channelUniqueName
          );
          break;

        default:
          break;
      }

      if (response) {
        runInAction(() => {
          callbackOnSuccess(response, organizationID, channelUniqueName);
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

  async checkConnectedChannels(
    callbackOnSuccess,
    callbackOnError,
    channelType
  ) {
    try {
      const channelService = new EasiiOrganisationChannelApiService();
      let result = null;

      switch (channelType) {
        case "facebook":
          result = await channelService.checkConnectionStatusFacebook(
            channelType
          );
          break;

        case "twitter":
        case "linkedin":
        case "mailchimp":
        case "instagram":
        case "tumblr":
        case "wordpress":
          result = await channelService.getCheckConnectStatusChannel(
            channelType
          );
          break;

        default:
          break;
      }

      if (result) {
        runInAction(() => {
          callbackOnSuccess(result, channelType);
        });
      } else {
        callbackOnError({
          message:
            "[checkConnectedChannels] - Something went wrong from Server response",
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError("[checkConnectedChannels] - " + error);
      });
    }
  }

  async saveChosseFacebookFanpages(
    callbackOnSuccess,
    callbackOnError,
    pageIds
  ) {
    try {
      console.log("store pageIds", pageIds);
      const channelService = new EasiiOrganisationChannelApiService();
      const response = await channelService.connectMultiFanpage(pageIds);

      console.log("store response", response);
      if (response) {
        runInAction(() => {
          callbackOnSuccess(response, pageIds);
        });
      } else {
        callbackOnError({
          message:
            "[intervalAskForConnectedChannels] - Something went wrong from Server response",
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError("[intervalAskForConnectedChannels] - " + error);
      });
    }
  }

  async getFacebookFanpages(callbackOnSuccess, callbackOnError, pageIds) {
    try {
      const channelService = new EasiiOrganisationChannelApiService();
      const response = await channelService.getListFanpage(pageIds);
      if (response) {
        runInAction(() => {
          callbackOnSuccess(response, pageIds);
        });
      } else {
        callbackOnError({
          message:
            "[intervalAskForConnectedChannels] - Something went wrong from Server response",
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError("[intervalAskForConnectedChannels] - " + error);
      });
    }
  }

  async connectCMS(
    callbackOnSuccess,
    callbackOnError,
    dataPost,
    channelUniqueName
  ) {
    const channelService = new EasiiOrganisationChannelApiService();
    console.log("channelUniqueName channelUniqueName");
    console.log(channelUniqueName);
    let response = null;

    switch (channelUniqueName) {
      case "wordpress":
        response = await channelService.doLoginCMS(dataPost);
        break;
      default:
        break;
    }

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
