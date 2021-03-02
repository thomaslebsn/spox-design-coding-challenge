import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import CampaignsUtils from "../CampaignsUtils/CampaignsUtils";
import { CAMPAIGNS_FIELD_KEY } from "../../../constants/CampaignsModule";

import { notify } from "../../../components/Toast";

class CampaignsSelectionViewModel {
  show = false;

  multi = false;

  campaignStore = null;

  campaigns = null;

  tableStatus = PAGE_STATUS.LOADING;

  campaignSelectionData = [];

  constructor(campaignStore) {
    makeAutoObservable(this);
    this.campaignStore = campaignStore;
  }

  openModal = () => {
    console.log("openModal");
    this.show = true;
  };

  closeModal = () => {
    console.log("closeModal");
    this.show = false;
  };

  setSelectionData = (data) => {
    console.log("setSelectionData");
    console.log(data);

    if (!this.multi) {
      this.campaignSelectionData = [];
    }

    this.campaignSelectionData.push(data);
  };

  setMulti = (multi) => {
    this.multi = multi;
  };

  getSectionsValue = () => {
    return this.campaignSelectionData
      .map((item) => {
        return {
          value: item[CAMPAIGNS_FIELD_KEY.ID],
          label: item[CAMPAIGNS_FIELD_KEY.NAME],
        };
      })
      .reduce((arr, el) => {
        const i = arr.findIndex((e) => e.value === el.value);

        if (i === -1) {
          arr.push(el);
        } else {
          arr[i] = el;
        }
        return arr;
      }, []);
  };

  getSelectionData = () => {
    return this.campaignSelectionData;
  };

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.campaignStore.getCampaignMasterData(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessHandler = (campaignModelData) => {
    console.log("callbackOnSuccessHandler - campaign selection");
    console.log(campaignModelData);
    if (campaignModelData) {
      this.tableStatus = PAGE_STATUS.READY;
     
      this.campaigns = campaignModelData.toDropdownFullListValues();
      console.log(this.campaigns);
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default CampaignsSelectionViewModel;
