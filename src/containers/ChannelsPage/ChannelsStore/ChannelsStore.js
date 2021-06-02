import React from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import { EasiiOrganisationChannelApiService } from 'easii-io-web-service-library';
import { CHANNEL_ADS_GOOGLE } from '../../../constants/ChannelModule';
import { MemberFeaturesMasterDataModel } from '../../../store/Models/MasterDataModels/MemberFeaturesMasterDataModel';

export default class ChannelsStore {
  globalStore = null;

  constructor(args = {}) {
    if (args) {
      this.globalStore = args.globalStore ? args.globalStore : null;
    }
  }

  async connectAFanpage(
    callbackOnConnectAFanpageSuccess,
    callbackOnError,
    channelUniqueName,
    pageId
  ) {
    const channelService = new EasiiOrganisationChannelApiService();
    console.log('channelUniqueName channelUniqueName', channelUniqueName);
    console.log('channelPageId:', pageId);
    let response = null;

    switch (channelUniqueName) {
      case 'facebook':
        response = await channelService.connectFanpage(pageId);
        break;
      default:
        break;
    }

    if (response) {
      runInAction(() => {
        callbackOnConnectAFanpageSuccess(response, channelUniqueName, pageId);
      });
    } else {
      callbackOnError({
        message: 'Something went wrong from Server response',
      });
    }
  }

  async disconnectAFanpage(
    callbackOnDisconnectAFanpageSuccess,
    callbackOnError,
    channelUniqueName,
    pageId
  ) {
    const channelService = new EasiiOrganisationChannelApiService();
    console.log('channelUniqueName channelUniqueName', channelUniqueName);
    console.log('channelPageId:', pageId);
    let response = null;

    switch (channelUniqueName) {
      case 'facebook':
        response = await channelService.disconnectFanpage(pageId);
        break;
      default:
        break;
    }

    if (response) {
      runInAction(() => {
        callbackOnDisconnectAFanpageSuccess(response, channelUniqueName, pageId);
      });
    } else {
      callbackOnError({
        message: 'Something went wrong from Server response',
      });
    }
  }

  async disconnectChannel(callbackOnSuccess, callbackOnError, channelName) {
    const channelService = new EasiiOrganisationChannelApiService();

    let response = await channelService.disconnectChannel(channelName);

    console.log('disconnectChannel');
    console.log(response);

    if (response) {
      runInAction(() => {
        callbackOnSuccess(response, channelName);
      });
    } else {
      callbackOnError({
        message: 'Something went wrong from Server response',
      });
    }
  }

