import { runInAction } from 'mobx';

import {
  EasiiProjectApiService,
  EasiiCampaignApiService,
  EasiiPersonaApiService,
  EasiiBillingPlanApiService,
  AUTHORIZATION_KEY,
} from 'easii-io-web-service-library';

class GlobalStore {
  projectMasterData = null;
  campaignMasterData = null;
  personaMasterData = null;
  connectedChannelsMasterData = null;
  memberFeaturesMasterData = null;
  memberId = localStorage.getItem(AUTHORIZATION_KEY.MEMBER_ID) ?? 0;
  memberFullName = localStorage.getItem(AUTHORIZATION_KEY.MEMBER_FULL_NAME) ?? "";

  async getMemberFeaturesMasterData() {
    const service = new EasiiBillingPlanApiService();
    const respondedData = await service.getFeaturesMember(this.memberId);
    console.log('GlobalStore - getMemberFeaturesMasterData');
    console.log(respondedData);
    this.memberFeaturesMasterData = respondedData;
    return this.memberFeaturesMasterData;
  }

  async getProjectMasterData() {
    const projectApiService = new EasiiProjectApiService();
    const respondedData = await projectApiService.getProjectMasterData();
    console.log('GlobalStore - getProjectMasterData');
    console.log(respondedData);
    this.projectMasterData = respondedData;
    return this.projectMasterData;
  }

  async getConnectedChannelsMasterData() {
    const PersonaApiService = new EasiiPersonaApiService();
    const respondedData = await PersonaApiService.getConnectedChannelByOrganisationId();
    console.log('GlobalStore - getConnectedChannelsMasterData');
    console.log(respondedData);
    this.connectedChannelsMasterData = respondedData;
    return respondedData;
  }

  async getCampaignMasterData() {
    const campaignApiService = new EasiiCampaignApiService();
    const respondedData = await campaignApiService.getCampaignMasterData();
    console.log('GlobalStore - getCampaignMasterData');
    console.log(respondedData);
    this.campaignMasterData = respondedData;
    return respondedData;
  }

  async getPersonaMasterData() {
    const PersonaApiService = new EasiiPersonaApiService();
    const respondedData = await PersonaApiService.getPersonaMasterData();
    console.log('GlobalStore - getPersonaMasterData');
    console.log(respondedData);
    this.personaMasterData = respondedData;
    return respondedData;
  }

  async getMasterData(args, callbackOnSuccess, callbackOnError) {
    try {
      const isForProjectMasterData = args.isForProjectMaster ? args.isForProjectMaster : false;
      const isForCampaignMasterData = args.isForCampaignMasterData
        ? args.isForCampaignMasterData
        : false;
      const isForPersonaMasterData = args.isForPersonaMasterData
        ? args.isForPersonaMasterData
        : false;
      const isForConnectedChannelsMasterData = args.isForConnectedChannelsMasterData
        ? args.isForConnectedChannelsMasterData
        : false;
      const isForMemberFeaturesMasterData = args.isForMemberFeaturesMasterData
        ? args.isForMemberFeaturesMasterData
        : false;

      const result = {
        projectMasterData: null,
        campaignMasterData: null,
        personaMasterData: null,
        connectedChannelsMasterData: null,
        memberFeaturesMasterData: null,
      };

      if (isForProjectMasterData === true) {
        const projectMasterData = this.projectMasterData
          ? this.projectMasterData
          : await this.getProjectMasterData();
        // const projectMasterData =  await this.getProjectMasterData();
        if (projectMasterData) {
          result.projectMasterData = projectMasterData;
        }
      }

      if (isForMemberFeaturesMasterData === true) {
        const memberFeaturesMasterData = this.memberFeaturesMasterData
          ? this.memberFeaturesMasterData
          : await this.getMemberFeaturesMasterData();
        if (memberFeaturesMasterData) {
          result.memberFeaturesMasterData = memberFeaturesMasterData;
        }
      }

      if (isForCampaignMasterData === true) {
        const campaignMasterData = this.campaignMasterData
          ? this.campaignMasterData
          : await this.getCampaignMasterData();
        if (campaignMasterData) {
          result.campaignMasterData = campaignMasterData;
        }
      }

      if (isForPersonaMasterData === true) {
        const personaMasterData = this.personaMasterData
          ? this.personaMasterData
          : await this.getPersonaMasterData();
        if (personaMasterData) {
          result.personaMasterData = personaMasterData;
        }
      }

      if (isForConnectedChannelsMasterData === true) {
        const connectedChannelsMasterData = this.connectedChannelsMasterData
          ? this.connectedChannelsMasterData
          : await this.getConnectedChannelsMasterData();
        if (connectedChannelsMasterData) {
          result.connectedChannelsMasterData = connectedChannelsMasterData;
        }
      }
      runInAction(() => {
        callbackOnSuccess(result);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}

export default GlobalStore;
