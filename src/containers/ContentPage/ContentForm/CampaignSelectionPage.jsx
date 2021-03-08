import React, { lazy } from "react";

import CampaignsStore from "../../CampaignsPage/CampaignsStore/CampaignsStore";
import CampaignsViewModel from "../../CampaignsPage/CampaignsViewModels/CampaignsViewModel";
import { CampaignsViewModelContextProvider } from "../../CampaignsPage/CampaignsViewModels/CampaignsViewModelContextProvider";
import GlobalStore from "../../../store/Store";

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}

const globalStore = window.globalStore;
const campaignsStore = new CampaignsStore({
  globalStore: globalStore,
});

const campaignsViewModel = new CampaignsViewModel(campaignsStore);

const CampaignsSelection = lazy(() =>
  import("../../CampaignsPage/CampaignsSelection/CampaignsSelection")
);

const CampaignSelectionPage = () => {
  return (
    <CampaignsViewModelContextProvider viewModel={campaignsViewModel}>
      <CampaignsSelection />
    </CampaignsViewModelContextProvider>
  );
};

const campaignSelectionViewModal = campaignsViewModel.getCampaignsSelectionViewModel();

export { CampaignSelectionPage, campaignSelectionViewModal };