  async getChannelLoginUrl(callbackOnSuccess, callbackOnError, channelUniqueName) {
    try {
      const channelService = new EasiiOrganisationChannelApiService();
      console.log('channelUniqueName channelUniqueName');
      console.log(channelUniqueName);
      let response = null;

      switch (channelUniqueName) {
        case 'fbad':
        case 'facebook':
          response = await channelService.getLoginUrl(channelUniqueName);
          break;

        case 'youtube':
        case 'twitter':
        case 'linkedin':
        case 'mailchimp':
        case 'instagram':
        case 'tumblr':
        case CHANNEL_ADS_GOOGLE:
        case 'google_my_business':
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

  async checkConnectedChannels(callbackOnSuccess, callbackOnError, channelType) {
    try {
      console.log(channelType);
      const channelService = new EasiiOrganisationChannelApiService();
      let result = null;

      switch (channelType) {
        case 'fbad':
          result = await channelService.checkConnectionStatusFacebookAd(channelType);
          break;
        case 'facebook':
          result = await channelService.checkConnectionStatusFacebook(channelType);
          break;
        case 'linkedin':
          result = await channelService.checkConnectionStatusLinkedin(channelType);
          break;

        // case 'linkedin':
        case 'youtube':
        case 'twitter':
        case 'mailchimp':
        case 'instagram':
        case 'tumblr':
        case 'wordpress':
        case 'drupal':
        case 'medium':
        case 'joomla':
        case CHANNEL_ADS_GOOGLE:
        case 'google_my_business':
          result = await channelService.getCheckConnectStatusChannel(channelType);
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
          message: '[checkConnectedChannels] - Something went wrong from Server response',
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError('[checkConnectedChannels] - ' + error);
      });
    }
  }

  async saveChosseFacebookFanpages(callbackOnSuccess, callbackOnError, pageIds) {
    try {
      console.log('store pageIds', pageIds);
      const channelService = new EasiiOrganisationChannelApiService();
      const response = await channelService.connectMultiFanpage(pageIds);

      console.log('store response', response);
      if (response) {
        runInAction(() => {
          callbackOnSuccess(response, pageIds);
        });
      } else {
        callbackOnError({
          message: '[intervalAskForConnectedChannels] - Something went wrong from Server response',
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError('[intervalAskForConnectedChannels] - ' + error);
      });
    }
  }

  async saveChosseFacebookAdAccount(callbackOnSuccess, callbackOnError, pageIds) {
    try {
      console.log('store pageIds', pageIds);
      const channelService = new EasiiOrganisationChannelApiService();
      const response = await channelService.connectMultiAdAccount(pageIds);

      console.log('store response', response);
      if (response) {
        runInAction(() => {
          callbackOnSuccess(response, pageIds);
        });
      } else {
        callbackOnError({
          message: '[intervalAskForConnectedChannels] - Something went wrong from Server response',
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError('[intervalAskForConnectedChannels] - ' + error);
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
          message: '[intervalAskForConnectedChannels] - Something went wrong from Server response',
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError('[intervalAskForConnectedChannels] - ' + error);
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
          message: '[intervalAskForConnectedChannels] - Something went wrong from Server response',
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError('[intervalAskForConnectedChannels] - ' + error);
      });
    }
  }

  async connectCMS(callbackOnSuccess, callbackOnError, dataPost, channelUniqueName) {
    const channelService = new EasiiOrganisationChannelApiService();
    console.log('channelUniqueName channelUniqueName');
    console.log(channelUniqueName);
    let response = null;

    switch (channelUniqueName) {
      case 'wordpress':
      case 'drupal':
      case 'medium':
      case 'joomla':
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
        message: 'Something went wrong from Server response',
      });
    }
  }

  async getFeaturesMemberMasterData(callbackOnSuccess, callbackOnError) {
    try {
      if (!this.globalStore) {
        runInAction(() => {
          callbackOnError({
            message: 'Global Store is NULL',
          });
        });
      } else {
        console.log('Content Store - Get Global Store');
        console.log(this.globalStore);
        await this.globalStore.getMasterData(
          {
            isForMemberFeaturesMasterData: true,
          },
          (result) => {
            try {
              console.log('Content - getMasterData');
              console.log(result);

              const resultInModel = new MemberFeaturesMasterDataModel(
                result && result.memberFeaturesMasterData ? result.memberFeaturesMasterData : null
              );

              console.log('after - MemberFeaturesMasterDataModel');
              runInAction(() => {
                callbackOnSuccess(resultInModel);
              });
            } catch (error) {
              runInAction(() => {
                callbackOnError({
                  message:
                    'resultInModel - ChannelsStore - getMasterData - Something went wrong from Server response',
                });
              });
            }
          },
          (error) => {
            runInAction(() => {
              callbackOnError({
                message:
                  'ChannelsStore - getMasterData - Something went wrong from Server response : ' +
                  error,
              });
            });
          }
        );
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async saveAccessTokenChannel(callbackOnSuccess, callbackOnError, channelType, dataAccessToken) {
    const channelService = new EasiiOrganisationChannelApiService();
    const response = await channelService.onConnectChannelSuccess(channelType, dataAccessToken);

    if (response == true) {
      runInAction(() => {
        callbackOnSuccess(channelType);
      });
    } else {
      callbackOnError({
        message: 'Something went wrong from Server response',
      });
    }
  }
}
