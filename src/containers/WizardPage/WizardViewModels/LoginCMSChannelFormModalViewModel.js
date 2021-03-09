import { makeAutoObservable } from "mobx";
import { notify } from "../../../components/Toast";
import PAGE_STATUS from "../../../constants/PageStatus";

class LoginCMSChannelFormModalViewModel {
  show = false;
  projectStore = null;
  isConnectWordpressSuccess = false;


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

  saveCMSHandler = (channelUniqueName = 'wordpress') => {
      let dataPost = this.loginChannelCMSFormComponent.formPropsData;
      dataPost.channelType = channelUniqueName;
    this.projectStore.connectCMS(
      this.callbackOnSuccessCMS,
      this.callbackOnErrorHander,
      this.loginChannelCMSFormComponent.formPropsData,
      channelUniqueName
    );
  };

  callbackOnSuccessCMS = () => {
    console.log("callbackOnSuccessCMS");
    this.isConnectWordpressSuccess = true;
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
