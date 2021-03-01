import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import CampaignsUtils from "../CampaignsUtils/CampaignsUtils";
import { CAMPAIGNS_FIELD_KEY } from "../../../constants/CampaignsModule";
import { notify } from "../../../components/Toast";
import contentStore from "../../ContentPage/ContentStore/ContentStore";

class CampaignsListViewModel {
  campaignsStore = null;

  campaigns = null;

  pagination = null;

  tableRowHeader = null;

  dataFilter = null;

  tableStatus = PAGE_STATUS.LOADING;

  campaignsIdsSelected = null;

  contentStore = null;

  constructor(campaignsStore) {
    makeAutoObservable(this);
    this.campaignsStore = campaignsStore;
    this.contentStore = new contentStore();
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

    this.campaignsStore.deleteCampaigns(
      this.campaignsIdsSelected,
      this.refreshTableCampaignsList,
      this.callbackOnErrorHander
    );
  };

  getPagination = (paginationStep) => {
    console.log("paginationStep", paginationStep);
    this.tableStatus = PAGE_STATUS.LOADING;
    this.campaignsStore.fetchCampaigns(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      paginationStep
    );
  };

  searchCampaign = (dataFilter) => {
    this.dataFilter = dataFilter;
    console.log("dataFilter");
    console.log(dataFilter);
    this.campaignsStore.searchCampaigns(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      dataFilter
    );
  };

  getContentByIdCampaign = (campaignId) => {
    console.log("31231");
    contentStore.getContentsByCampaignIDs(
      campaignId,
      20,
      (result) => {
        console.log("======================");
        console.log(result);
        this.contentData = result;
      },
      (error) => {}
    );
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessHandler = (campaignsModelData) => {
    console.log("callbackOnSuccessHandler");
    console.log(campaignsModelData);
    if (campaignsModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      const rowDataTransformed = CampaignsUtils.transformCampaignsModelIntoTableDataRow(
        campaignsModelData.list
      );
      console.log("Row Data is Formatted");
      console.log(rowDataTransformed);
      this.campaigns = rowDataTransformed;
      this.pagination = campaignsModelData.pagination;

      console.log("this.pagination this.pagination", this.pagination);
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default CampaignsListViewModel;
