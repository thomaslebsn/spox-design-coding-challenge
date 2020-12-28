import { makeAutoObservable } from "mobx";

class ProjectFormModalViewModel {
  show = false;
  projectEditdata = null;
  editMode = false;
  projectListViewModel = null;

  projectStore = null;
  projectFormComponent = null;

  constructor(projectStore) {
    makeAutoObservable(this);
    this.projectStore = projectStore;
  }

  setProjectListViewModel = (projectListViewModelInstance) => {
    this.projectListViewModel = projectListViewModelInstance;
  };

  setForm = (projectFormComponent) => {
    this.projectFormComponent = projectFormComponent;
  };

  setData = (data) => {
    this.editMode = true;
    this.projectEditdata = data;
  };

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.editMode = false;
    this.show = false;
  };

  saveOnModal = () => {
    const isFormValid = this.projectFormComponent.isFormValid();

    if (isFormValid) {
      this.projectStore.saveProject(
        this.projectFormComponent.formPropsData,
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
    this.projectListViewModel.refreshTableProjectList();
  };
}

export default ProjectFormModalViewModel;
