import { makeAutoObservable } from "mobx";

class ProjectFormModalViewModel {
  show = false;
  projectListViewModel = null;
  constructor(projectStore) {
    makeAutoObservable(this);
    this.projectStore = projectStore;
  }

  setProjectListViewModel = (projectListViewModelInstance) => {
    this.projectListViewModel = projectListViewModelInstance;
  }

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.show = false;
  };

  saveOnModal = () => {
    this.projectStore.saveProject(this.callbackOnSuccessHandler,this.callbackOnErrorHander);
  }

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    alert(error);
  };

  callbackOnSuccessHandler = () => {
    console.log("callbackOnSuccessHandler");
    this.closeModal();
    this.projectListViewModel.refreshTableProjectList();
  };
}

export default ProjectFormModalViewModel;

