import { makeAutoObservable } from "mobx";
import { notify } from "../../../components/Toast";
import PAGE_STATUS from "../../../constants/PageStatus";

class ContentConnectedChannelsByOrganisationViewModel {
  contentsStore = null;

  formStatus = PAGE_STATUS.LOADING;

  connectedChannels = null;

  show = false;

  newArrayConnectChannels = [];

  constructor(contentsStore) {
    makeAutoObservable(this);
    this.contentsStore = contentsStore;
  }

  openModal = (inputRef) => {
    this.show = true;
  };

  closeModal = () => {
    this.show = false;
  };

  resetObservableProperties() {
    this.connectedChannels = null;
  }

  renderChannelByOrganizationID = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    console.log("renderChannelByOrganizationID");
    this.contentsStore.getConnectedChannelsByOrganizationID(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  renderConnectedChannelByPersonaIds = () => {
    this.contentsStore.getConnectedChannelByPersonaIds(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander - content");
    console.log(error);
    this.formStatus = PAGE_STATUS.READY;
    notify(error.message);
  };

  callbackOnSuccessHandler = (contentConnectedChannelsModel) => {
    console.log(
      "callbackOnSuccessHandler - contentConnectedChannelsModel ------"
    );
    const resultInModel = contentConnectedChannelsModel
      ? contentConnectedChannelsModel
      : null;
    console.log("resultInModel - resultInModel ------");
    console.log(resultInModel);
    this.connectedChannels = resultInModel
      ? resultInModel.toListConnectedChannelsOnContentForm()
      : null;
    this.formStatus = PAGE_STATUS.READY;
    console.log("this.connectedChannels - this.connectedChannels ------");
    console.log(this.connectedChannels);
  };
}

export default ContentConnectedChannelsByOrganisationViewModel;
