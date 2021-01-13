import { makeAutoObservable } from "mobx";
import { notify } from "../../../components/Toast";

class CampaignsFormModalViewModel {
  show = false;
  campaignsEditdata = null;
  editMode = false;
  campaignsListViewModel = null;

  campaignsStore = null;
  campaignsFormComponent = null;

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

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.editMode = false;
    this.show = false;
  };

  saveOnModal = () => {
    const isFormValid = this.campaignsFormComponent.isFormValid();

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
    this.campaignsListViewModel.refreshTableProjectList();
  };
}

export default CampaignsFormModalViewModel;
