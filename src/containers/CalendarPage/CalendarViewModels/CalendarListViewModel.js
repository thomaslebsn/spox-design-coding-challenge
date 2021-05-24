import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import CalendarUtils from '../CalendarUtils/CalendarUtils';
import { notify } from '../../../components/Toast';

class CalendarListViewModel {
  calendarStore = null;
  showView = 'month';

  tableStatus = PAGE_STATUS.LOADING;

  constructor(calendarStore) {
    makeAutoObservable(this);
    this.calendarStore = calendarStore;
  }

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;

    this.calendarStore.fetchPlanning(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      this.getFilterByView(new Date(), this.showView)
    );
  };

  onFilter = (date, view) => {
    console.log('onFilter', date, view);

    this.calendarStore.fetchPlanning(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      this.getFilterByView(date, view)
    );
  };

  getFilterByView = (date, view) => {
    let filter = {};
    switch (view) {
      case 'month':
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        filter = {
          startDate: firstDay.toISOString(),
          endDate: lastDay.toISOString(),
        };

        break;

      default:
        break;
    }
    return filter;
  };

  callbackOnErrorHander = (error) => {
    console.log('callbackOnErrorHander');
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessHandler = (calendarModelData) => {
    console.log('callbackOnSuccessHandler');
    console.log(calendarModelData);
    if (calendarModelData) {
      this.tableStatus = PAGE_STATUS.READY;
      console.log('============1');
      const rowDataTransformed = CalendarUtils.transformCalendarModelIntoCalendarEvent(
        calendarModelData.list
      );
      console.log('============2');
      console.log('Row Data is Formatted');
      console.log(rowDataTransformed);
      this.list = rowDataTransformed;
      this.pagination = calendarModelData.pagination;

      console.log('this.pagination this.pagination', this.pagination);
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default CalendarListViewModel;
