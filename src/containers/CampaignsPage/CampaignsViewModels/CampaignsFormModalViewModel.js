import { makeAutoObservable } from "mobx";
import { notify } from "../../../components/Toast";
import ProjectUtils from "../../ProjectsPage/ProjectUtils/ProjectUtils";
import ProjectStore from "../../ProjectsPage/ProjectStore/ProjectStore";
import PAGE_STATUS from "../../../constants/PageStatus";

class CampaignsFormModalViewModel {
  show = false;
  campaignEditdata = null;
  formStatus = PAGE_STATUS.READY;
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
    console.log('Set edit data for campaign:', data[0]);
    this.editMode = true;
    this.formStatus = PAGE_STATUS.READY;

    if(data[0] !== undefined && (typeof data) == 'object') {
      this.campaignEditdata = data[0];
    }
  };

  getCampaign = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.campaignsStore.getCampaign(
      id,
      this.setEditCampaigns,
      this.callbackOnErrorHander
    );
  };

  getCampaignEditData = () => this.campaignEditdata;

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
    console.log("Campaign saveOnModal debug", this.editMode);
    // const isFormValid = this.campaignsFormComponent.isFormValid();
    const isFormValid = true;

    if (this.editMode) {
      const campaignId = this.campaignEditdata.getId();
      console.log('CAMPAIGN ID NE', campaignId);
      this.campaignsFormComponent.formPropsData.id = campaignId.value;
    }

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
