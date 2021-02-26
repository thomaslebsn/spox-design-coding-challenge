import { makeAutoObservable } from "mobx";
import { notify } from "../../../components/Toast";
import ProjectUtils from "../../ProjectsPage/ProjectUtils/ProjectUtils";
import ProjectStore from "../../ProjectsPage/ProjectStore/ProjectStore";
import PAGE_STATUS from "../../../constants/PageStatus";

class CampaignsFilterFormViewModel {
  campaignsStore = null;

  dropdownlistProjectValues = null

  constructor(campaignsStore) {
    makeAutoObservable(this);
    this.campaignsStore = campaignsStore;
  }

  initData = () => {
    this.campaignsStore.getProjectMasterData( 
      this.callbackOnSuccessHandler
     , this.callbackOnErrorHander);
  }
 
  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessHandler = (projectMasterDataInModel) => {
    console.log("callbackOnSuccessHandler - filterForm");
    this.dropdownlistProjectValues = projectMasterDataInModel
        ? projectMasterDataInModel.toDropdownListValues()
        : null;

        console.log(this.dropdownlistProjectValues);
  };
}

export default CampaignsFilterFormViewModel;
