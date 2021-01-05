import { makeAutoObservable, runInAction } from "mobx";

class ContentFormViewModel {
  show = false;
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

  setEditContent = (data) => {
    console.log("setEditContent");
    console.log(data);
    this.editMode = true;
    this.contentEditdata = data;
  };

  getContent = (id) => {
    this.editMode = true;
    this.contentStore.getContent(
      id,
      this.setEditContent,
      this.callbackOnErrorHander
    );
  };

  saveOnModal = () => {
    const isFormValid = this.contentFormComponent.isFormValid();

    if (isFormValid) {
      this.contentStore.saveContent(
        this.contentFormComponent.formPropsData,
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHander
      );

      this.closeModal();
    } else {
    }
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
