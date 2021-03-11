import { makeAutoObservable } from "mobx";
import { notify } from "../../../components/Toast";
import PAGE_STATUS from "../../../constants/PageStatus";

class ContentConnectedChannelsByProjectViewModel {
  contentsStore = null;

  formStatus = PAGE_STATUS.LOADING;

  connectedChannels = null;

  constructor(contentsStore) {
    makeAutoObservable(this);
    this.contentsStore = contentsStore;
  }

  resetObservableProperties() {
    this.connectedChannels = null;
  }

  renderChannelByProjectId = (projectId) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.contentsStore.getConnectedChannelsByProjectId(
      projectId,
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
    console.log(resultInModel);
    this.connectedChannels = resultInModel
      ? resultInModel.toListConnectedChannelsOnContentForm()
      : null;
    this.formStatus = PAGE_STATUS.READY;

    console.log(this.connectedChannels);
  };
}

export default ContentConnectedChannelsByProjectViewModel;
