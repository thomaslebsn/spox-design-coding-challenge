import React from "react";
import { makeAutoObservable, runInAction } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import { EasiiOrganisationChannelApiService } from "easii-io-web-service-library";

export default class ChannelsStore {
  async getChannelLoginUrl(
    callbackOnSuccess,
    callbackOnError,
    channelUniqueName
  ) {
    try {
      const channelService = new EasiiOrganisationChannelApiService();
      console.log("channelUniqueName channelUniqueName");
      console.log(channelUniqueName);
      let response = null;

      switch (channelUniqueName) {
        case "fbad":
        case "facebook":
          response = await channelService.getLoginUrl(channelUniqueName);
          break;

        case "youtube":
        case "twitter":
        case "linkedin":
        case "mailchimp":
        case "instagram":
        case "tumblr":
          response = await channelService.getLoginUrl(channelUniqueName);
          break;

        default:
          break;
      }

      if (response) {
        runInAction(() => {
          callbackOnSuccess(response, channelUniqueName);
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
      console.log(channelType);
      const channelService = new EasiiOrganisationChannelApiService();
      let result = null;

      switch (channelType) {
        case "fbad":
        case "facebook":
          result = await channelService.checkConnectionStatusFacebook(
            channelType
          );
          break;

        case "youtube":
        case "twitter":
        case "linkedin":
        case "mailchimp":
        case "instagram":
        case "tumblr":
        case "wordpress":
        case "drupal":
        case "medium":
        case "joomla":
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

  async saveChosseFacebookAdAccount(
      callbackOnSuccess,
      callbackOnError,
      pageIds
  ) {
    try {
      console.log("store pageIds", pageIds);
      const channelService = new EasiiOrganisationChannelApiService();
      const response = await channelService.connectMultiAdAccount(pageIds);

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

  async getFacebookAdAccounts(callbackOnSuccess, callbackOnError, accountIds) {
    try {
      const channelService = new EasiiOrganisationChannelApiService();
      const response = await channelService.getListAdAccounts(accountIds);
      if (response) {
        runInAction(() => {
          callbackOnSuccess(response, accountIds);
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
      case "drupal":
      case "medium":
      case "joomla":
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
