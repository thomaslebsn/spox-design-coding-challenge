import CampaignsListViewModel from "./CampaignsListViewModel";
import CampaignsSelectionViewModel from "./CampaignsSelectionViewModel";

class CampaignsViewModel {
  campaignsListViewModel = null;
  campaignsSelectionViewModel = null;

  constructor(campaignsStore) {
    if (campaignsStore) {
      console.log("CampaignsViewModel - Abstract");
      this.campaignsListViewModel = new CampaignsListViewModel(campaignsStore);
      this.campaignsSelectionViewModel = new CampaignsSelectionViewModel(
        campaignsStore
      );
    }
  }

  getCampaignsListViewModel = () => this.campaignsListViewModel;
  getCampaignsSelectionViewModel = () => this.campaignsSelectionViewModel;
}

export default CampaignsViewModel;
