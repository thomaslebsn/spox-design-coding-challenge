import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import ProjectUtils from "../ProjectUtils/ProjectUtils";
import { PROJECT_COLUMN_INDICATOR } from "../../../constants/ProjectModule";
import { notify } from "../../../components/Toast";
class ProjectsListViewModel {
  projectStore = null;

  projects = null;

  pagination = null;

  tableRowHeader = null;

  tableStatus = PAGE_STATUS.LOADING;

  projectIdsSelected = null;

  dataFilter = null;

  facebookConnected = false;

  twitterConnected = false;

  linkedinConnected = false;

  mailchimpConnected = false;

  instagramConnected = false;

  wordpressConnected = false;

  listFaceBookFanpage = null;

  listFaceBookFanpageView = null;

  showModalCMS = true;

  isList = true;

  pageSize = 5;

  constructor(projectStore) {
    makeAutoObservable(this);
    this.projectStore = projectStore;
  }

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.projectStore.fetchProjects(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      0,
      this.pageSize
    );
  };

  refreshTableProjectList = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.projectStore.fetchProjects(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      0,
      this.pageSize
    );
  };

  deleteProjects = () => {
    let getArrayId = this.projectIdsSelected;

    if (getArrayId === null) {
      notify("Please true add list an item for delete");
    } else {
      this.tableStatus = PAGE_STATUS.LOADING;

      this.projectStore.deleteProjects(
        this.projectIdsSelected,
        this.refreshTableProjectList,
        this.callbackOnErrorHander
      );
    }
  };

  getPagination = (paginationStep, isList) => {
    console.log("paginationStep", paginationStep);
    this.tableStatus = PAGE_STATUS.LOADING;
    this.isList = isList;
    this.projectStore.fetchProjects(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      paginationStep,
      this.pageSize
    );
  };

  searchProjects = (dataFilter) => {
    this.dataFilter = dataFilter;

    this.projectStore.searchProjects(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      dataFilter
    );
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessHandler = (projectModelData) => {
    console.log("callbackOnSuccessHandler");
    console.log(projectModelData);
    if (projectModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      const rowDataTransformed = ProjectUtils.transformProjectModelIntoTableDataRow(
        projectModelData.list
      );

      console.log("Row Data is Formatted");
      console.log(rowDataTransformed);

      this.projects = rowDataTransformed;
      this.pagination = projectModelData.pagination;
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default ProjectsListViewModel;
