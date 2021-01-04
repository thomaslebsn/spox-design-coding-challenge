import CampaignsListViewModel from "./CampaignsListViewModel";

class CampaignsViewModel {
  campaignsListViewModel = null;

  constructor(campaignsStore) {
    if (campaignsStore) {
      console.log("CampaignsViewModel - Abstract");
      this.campaignsListViewModel = new CampaignsListViewModel(campaignsStore);
    }
  }

  getCampaignsListViewModel = () => this.campaignsListViewModel;
}

export default CampaignsViewModel;
