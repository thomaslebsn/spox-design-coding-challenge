import { makeAutoObservable } from "mobx";
import { notify } from "../../../components/Toast";
import ProjectUtils from "../../ProjectsPage/ProjectUtils/ProjectUtils";
import ProjectStore from "../../ProjectsPage/ProjectStore/ProjectStore";

class CampaignsFormModalViewModel {
  show = false;
  campaignsEditdata = null;
  editMode = false;
  campaignsListViewModel = null;

  campaignsStore = null;
  campaignsFormComponent = null;

  projects = null;

  constructor(campaignsStore) {
    makeAutoObservable(this);
    this.campaignsStore = campaignsStore;
  }

  setCampaignsListViewModel = (campaignsListViewModelInstance) => {
    this.campaignsListViewModel = campaignsListViewModelInstance;
  };

  setForm = (campaignsFormComponent) => {
    this.campaignsFormComponent = campaignsFormComponent;
  };

  setEditCampaigns = (data) => {
    this.editMode = true;
    this.campaignsEditdata = data;
  };

  getCampaigns = (id) => {
    this.editMode = true;
    this.campaignsStore.getCampaigns(
      id,
      this.setEditCampaigns,
      this.callbackOnErrorHander
    );
  };

  getProjects = () => {
    console.log("campaign get project");
    ProjectStore.fetchProjects(
      this.callbackProjectOnSuccessHandler,
      this.callbackProjectOnErrorHander
    );
    // console.log('=================');
    // return this.projects;
  };

  callbackProjectOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
  };

  callbackProjectOnSuccessHandler = (projectModelData) => {
    console.log("callbackOnSuccessHandler");
    console.log(projectModelData);
    if (projectModelData) {
      const rowDataTransformed = ProjectUtils.transformProjectModelIntoTableDataRow(
        projectModelData
      );

      console.log("Row Data is Formatted");
      console.log(rowDataTransformed);
      this.projects = rowDataTransformed;
    }
  };

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.editMode = false;
    this.show = false;
  };

  saveOnModal = () => {
    console.log("Campaign saveOnModal debug");
    // const isFormValid = this.campaignsFormComponent.isFormValid();
    const isFormValid = true;
    if (isFormValid) {
      this.campaignsStore.saveCampaigns(
        this.campaignsFormComponent.formPropsData,
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
    this.campaignsListViewModel.refreshTableCampaignsList();
  };
}

export default CampaignsFormModalViewModel;
