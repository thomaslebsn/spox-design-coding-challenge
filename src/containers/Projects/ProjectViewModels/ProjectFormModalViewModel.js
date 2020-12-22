import { makeAutoObservable } from "mobx";

class ProjectFormModalViewModel {
  show = false;

  constructor(projectStore) {
    makeAutoObservable(this);
    this.projectStore = projectStore;
  }

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.show = false;
  };

  saveModal = (callbackOnSuccess) => {
    this.projectStore.saveProject(callbackOnSuccess);
  }
}

export default ProjectFormModalViewModel;

