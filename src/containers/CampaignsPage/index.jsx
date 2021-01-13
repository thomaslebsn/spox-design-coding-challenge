import React, { lazy } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons/faFileExport";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import ComponentDatepicker from "../../components/ComponentDatepicker";

import CampaignsViewModel from "./CampaignsViewModels/CampaignsViewModel";
import { CampaignsViewModelContextProvider } from "./CampaignsViewModels/CampaignsViewModelContextProvider";
import CampaignsStore from "./CampaignsStore/CampaignsStore";
const CampaignsList = lazy(() => import("./CampaignsList/CampaignsList"));

const campaignsStore = new CampaignsStore();
const campaignsViewModel = new CampaignsViewModel(campaignsStore);

function Campaigns() {
  return (
    <CampaignsViewModelContextProvider viewModel={campaignsViewModel}>
      <div className="py-4 px-3">
        <>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="text-blue-0">Campaigns Statistics</h2>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center border-1 bg-white rounded-2 w-180">
                <ComponentDatepicker isDown={true} />
              </div>
              <button className="btn d-flex align-items-center border-1 border-green bg-green rounded-2 ps-3 pe-2 w-150 ms-2">
                <i className="text-white">
                  <FontAwesomeIcon icon={faFileExport} />
                </i>
                <span className="flex-1 ps-2 text-white">Export</span>
                <i className="text-white">
                  <FontAwesomeIcon icon={faChevronDown} />
                </i>
              </button>
            </div>
          </div>
          <CampaignsList />
        </>
      </div>
    </CampaignsViewModelContextProvider>
  );
}

export default Campaigns;
