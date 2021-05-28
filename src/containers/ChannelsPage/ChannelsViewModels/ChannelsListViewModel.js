import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import { notify } from '../../../components/Toast';
import { CHANNEL_ADS_GOOGLE, CHANNEL_CMS_WORDPRESS } from '../../../constants/ChannelModule';

class ChannelsListViewModel {
  channelsStore = null;

  channles = null;

  tableStatus = PAGE_STATUS.LOADING;

  facebookConnected = false;

  listFacebookFanpageConnected = null;

  isPageConnected = false;

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

  listFacebookAdsAccount = null;

  listFacebookAdsAccountView = null;

  showModalCMS = true;

  tumblrConnected = false;

  mustUpgrade = false;

  showUpgrade = false;

  drupalConnected = false;

  googleadsConnected = false;

  cmsChannelType = CHANNEL_CMS_WORDPRESS;

  socialMediaFeaturesMasterData = null;

  cmsFeaturesMasterData = null;

  advertisingFeaturesMasterData = null;

  emailMarketingFeaturesMasterData = null;

  countCMSConnected = 0;

  countAdvertisingConnected = 0;

  countEmailMarketingConnected = 0;

  countSocialMediaConnected = 0;

  getIdActionFacebookFange = true;

  ConnectStatusFanpage = PAGE_STATUS.READY;

  ConnectStatusFanpage = false;

  googleMyBusinessConnected = false;

  listLinkedinFanpageView = null;

  listLinkedinFanpageConnected = null;

  constructor(channelsStore) {
    makeAutoObservable(this);
    this.channelsStore = channelsStore;
  }

  resetObservableProperties() {
    this.facebookConnected = false;
    this.facebookAdsConnected = false;
    this.youtubeConnected = false;
    this.twitterConnected = false;
    this.linkedinConnected = false;
    this.mailchimpConnected = false;
    this.instagramConnected = false;
    this.wordpressConnected = false;
    this.mediumConnected = false;
    this.joomlaConnected = false;
    this.listFaceBookFanpage = null;
    this.listFaceBookFanpageView = null;
    this.listFacebookAdsAccount = null;
    this.listFacebookAdsAccountView = null;
    this.showModalCMS = true;
    this.tumblrConnected = false;
    this.mustUpgrade = false;
    this.showUpgrade = false;
    this.drupalConnected = false;
    this.googleadsConnected = false;
    this.cmsChannelType = CHANNEL_CMS_WORDPRESS;
    this.socialMediaFeaturesMasterData = null;
    this.cmsFeaturesMasterData = null;
    this.advertisingFeaturesMasterData = null;
    this.emailMarketingFeaturesMasterData = null;
    this.countCMSConnected = 0;
    this.countAdvertisingConnected = 0;
    this.countEmailMarketingConnected = 0;
    this.countSocialMediaConnected = 0;
    this.googleMyBusinessConnected = false;
    this.listLinkedinFanpageView = null;
    this.listLinkedinFanpageConnected = null;
  }

  onSuccessConnect = (dataToken, channelType) => {
    let dataTokenFormat = JSON.parse(dataToken);

    if (channelType === 'facebook') {
      this.listFaceBookFanpageView = dataTokenFormat.pages;
      this.listFacebookFanpageConnected = dataTokenFormat.connected;
    }

    this.channelsStore.saveAccessTokenChannel(
      this.callbackOnSuccessConnected,
      this.callbackOnErrorHander,
      channelType,
      dataToken
    );
  };

  callbackOnSuccessConnected = (channelType) => {
    switch (channelType) {
      case 'google_ads':
        this.googleadsConnected = true;
        break;
      case 'facebook':
        this.facebookConnected = true;
        break;
      case 'youtube':
        this.youtubeConnected = true;
        break;
      case 'instagram':
        this.instagramConnected = true;
        break;
      case 'google_my_business':
        this.googleMyBusinessConnected = true;
        break;
    }
  };

