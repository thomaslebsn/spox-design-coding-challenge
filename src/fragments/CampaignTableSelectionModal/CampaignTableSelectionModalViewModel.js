import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../constants/PageStatus";
import { CAMPAIGNS_FIELD_KEY } from "../../constants/CampaignsModule";
import { notify } from "../../components/Toast";

class CampaignTableSelectionModalViewModel {
  show = false;

  multi = false;

  fragmentStore = null;

  CampaignsMasterData = null;

  tableStatus = PAGE_STATUS.LOADING;

  CampaignsSelectionData = [];

  getDataSelectOptions = [];

  inputRef = null;
  constructor(fragmentStore) {
    makeAutoObservable(this);
    this.fragmentStore = fragmentStore;
  }

  openModal = (inputRef) => {
    this.show = true;
    this.inputRef = inputRef;
  };

  closeModal = () => {
    this.show = false;
    this.inputRef = null;
  };

  setSelectionData = (data) => {
    if (!this.multi) {
      this.CampaignsSelectionData = [];
    }
    if (data) {
      this.CampaignsSelectionData.push(data);
    }
  };

  setMulti = (multi) => {
    this.multi = multi;
  };

  getSectionsValue = () => {
    return this.CampaignsSelectionData.map((item) => {
      return {
        value: item[CAMPAIGNS_FIELD_KEY.ID],
        label: item[CAMPAIGNS_FIELD_KEY.NAME],
      };
    }).reduce((arr, el) => {
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
    return this.CampaignsSelectionData;
  };

  getSelectedIDs = () => {
    if (!this.CampaignsSelectionData) return null;
    const convertedInArray = this.CampaignsSelectionData.map((item) => {
      return item[CAMPAIGNS_FIELD_KEY.ID];
    }).reduce((arr, el) => {
      const i = arr.findIndex((e) => e.value === el.value);

      if (i === -1) {
        arr.push(el);
      } else {
        arr[i] = el;
      }
      return arr;
    }, []);
    let result = convertedInArray;
    if (!this.multi) {
      result = convertedInArray.length > 0 ? convertedInArray[0] : null;
    }
    return result;
  };

  loadDataIntoUI = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.fragmentStore.getCampaignMasterData(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  resetObservableProperties() {
    this.multi = false;
    this.CampaignsSelectionData = [];
    this.CampaignsMasterData = null;
    this.tableStatus = PAGE_STATUS.LOADING;
  }

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander campaign selection -");
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessHandler = (campaignModelData) => {
    console.log("callbackOnSuccessHandler - campaign selection -----");
    console.log(campaignModelData);
    if (campaignModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      this.CampaignsMasterData = campaignModelData.toDropdownFullListValues();
      // NEW
      this.getDataSelectOptions = campaignModelData.toDropdownListValues();
      console.log(this.CampaignsMasterData);
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default CampaignTableSelectionModalViewModel;
