import { makeAutoObservable } from "mobx";
import { notify } from "../../../components/Toast";
import ProjectUtils from "../../ProjectsPage/ProjectUtils/ProjectUtils";
import ProjectStore from "../../ProjectsPage/ProjectStore/ProjectStore";
import PAGE_STATUS from "../../../constants/PageStatus";

class ContentsFilterFormViewModel {
  contentsStore = null;

  campaignsMasterData = null;
  personaMasterData = null;

  constructor(contentsStore) {
    makeAutoObservable(this);
    this.contentsStore = contentsStore;
  }

  initData = () => {
    this.contentsStore.getMasterData(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander - content");
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessHandler = (masterDataInModel) => {
    console.log("callbackOnSuccessHandler - filterForm ------");
    this.campaignsMasterData = masterDataInModel.resultCampaignInModel
      ? masterDataInModel.resultCampaignInModel.toDropdownListValues()
      : null;

    this.personaMasterData = masterDataInModel.resultPersonaInModel
      ? masterDataInModel.resultPersonaInModel.toDropdownListValues()
      : null;
  };
}

export default ContentsFilterFormViewModel;