  connectLoginUrl = (channelUniqueName) => {
    this.channelsStore.getChannelLoginUrl(
      this.callbackOnSuccessChannel,
      this.callbackOnErrorHander,
      channelUniqueName
    );
  };

  initMemberFeaturesMasterData = () => {
    this.channelsStore.getFeaturesMemberMasterData(
      this.callbackOnSuccessMasterData,
      this.callbackOnErrorHander
    );
  };

  callbackOnSuccessMasterData = (responseInModel) => {
    console.log('callbackOnSuccessMasterData');
    // this.socialMediaFeaturesMasterData = responseInModel.getFeaturesSocialMedia();
    this.advertisingFeaturesMasterData = responseInModel.getFeaturesAdvertising();
    this.socialMediaFeaturesMasterData = responseInModel.getFeaturesSocialMedia();
    this.emailMarketingFeaturesMasterData = responseInModel.getFeaturesEmailMarketing();
    this.cmsFeaturesMasterData = responseInModel.getFeaturesCms();
  };

  callbackOnErrorHander = (error) => {
    console.log('callbackOnErrorHander');
    console.log(error);
    notify(error.message);
  };

  disconnectAFacebookPage = (channelUniqueName, pageId) => {
    this.ConnectStatusFanpage = PAGE_STATUS.LOADING;
    this.channelsStore.disconnectAFacebookPage(
      this.callbackOnDisconnectAFacebookPageSuccess,
      this.callbackOnErrorHander,
      channelUniqueName,
      pageId
    );
  };

  connectAFacebookPage = (channelUniqueName, pageId) => {
    this.ConnectStatusFanpage = PAGE_STATUS.LOADING;
    this.channelsStore.connectAFacebookPage(
      this.callbackOnConnectAFacebookPageSuccess,
      this.callbackOnErrorHander,
      channelUniqueName,
      pageId
    );
  };

