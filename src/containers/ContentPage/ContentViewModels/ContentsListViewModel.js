import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import ContentUtils from "../ContentUtils/ContentUtils";
import { CONTENT_FIELD_KEY } from "../../../constants/ContentModule";
class ContentsListViewModel {
  contentStore = null;

  contents = null;

  tableRowHeader = null;

  tableStatus = PAGE_STATUS.LOADING;

  contentIdsSelected = null;

  constructor(contentStore) {
    makeAutoObservable(this);
    this.contentStore = contentStore;
  }

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.contentStore.fetchContents(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  refreshTableContentList = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.contentStore.fetchContents(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  deleteContents = () => {
    this.tableStatus = PAGE_STATUS.LOADING;

    this.contentStore.deleteContents(
      this.contentIdsSelected,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    alert(error);
  };

  callbackOnSuccessHandler = (contentModelData) => {
    console.log("callbackOnSuccessHandler");
    console.log(contentModelData);
    if (contentModelData) {
      this.tableStatus = PAGE_STATUS.READY;
      this.tableRowHeader = [
        {
          Header: "Name",
          accessor: CONTENT_FIELD_KEY.NAME, // accessor is the "key" in the data
        },

        {
          Header: "Created Date",
          accessor: CONTENT_FIELD_KEY.CREATED_DATE,
        },
        {
          Header: "Updated Date",
          accessor: CONTENT_FIELD_KEY.UPDATED_DATE,
        },
      ];

      console.log("Row Data is tableRowHeader");
      console.log(this.tableRowHeader);

      const rowDataTransformed = ContentUtils.transformContentModelIntoTableDataRow(
        contentModelData
      );
      console.log("Row Data is Formatted");
      console.log(rowDataTransformed);
      this.contents = rowDataTransformed;
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default ContentsListViewModel;
