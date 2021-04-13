import { makeAutoObservable } from "mobx";
import { notify } from "../../../components/Toast";

import PAGE_STATUS from "../../../constants/PageStatus";
import { CHANNEL_CMS_DRUPAL, CHANNEL_CMS_WORDPRESS } from "../../../constants/ChannelModule";
import ChannelsListViewModel from "./ChannelsListViewModel";

class LoginCMSChannelFormModalViewModel {
  show = false;
  projectStore = null;
  isConnectWordpressSuccess = false;
  isConnectedDrupalSuccess = false;
  cmsChannelType = CHANNEL_CMS_WORDPRESS;
  channelsListViewModel = null;

  constructor(projectStore) {
    makeAutoObservable(this);
    this.projectStore = projectStore;
  }

  setForm = (loginChannelCMSFormComponent) => {
    this.loginChannelCMSFormComponent = loginChannelCMSFormComponent;
  };

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.editMode = false;
    this.show = false;
  };

  setChannelsListViewModelInstance = (channelsListViewModelInstance) => {
    this.channelsListViewModel = channelsListViewModelInstance;
  }

  setChannelType = (type) => {
    this.cmsChannelType = type;
  }

  saveCMSHandler = (projectId, channelUniqueName) => {
    let dataPost = this.loginChannelCMSFormComponent.formPropsData;
    dataPost.channelType = channelUniqueName;
    dataPost.projectId = projectId;
    this.projectStore.connectCMS(
      this.callbackOnSuccessCMS,
      this.callbackOnErrorHander,
      this.loginChannelCMSFormComponent.formPropsData,
      channelUniqueName
    );
  };

  callbackOnSuccessCMS = () => {
    console.log("callbackOnSuccessCMS");
    console.log('this.channelsListViewModel LOGIN ', this.channelsListViewModel);
    const { 
      drupalConnected, 
      wordpressConnected,
    } = this.channelsListViewModel;
    switch (this.cmsChannelType) {
      case CHANNEL_CMS_WORDPRESS:
        this.channelsListViewModel.wordpressConnected = true;
        break;
      case CHANNEL_CMS_DRUPAL:
        this.channelsListViewModel.drupalConnected = true;
        break;
      default:
        break;
    }
    
    
    this.closeModal();
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessHandler = () => {
    console.log("callbackOnSuccessHandler");
    this.closeModal();
    this.campaignsListViewModel.refreshTableCampaignsList();
  };
}

export default LoginCMSChannelFormModalViewModel;
