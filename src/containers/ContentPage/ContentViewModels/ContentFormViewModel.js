import { makeAutoObservable, runInAction } from "mobx";
import { notify } from "../../../components/Toast";
import history from "../../../routes/history";

import PAGE_STATUS from "../../../constants/PageStatus";

class ContentFormViewModel {
  contentEditdata = null;
  editMode = false;
  contentListViewModel = null;

  contentStore = null;
  contentFormComponent = null;

  formStatus = PAGE_STATUS.READY;

  constructor(contentStore) {
    console.log("[ContentFormViewModel] ...constructor ");
    console.log(contentStore);
    makeAutoObservable(this);
    this.contentStore = contentStore;
  }

  setContentListViewModel = (contentListViewModelInstance) => {
    this.contentListViewModel = contentListViewModelInstance;
  };

  setForm = (contentFormComponent) => {
    this.contentFormComponent = contentFormComponent;
  };

  setEditContent = (data) => {
    this.formStatus = PAGE_STATUS.READY;
    this.contentFormComponent.populatingFormDataHandler(data[0]);
  };

  getContent = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.contentStore.getContent(
      id,
      this.setEditContent,
      this.callbackOnErrorHander
    );
  };

  post = (data) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.contentStore.saveContent(
      data,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error);
  };

  callbackOnSuccessHandler = () => {
    console.log("callbackOnSuccessHandler");
    this.formStatus = PAGE_STATUS.READY;
    // Return list page
    history.push("/content");
  };
}

export default ContentFormViewModel;
