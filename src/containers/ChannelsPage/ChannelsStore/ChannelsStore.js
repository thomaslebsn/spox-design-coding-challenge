import React from "react";
import { makeAutoObservable, runInAction } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import { EasiiProjectChannelApiService } from "easii-io-web-service-library";

export default class ChannelsStore {
  async getChannelLoginUrl(
    callbackOnSuccess,
    callbackOnError,
    organizationID,
    channelUniqueName
  ) {
    try {
      const channelService = new EasiiProjectChannelApiService();
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
    organizationID,
    channelType
  ) {
    try {
      const channelService = new EasiiProjectChannelApiService();
      let result = null;

      switch (channelType) {
        case "facebook":
          result = await channelService.checkConnectionStatusFacebook(
            organizationID,
            channelType
          );
          break;

        case "twitter":
        case "linkedin":
        case "mailchimp":
        case "instagram":
        case "wordpress":
          result = await channelService.getCheckConnectStatusChannel(
            organizationID,
            channelType
          );
          break;

        default:
          break;
      }

      if (result) {
        runInAction(() => {
          callbackOnSuccess(result, organizationID, channelType);
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
    organizationID,
    pageIds
  ) {
    try {
      console.log("store organizationID", organizationID);
      console.log("store pageIds", pageIds);
      const channelService = new EasiiProjectChannelApiService();
      const response = await channelService.connectMultiFanpage(
        organizationID,
        pageIds
      );

      console.log("store response", response);
      if (response) {
        runInAction(() => {
          callbackOnSuccess(response, organizationID, pageIds);
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

  async getFacebookFanpages(
    callbackOnSuccess,
    callbackOnError,
    organizationID,
    pageIds
  ) {
    try {
      const channelService = new EasiiProjectChannelApiService();
      const response = await channelService.getListFanpage(
        organizationID,
        pageIds
      );
      if (response) {
        runInAction(() => {
          callbackOnSuccess(response, organizationID, pageIds);
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
    const channelService = new EasiiProjectChannelApiService();
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
