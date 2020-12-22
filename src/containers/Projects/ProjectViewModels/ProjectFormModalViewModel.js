import { makeAutoObservable } from "mobx";

class ProjectFormModalViewModel {
  open = false;
  dimmer = undefined;

  constructor(projectStore) {
    makeAutoObservable(this);
    this.projectStore = projectStore;
  }

  openModal = () => {
    this.open = true;
    this.dimmer = "blurring";
  };

  closeModal = () => {
    this.open = false;
    this.dimmer = undefined;
  };
}

export default ProjectFormModalViewModel;

