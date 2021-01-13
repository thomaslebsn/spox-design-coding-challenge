import CampaignsFormModalViewModel from "./CampaignsFormModalViewModel";
import CampaignsListViewModel from "./CampaignsListViewModel";
import CampaignsSelectionViewModel from "./CampaignsSelectionViewModel";

class CampaignsViewModel {
  campaignsListViewModel = null;
  campaignsSelectionViewModel = null;
  CampaignsFormModalViewModel = null;

  constructor(campaignsStore) {
    if (campaignsStore) {
      console.log("CampaignsViewModel - Abstract");
      this.CampaignsFormModalViewModel = new CampaignsFormModalViewModel(
        campaignsStore
      );
      this.campaignsListViewModel = new CampaignsListViewModel(campaignsStore);
      this.campaignsSelectionViewModel = new CampaignsSelectionViewModel(
        campaignsStore
      );

      this.CampaignsFormModalViewModel.setCampaignsListViewModel(
        this.campaignsListViewModel
      );
    }
  }

  getCampaignsListViewModel = () => this.campaignsListViewModel;
  getCampaignsSelectionViewModel = () => this.campaignsSelectionViewModel;
  getCampainsFormModalViewModel = () => this.CampaignsFormModalViewModel;
}

export default CampaignsViewModel;
