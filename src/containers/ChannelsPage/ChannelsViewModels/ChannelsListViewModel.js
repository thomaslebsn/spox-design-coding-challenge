import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import { notify } from "../../../components/Toast";

class ChannelsListViewModel {
  channelsStore = null;

  channles = null;

  tableStatus = PAGE_STATUS.LOADING;

  facebookConnected = false;

  facebookAdsConnected = false;

  youtubeConnected = false;

  twitterConnected = false;

  linkedinConnected = false;

  mailchimpConnected = false;

  instagramConnected = false;

  wordpressConnected = false;

  mediumConnected = false;

  joomlaConnected = false;

  listFaceBookFanpage = null;

  listFaceBookFanpageView = null;

  listFaceBookAdsAccount = null;

  listFaceBookAdsAccountView = null;

  showModalCMS = true;

  tumblrConnected = false;

  mustUpgrade = false;

  showUpgrade = false;

  drupalConnected = false;

  /**
   * Wordpress: 1
   * Drupal: 2
   */
  cmsChannelType = 1;

  constructor(channelsStore) {
    makeAutoObservable(this);
    this.channelsStore = channelsStore;
  }

  connectLoginUrl = (channelUniqueName) => {
    this.channelsStore.getChannelLoginUrl(
      this.callbackOnSuccessChannel,
      this.callbackOnErrorHander,
      channelUniqueName
    );
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessChannel = (response, channelUniqueName) => {
    if (response) {
      this.tableStatus = PAGE_STATUS.READY;
      console.log("callbackOnSuccessChannel");

      if (response.result.must_upgrade) {
        this.mustUpgrade = true;
        return;
      }
      window.open(response.result.loginUrl, "popup", "width=600,height=600");
      const stepInterval = 2000;
      let intervalTimeLimitInMiliseconds = stepInterval * 60;
      let checkConnectionStatusInterval = setInterval(
        () => {
          intervalTimeLimitInMiliseconds -= stepInterval;
          if (intervalTimeLimitInMiliseconds <= 0) {
            clearInterval(checkConnectionStatusInterval);
          }
          console.log(channelUniqueName);
          this.channelsStore.checkConnectedChannels(
            (response) => {
              if (response) {
                this.tableStatus = PAGE_STATUS.READY;

                let responseResult = response.result;

                switch (channelUniqueName) {
                  case "fbad": //facebookAdConnected
                    if (responseResult.pages.status === "connected") {
                      this.facebookAdsConnected= true;
                      clearInterval(checkConnectionStatusInterval);
                      this.listFaceBookAdsAccount = responseResult.pages.pages;
                    }
                    break;

                  case "facebook":
                    if (responseResult.pages.status === "connected") {
                      this.facebookConnected = true;
                      clearInterval(checkConnectionStatusInterval);
                      this.listFaceBookFanpage = responseResult.pages.pages;
                    }
                    break;

                  case "youtube":
                    if (responseResult.connected == 1) {
                      this.youtubeConnected = true;
                      clearInterval(checkConnectionStatusInterval);
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
                  case "tumblr":
                    if (responseResult.connected == 1) {
                      this.tumblrConnected = true;
                    }
                    break;
                  case "drupal":
                    if (responseResult.connected == 1) {
                      this.drupalConnected = true;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;
                  case "medium":
                    if (responseResult.connected == 1) {
                      this.mediumConnected = true;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;
                  case "joomla":
                    if (responseResult.connected == 1) {
                      this.joomlaConnected = true;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;  

                  default:
                    break;
                }
              }
            },
            (error) => {},
            channelUniqueName
          );
        },
        stepInterval,
        channelUniqueName
      );
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };

  checkConnectedChannels(channels) {
    channels.map((channelType) => {
      this.channelsStore.checkConnectedChannels(
        (response) => {
          if (response) {
            let responseResult = response.result;

            switch (channelType) {
              case "facebook":
                if (responseResult.pages.status === "connected") {
                  this.facebookConnected = true;
                  let listFpConnected = responseResult.pages.connected;
                  let listFanpage = responseResult.pages.pages;

                  if (listFpConnected.length > 0) {
                    this.listFaceBookFanpageView = [];
                    listFanpage.map((fanpage) => {
                      if (listFpConnected.indexOf(fanpage.id) > -1) {
                        this.listFaceBookFanpageView.push(fanpage);
                      }
                    });
                  } else {
                    this.listFaceBookFanpage = listFanpage;
                  }
                }
                break;

              case "fbad":
                if (responseResult.pages.status === "connected") {
                  this.facebookAdsConnected = true;
                  let listAdAccountsConnected = responseResult.pages.connected;
                  let listAdAccounts = responseResult.pages.pages;

                  if (listAdAccountsConnected.length > 0) {
                    this.listFaceBookAdsAccountView = [];
                    listAdAccounts.map((adAccount) => {
                      if (listAdAccountsConnected.indexOf(adAccount.id) > -1) {
                        this.listFaceBookAdsAccountView.push(adAccount);
                      }
                    });
                  } else {
                    this.listFaceBookAdsAccount = listAdAccounts;
                  }
                }
                break;

              case "youtube":
                if (responseResult.connected == 1) {
                  this.youtubeConnected = true;
                }
                break;

              case "twitter":
                if (responseResult.connected == 1) {
                  this.twitterConnected = true;
                }
                break;

              case "linkedin":
                if (responseResult.connected == 1) {
                  this.linkedinConnected = true;
                }
                break;

              case "mailchimp":
                if (responseResult.connected == 1) {
                  this.mailchimpConnected = true;
                }
                break;

              case "instagram":
                if (responseResult.connected == 1) {
                  this.instagramConnected = true;
                }
                break;

              case "wordpress":
                if (responseResult.connected == 1) {
                  this.wordpressConnected = true;
                }
                break;
              case "tumblr":
                if (responseResult.connected == 1) {
                  this.tumblrConnected = true;
                }
                break;
              case "drupal":
                if (responseResult.connected == 1) {
                  this.drupalConnected = true;
                }
                break;
              case "medium":
                if (responseResult.connected == 1) {
                  this.mediumConnected = true;
                }
                break;
              case "joomla":
                if (responseResult.connected == 1) {
                  this.joomlaConnected = true;
                }
                break;
              default:
                break;
            }
          }
        },
        (error) => {},
        channelType
      );
    });
  }

  saveChosseFacebookFanpages = (pageIds) => {
    if (pageIds.length > 0) {
      this.channelsStore.saveChosseFacebookFanpages(
        this.callbackOnSuccessListFacebookFanpage,
        this.callbackOnErrorHander,
        pageIds
      );
    }
  };

  saveChosseFacebookAdAccount = (accountIds) => {
    if (accountIds.length > 0) {
      this.channelsStore.saveChosseFacebookAdAccount(
          this.callbackOnSuccessListFacebookAdAccount(),
          this.callbackOnErrorHander,
          accountIds
      );
    }
  };

  callbackOnSuccessListFacebookFanpage = (response, pageIds) => {
    if (response) {
      this.tableStatus = PAGE_STATUS.READY;
      this.channelsStore.getFacebookFanpages(
        (respons) => {
          this.listFaceBookFanpageView = respons.result.pages.pages;
        },
        (error) => {},
        pageIds
      );
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };

  callbackOnSuccessListFacebookAdAccount = (response, accountIds) => {
    if (response) {
      this.tableStatus = PAGE_STATUS.READY;
      this.channelsStore.getFacebookAdAccounts(
          (res) => {
            this.listFaceBookAdsAccountView = res.result.pages.pages;
          },
          (error) => {},
          accountIds
      );
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default ChannelsListViewModel;
