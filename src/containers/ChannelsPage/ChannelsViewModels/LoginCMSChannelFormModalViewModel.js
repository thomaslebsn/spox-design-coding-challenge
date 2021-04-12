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
    this.channelsListViewModel = new ChannelsListViewModel(projectStore); 
    console.log('this.channelsListViewModel', this.channelsListViewModel);
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
    // console.log('this', this);
    // switch (this.cmsChannelType) {
    //   case CHANNEL_CMS_WORDPRESS:
    //     // this.isConnectWordpressSuccess = true;
    //     this.channelsListViewModel.wordpres
    //     break;
    //   case CHANNEL_CMS_DRUPAL:
    //     // this.isConnectedDrupalSuccess = true;
    //     break;
    //   default:
    //     break;
    // }
    this.props.
    
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
