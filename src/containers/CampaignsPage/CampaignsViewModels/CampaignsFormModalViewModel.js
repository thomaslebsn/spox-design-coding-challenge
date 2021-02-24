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

  dropdownlistProjectValues = null;

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
    console.log("Set edit data for campaign:", data[0]);
    this.editMode = true;
    this.formStatus = PAGE_STATUS.READY;

    if (data[0] !== undefined && typeof data == "object") {
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

  initForm = (id = null) => {
    console.log("Init Campaign Form");
    this.campaignsStore.getProjectMasterData((projectMasterDataInModel) => {
      this.dropdownlistProjectValues = projectMasterDataInModel ? projectMasterDataInModel.toDropdownListValues() : null;
      if(id && id > 0){
        this.campaignsStore.getCampaign(
          id,
          this.setEditCampaigns,
          this.callbackOnErrorHander
        );
      } else {
        this.formStatus = PAGE_STATUS.READY;
      }
    }, this.callbackOnErrorHander);
  };

  loadForm = (id = null) => {
    this.openModal();
    this.formStatus = PAGE_STATUS.LOADING;
    this.initForm(id);
  };

  getCampaignEditData = () => this.campaignEditdata;

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
      console.log("CAMPAIGN ID NE", campaignId);
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
