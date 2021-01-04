import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import CampaignsUtils from "../CampaignsUtils/CampaignsUtils";
import { CAMPAIGNS_FIELD_KEY } from "../../../constants/CampaignsModule";

class CampaignsListViewModel {
  campaignsStore = null;

  campaigns = null;

  tableRowHeader = null;

  tableStatus = PAGE_STATUS.LOADING;

  campaignsIdsSelected = null;

  constructor(campaignsStore) {
    makeAutoObservable(this);
    this.campaignsStore = campaignsStore;
  }

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.campaignsStore.fetchCampaigns(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  refreshTableCampaignsList = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.campaignsStore.fetchCampaigns(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  deleteCampaigns = () => {
    this.tableStatus = PAGE_STATUS.LOADING;

    this.campaignsStore.deletePersonas(
      this.campaignsIdsSelected,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    alert(error);
  };

  callbackOnSuccessHandler = (campaignsModelData) => {
    console.log("callbackOnSuccessHandler");
    console.log(campaignsModelData);
    if (campaignsModelData) {
      this.tableStatus = PAGE_STATUS.READY;
      this.tableRowHeader = [
        {
          Header: "Name",
          accessor: CAMPAIGNS_FIELD_KEY.NAME, // accessor is the "key" in the data
        },
        {
          Header: "Created Date",
          accessor: CAMPAIGNS_FIELD_KEY.CREATED_DATE,
        },
      ];

      console.log("Row Data is tableRowHeader");
      console.log(this.tableRowHeader);

      const rowDataTransformed = CampaignsUtils.transformCampaignsModelIntoTableDataRow(
        campaignsModelData
      );
      console.log("Row Data is Formatted");
      console.log(rowDataTransformed);
      this.campaigns = rowDataTransformed;
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default CampaignsListViewModel;
