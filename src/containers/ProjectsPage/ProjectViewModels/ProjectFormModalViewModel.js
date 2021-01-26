import { makeAutoObservable } from "mobx";
import { notify } from "../../../components/Toast";
import PAGE_STATUS from "../../../constants/PageStatus";

class ProjectFormModalViewModel {
  show = false;
  projectEditdata = null;
  editMode = null;
  projectListViewModel = null;
  formStatus = PAGE_STATUS.READY;

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

  setEditProject = (data) => {
    this.editMode = true;
    this.formStatus = PAGE_STATUS.READY;
    this.projectEditdata = data[0];
  };

  getProject = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.projectStore.getProject(
      id,
      this.setEditProject,
      this.callbackOnErrorHander
    );
  };

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.editMode = false;
    this.show = false;
  };

  saveOnModal = () => {
    //const isFormValid = this.projectFormComponent.isFormValid();
    const isFormValid = true;

    console.log("Project Creation - isFormValid:");
    console.log(isFormValid);

    if (this.editMode) {
      const projectID = this.projectEditdata.getId();
      this.projectFormComponent.formPropsData.id = projectID.value;
    }

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
    notify(error.message);
  };

  callbackOnSuccessHandler = () => {
    console.log("callbackOnSuccessHandler");
    this.closeModal();
    this.projectListViewModel.refreshTableProjectList();
  };
}

export default ProjectFormModalViewModel;
