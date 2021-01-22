import { makeAutoObservable, runInAction } from "mobx";
import { notify } from "../../../components/Toast";
import history from "../../../routes/history";

class ContentFormViewModel {
  contentEditdata = null;
  editMode = false;
  contentListViewModel = null;

  contentStore = null;
  contentFormComponent = null;

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

  post = (data) => {
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
    // Return list page
    history.push("/content");
    this.contentListViewModel.refreshTableContentList();
  };
}

export default ContentFormViewModel;
