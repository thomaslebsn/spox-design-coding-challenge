import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import CampaignsUtils from "../CampaignsUtils/CampaignsUtils";
import { CAMPAIGNS_FIELD_KEY } from "../../../constants/CampaignsModule";
import { notify } from "../../../components/Toast";

class CampaignsListViewModel {
  campaignsStore = null;

  campaigns = null;

  pagination = null;

  tableRowHeader = null;

  valueSearch = null;

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

  searchCampaign = (keyword) => {
    if (keyword === '' || keyword === undefined || keyword.trim() === '')
    {
      notify('Please must enter value before doing search function');
      return false;
    }

    const dataFilter = {
      keyword: keyword
    }

    this.valueSearch = keyword;

    this.campaignsStore.searchCampaigns(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      dataFilter
    );
  }

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