  callbackOnDisconnectAFacebookPageSuccess = (response, channelUniqueName, pageId) => {
    if (response) {
      this.tableStatus = PAGE_STATUS.READY;
      this.ConnectStatusFanpage = PAGE_STATUS.READY;
      const index = this.listFacebookFanpageConnected.indexOf(pageId);
      if (index > -1) {
        this.listFacebookFanpageConnected.splice(index, 1);
      }
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };

  callbackOnConnectAFacebookPageSuccess = (response, channelUniqueName, pageId) => {
    if (response) {
      this.tableStatus = PAGE_STATUS.READY;
      this.ConnectStatusFanpage = PAGE_STATUS.READY;
      this.listFacebookFanpageConnected.push(pageId);
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };

  callbackOnSuccessChannel = (response, channelUniqueName, pageId) => {
    if (response) {
      this.tableStatus = PAGE_STATUS.READY;
      console.log('callbackOnSuccessChannelresponse');
      console.log(response);
      if (response.result.must_upgrade) {
        this.mustUpgrade = true;
        return;
      }
      window.open(response.result.loginUrl, 'popup', 'width=600,height=600');
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
                  case 'fbad': //facebookAdConnected
                    if (responseResult.pages.status === 'connected') {
                      this.facebookAdsConnected = true;
                      clearInterval(checkConnectionStatusInterval);
                      this.listFacebookAdsAccount = responseResult.pages.adAccounts;
                    }
                    break;
                  // =============== Social Media Start ===============

                  case 'twitter':
                    if (responseResult.connected == 1) {
                      this.twitterConnected = true;
                      this.countSocialMediaConnected++;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;

                  case 'linkedin':
                    console.log('responseResultlinkedin123');
                    console.log(response);
                    console.log(responseResult);
                    if (responseResult.pages.status === 'connected') {
                      
                      this.linkedinConnected = true;
                      this.countSocialMediaConnected++;
                      clearInterval(checkConnectionStatusInterval);

                      let listFanpage = responseResult.pages.pages;
                      this.listLinkedinFanpageConnected = responseResult.pages.connected;
                      this.listLinkedinFanpageView = listFanpage;
                    }
                    break;

                  case 'tumblr':
                    if (responseResult.connected == 1) {
                      this.countSocialMediaConnected++;
                      this.tumblrConnected = true;
                    }
                    break;

                  case 'medium':
                    if (responseResult.connected == 1) {
                      this.mediumConnected = true;
                      this.countSocialMediaConnected++;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;

                  // =============== Social Media End ===============

                  // =============== Advertising Start ===============

                  case 'fbad': //facebookAdConnected
                    if (responseResult.pages.status === 'connected') {
                      this.facebookAdsConnected = true;
                      this.countAdvertisingConnected++;
                      clearInterval(checkConnectionStatusInterval);
                      this.listFacebookAdsAccount = responseResult.pages.adAccounts;
                    }
                    break;

                  case CHANNEL_ADS_GOOGLE:
                    if (responseResult.connected == 1) {
                      this.googleadsConnected = true;
                      this.countAdvertisingConnected++;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;
                  // =============== Advertising End ===============

                  // =============== Email Marketing Start ===============
                  case 'mailchimp':
                    if (responseResult.connected == 1) {
                      this.mailchimpConnected = true;
                      this.countEmailMarketingConnected++;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;

                  // =============== Email Marketing End ===============

                  // =============== CMS End ===============
                  case 'drupal':
                    if (responseResult.connected == 1) {
                      this.drupalConnected = true;
                      this.countCMSConnected++;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;

                  case 'joomla':
                    if (responseResult.connected == 1) {
                      this.joomlaConnected = true;
                      this.countCMSConnected++;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;

                  case 'wordpress':
                    if (responseResult.connected == 1) {
                      this.wordpressConnected = true;
                      this.countCMSConnected++;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;
                  // =============== CMS End ===============

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

  checkConnectedFacebookFanpage() {
    return this.listFacebookFanpageConnected;
  }

  checkConnectedChannels(channels) {
    channels.map((channelType) => {
      console.log('----------------', channelType);
      this.channelsStore.checkConnectedChannels(
        (response) => {
          if (response) {
            let responseResult = response.result;
            /*
                this.countCMSConnected = 0;
                this.countAdvertisingConnected = 0;
                this.countEmailMarketingConnected = 0;
                this.countSocialMediaConnected = 0;
                */
            switch (channelType) {
              // =============== Social Media Start ===============
              case 'facebook':
                if (responseResult.pages.status === 'connected') {
                  this.facebookConnected = true;
                  this.countSocialMediaConnected++;
                  // let listFpConnected = responseResult.pages.connected;
                  let listFanpage = responseResult.pages.pages;
                  this.listFacebookFanpageConnected = responseResult.pages.connected;

                  this.listFaceBookFanpageView = listFanpage;
                }
                break;
              case 'fbad':
                if (responseResult.pages.status === 'connected') {
                  this.facebookAdsConnected = true;
                  let listAdAccountsConnected = responseResult.pages.connected;
                  let listAdAccounts = responseResult.pages.adAccounts;

                  if (listAdAccountsConnected.length > 0) {
                    this.listFacebookAdsAccountView = [];
                    listAdAccounts.map((adAccount) => {
                      if (listAdAccountsConnected.indexOf(adAccount.id) > -1) {
                        this.listFacebookAdsAccountView.push(adAccount);
                      }
                    });
                  } else {
                    this.listFacebookAdsAccount = listAdAccounts;
                  }
                }
                break;

              case 'youtube':
                if (responseResult.connected == 1) {
                  this.youtubeConnected = true;
                  this.countSocialMediaConnected++;
                }
                break;

              case 'twitter':
                if (responseResult.connected == 1) {
                  this.twitterConnected = true;
                  this.countSocialMediaConnected++;
                }
                break;

              case 'google_my_business':
                if (responseResult.connected == 1) {
                  this.googleMyBusinessConnected = true;
                  this.countSocialMediaConnected++;
                }
                break;

              case 'linkedin':
                if (responseResult.pages.status === 'connected') {
                  this.linkedinConnected = true;
                  this.countSocialMediaConnected++;

                  let listFanpage = responseResult.pages.pages;
                  this.listLinkedinFanpageConnected = responseResult.pages.connected;
                  this.listLinkedinFanpageView = listFanpage;
                }
                break;

              case 'instagram':
                if (responseResult.connected == 1) {
                  this.instagramConnected = true;
                  this.countSocialMediaConnected++;
                }
                break;

              case 'tumblr':
                if (responseResult.connected == 1) {
                  this.tumblrConnected = true;
                  this.countSocialMediaConnected++;
                }
                break;

              case 'medium':
                if (responseResult.connected == 1) {
                  this.mediumConnected = true;
                  this.countSocialMediaConnected++;
                }
                break;

              // =============== Social Media End ===============

              // =============== Advertising Start ===============
              case CHANNEL_ADS_GOOGLE:
                if (responseResult.connected == 1) {
                  this.googleadsConnected = true;
                  this.countAdvertisingConnected++;
                }
                break;

              case 'fbad':
                if (responseResult.pages && responseResult.pages.status === 'connected') {
                  this.facebookAdsConnected = true;
                  this.countAdvertisingConnected++;
                  let listAdAccountsConnected = responseResult.pages.connected;
                  let listAdAccounts = responseResult.pages.adAccounts;

                  if (listAdAccountsConnected.length > 0) {
                    this.listFacebookAdsAccountView = [];
                    listAdAccounts.map((adAccount) => {
                      if (listAdAccountsConnected.indexOf(adAccount.id) > -1) {
                        this.listFacebookAdsAccountView.push(adAccount);
                      }
                    });
                  } else {
                    this.listFacebookAdsAccount = listAdAccounts;
                  }
                }
                break;
              // =============== Advertising End ===============

              // =============== CMS Start ===============
              case 'wordpress':
                if (responseResult.connected == 1) {
                  this.wordpressConnected = true;
                  this.countCMSConnected++;
                }
                break;

              case 'drupal':
                if (responseResult.connected == 1) {
                  this.drupalConnected = true;
                  this.countCMSConnected++;
                }
                break;

              case 'joomla':
                if (responseResult.connected == 1) {
                  this.joomlaConnected = true;
                  this.countCMSConnected++;
                }
                break;
              // =============== CMS End ===============

              // =============== Email Marketing End ===============
              case 'mailchimp':
                if (responseResult.connected == 1) {
                  this.mailchimpConnected = true;
                  this.countEmailMarketingConnected++;
                }
                break;
              // =============== Email Marketing End ===============
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

  // saveChosseFacebookFanpages = (pageIds) => {
  //   if (pageIds.length > 0) {
  //     this.channelsStore.saveChosseFacebookFanpages(
  //       this.callbackOnSuccessListFacebookFanpage,
  //       this.callbackOnErrorHander,
  //       pageIds
  //     );
  //   }
  // };

  saveChosseFacebookAdAccount = (accountIds) => {
    if (accountIds.length > 0) {
      this.channelsStore.saveChosseFacebookAdAccount(
        this.callbackOnSuccessListFacebookAdAccount(),
        this.callbackOnErrorHander,
        accountIds
      );
    }
  };

  // callbackOnSuccessListFacebookFanpage = (response, pageIds) => {
  //   if (response) {
  //     this.tableStatus = PAGE_STATUS.READY;
  //     this.channelsStore.getFacebookFanpages(
  //       (respons) => {
  //         this.listFaceBookFanpageView = respons.result.pages.pages;
  //       },
  //       (error) => {},
  //       pageIds
  //     );
  //   } else {
  //     this.tableStatus = PAGE_STATUS.ERROR;
  //   }
  // };

  callbackOnSuccessListFacebookAdAccount = (response, accountIds) => {
    if (response) {
      this.tableStatus = PAGE_STATUS.READY;
      this.channelsStore.getFacebookAdAccounts(
        (res) => {
          this.listFacebookAdsAccountView = res.result.pages.adAccounts;
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
