import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import { notify } from "../../../components/Toast";

class ChannelsListViewModel {
  channelsStore = null;

  channles = null;

  tableStatus = PAGE_STATUS.LOADING;

  facebookConnected = false;

  twitterConnected = false;

  linkedinConnected = false;

  mailchimpConnected = false;

  instagramConnected = false;

  wordpressConnected = false;

  listFaceBookFanpage = null;

  listFaceBookFanpageView = null;

  showModalCMS = true;

  constructor(channelsStore) {
    makeAutoObservable(this);
    this.channelsStore = channelsStore;
  }

  connectLoginUrl = (organizationID, channelUniqueName) => {
    this.channelsStore.getChannelLoginUrl(
      this.callbackOnSuccessChannel,
      this.callbackOnErrorHander,
      organizationID,
      channelUniqueName
    );
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessChannel = (response, organizationID, channelUniqueName) => {
    if (response) {
      this.tableStatus = PAGE_STATUS.READY;

      window.open(response.result.loginUrl, "popup", "width=600,height=600");
      const stepInterval = 2000;
      let intervalTimeLimitInMiliseconds = stepInterval * 60;
      let checkConnectionStatusInterval = setInterval(
        () => {
          intervalTimeLimitInMiliseconds -= stepInterval;
          if (intervalTimeLimitInMiliseconds <= 0) {
            clearInterval(checkConnectionStatusInterval);
          }

          this.channelsStore.checkConnectedChannels(
            (response) => {
              if (response) {
                this.tableStatus = PAGE_STATUS.READY;

                let responseResult = response.result;
                switch (channelUniqueName) {
                  case "facebook":
                    if (responseResult.pages.status === "connected") {
                      this.facebookConnected = true;
                      clearInterval(checkConnectionStatusInterval);
                      this.listFaceBookFanpage = responseResult.pages.pages;
                    }
                    break;

                  case "twitter":
                    if (responseResult.connected == 1) {
                      this.twitterConnected = true;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;

                  case "linkedin":
                    if (responseResult.connected == 1) {
                      this.linkedinConnected = true;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;

                  case "mailchimp":
                    if (responseResult.connected == 1) {
                      this.mailchimpConnected = true;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;

                  case "instagram":
                    if (responseResult.connected == 1) {
                      this.instagramConnected = true;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;

                  default:
                    break;
                }
              }
            },
            (error) => {},
            organizationID,
            channelUniqueName
          );
        },
        stepInterval,
        organizationID,
        channelUniqueName
      );
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };

  saveChosseFacebookFanpages = (organizationID, pageIds) => {
    if (pageIds.length > 0) {
      this.channelsStore.saveChosseFacebookFanpages(
        this.callbackOnSuccessListFacebookFanpage,
        this.callbackOnErrorHander,
        organizationID,
        pageIds
      );
    }
  };

  callbackOnSuccessListFacebookFanpage = (
    response,
    organizationID,
    pageIds
  ) => {
    if (response) {
      this.tableStatus = PAGE_STATUS.READY;
      this.channelsStore.getFacebookFanpages(
        (respons) => {
          this.listFaceBookFanpageView = respons.result.pages.pages;
        },
        (error) => {},
        organizationID,
        pageIds
      );
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default ChannelsListViewModel;
