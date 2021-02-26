import { makeAutoObservable } from "mobx";
import { notify } from "../../../components/Toast";
import ProjectUtils from "../../ProjectsPage/ProjectUtils/ProjectUtils";
import ProjectStore from "../../ProjectsPage/ProjectStore/ProjectStore";
import PAGE_STATUS from "../../../constants/PageStatus";

class ContentsFilterFormViewModel {
  contentsStore = null;

  dropdownlistProjectValues = null

  constructor(contentsStore) {
    makeAutoObservable(this);
    this.contentsStore = contentsStore;
  }

  initData = () => {
    // this.contentsStore.getProjectMasterData( 
    //   this.callbackOnSuccessHandler
    //  , this.callbackOnErrorHander);
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

export default ContentsFilterFormViewModel;
