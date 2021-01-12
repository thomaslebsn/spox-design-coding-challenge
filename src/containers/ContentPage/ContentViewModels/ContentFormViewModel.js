import { makeAutoObservable, runInAction } from "mobx";

class ContentFormViewModel {
  contentEditdata = null;
  editMode = false;
  contentListViewModel = null;

  contentStore = null;
  contentFormComponent = null;

  constructor(contentStore) {
    makeAutoObservable(this);
    this.contentStore = contentStore;
  }

  setContentListViewModel = (contentListViewModelInstance) => {
    this.contentListViewModel = contentListViewModelInstance;
  };

  setForm = (contentFormComponent) => {
    this.contentFormComponent = contentFormComponent;
  };

  post = () => {
    console.log("post");
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    alert(error);
  };

  callbackOnSuccessHandler = () => {
    console.log("callbackOnSuccessHandler");
    this.closeModal();
    this.contentListViewModel.refreshTableContentList();
  };
}

export default ContentFormViewModel;
