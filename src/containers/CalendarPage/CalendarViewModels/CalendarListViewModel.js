import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import ContentUtils from "../../ContentPage/ContentUtils/ContentUtils";
import { notify } from "../../../components/Toast";

class CalendarListViewModel {
  calendarStore = null;

  tableStatus = PAGE_STATUS.LOADING;

  constructor(calendarStore) {
    makeAutoObservable(this);
    this.calendarStore = calendarStore;
  }

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.calendarStore.fetchContents(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessHandler = (contentModelData) => {
    console.log("callbackOnSuccessHandler");
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
      this.list = rowDataTransformed;
      this.pagination = contentModelData.pagination;

      console.log("this.pagination this.pagination", this.pagination);
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default CalendarListViewModel;
