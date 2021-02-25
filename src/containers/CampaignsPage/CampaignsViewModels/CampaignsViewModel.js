import CampaignsFormModalViewModel from "./CampaignsFormModalViewModel";
import CampaignsListViewModel from "./CampaignsListViewModel";
import CampaignsSelectionViewModel from "./CampaignsSelectionViewModel";
import CampaignsFilterFormViewModel from "./CampaignsFilterFormViewModel";

class CampaignsViewModel {
  campaignsListViewModel = null;
  campaignsSelectionViewModel = null;
  campaignsFormModalViewModel = null;
  CampaignsFilterFormViewModel = null;

  constructor(campaignsStore) {
    if (campaignsStore) {
      console.log("CampaignsViewModel - Abstract");
      this.campaignsFormModalViewModel = new CampaignsFormModalViewModel(
        campaignsStore
      );
      this.campaignsListViewModel = new CampaignsListViewModel(campaignsStore);
      this.campaignsSelectionViewModel = new CampaignsSelectionViewModel(
        campaignsStore
      );

      this.campaignsFormModalViewModel.setCampaignsListViewModel(
        this.campaignsListViewModel
      );

      this.CampaignsFilterFormViewModel = new CampaignsFilterFormViewModel(
        campaignsStore
      );
    }
  }

  getCampaignsListViewModel = () => this.campaignsListViewModel;
  getCampaignsSelectionViewModel = () => this.campaignsSelectionViewModel;
  getCampainsFormModalViewModel = () => this.campaignsFormModalViewModel;
  getCampaignsFilterFormViewModel = () => this.CampaignsFilterFormViewModel;
}

export default CampaignsViewModel;
