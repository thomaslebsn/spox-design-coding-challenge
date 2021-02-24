import CampaignsFormModalViewModel from "./CampaignsFormModalViewModel";
import CampaignsListViewModel from "./CampaignsListViewModel";
import CampaignsSelectionViewModel from "./CampaignsSelectionViewModel";

class CampaignsViewModel {
  campaignsListViewModel = null;
  campaignsSelectionViewModel = null;
  campaignsFormModalViewModel = null;

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
    }
  }

  getCampaignsListViewModel = () => this.campaignsListViewModel;
  getCampaignsSelectionViewModel = () => this.campaignsSelectionViewModel;
  getCampainsFormModalViewModel = () => this.campaignsFormModalViewModel;
}

export default CampaignsViewModel;
