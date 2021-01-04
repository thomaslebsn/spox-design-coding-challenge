import React, { lazy } from "react";

import CampaignsViewModel from "./CampaignsViewModels/CampaignsViewModel";
import { CampaignsViewModelContextProvider } from "./CampaignsViewModels/CampaignsViewModelContextProvider";
import CampaignsStore from "./CampaignsStore/CampaignsStore";
const CampaignsList = lazy(() => import("./CampaignsList/CampaignsList"));

const campaignsStore = new CampaignsStore();
const campaignsViewModel = new CampaignsViewModel(campaignsStore);

function Campaigns({ match, location }) {
  return (
    <CampaignsViewModelContextProvider viewModel={campaignsViewModel}>
      <div className="py-4 px-3">
        <>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="text-blue-0">List Campaigns</h2>
          </div>
          <CampaignsList />
        </>
      </div>
    </CampaignsViewModelContextProvider>
  );
}

export default Campaigns;
