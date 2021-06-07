import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import ContentUtils from "../ContentUtils/ContentUtils";
import { CONTENT_FIELD_KEY } from "../../../constants/ContentModule";
import history from "../../../routes/history";
import { notify } from "../../../components/Toast";
class ContentsListViewModel {
  contentStore = null;

  contents = null;

  pagination = null;

  tableRowHeader = null;

  tableStatus = PAGE_STATUS.LOADING;

  contentIdsSelected = null;

  pageSize = 5;

  constructor(contentStore) {
    makeAutoObservable(this);
    this.contentStore = contentStore;
  }

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.contentStore.fetchContents(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      0,
      this.pageSize
    );
  };

  refreshTableContentList = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.contentStore.fetchContents(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      0,
      this.pageSize
    );
  };

  deleteContents = () => {
    let getArrayId = this.contentIdsSelected;

    if (getArrayId === null) {
      notify("Please true add list an item for delete");
    } else {
      this.tableStatus = PAGE_STATUS.LOADING;

      this.contentStore.deleteContents(
        this.contentIdsSelected,
        this.refreshTableContentList,
        this.callbackOnErrorHander
      );
    }
  };

  getPagination = (paginationStep) => {
    console.log("paginationStep", paginationStep);
    this.tableStatus = PAGE_STATUS.LOADING;
    this.contentStore.fetchContents(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      paginationStep,
      this.pageSize
    );
  };

  searchContents = (dataFilter) => {
    this.dataFilter = dataFilter;
    console.log("dataFilter");
    console.log(dataFilter);
    this.contentStore.searchContents(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      dataFilter,
      0,
      this.pageSize
    );
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessHandler = (contentModelData) => {
    console.log("callbackOnSuccessHandler1234");
    console.log(contentModelData);
    if (contentModelData) {
      this.tableStatus = PAGE_STATUS.READY;
      console.log("============1");
      const rowDataTransformed = ContentUtils.transformContentModelIntoTableDataRow(
        contentModelData.list
      );
      console.log("============2");
      console.log("Row Data is Formatted");
      console.log(rowDataTransformed);
      this.contents = rowDataTransformed;
      this.pagination = contentModelData.pagination;

      console.log("this.pagination this.pagination", this.pagination);
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default ContentsListViewModel;
