import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import CalendarUtils from '../CalendarUtils/CalendarUtils';
import * as datesUtility from 'react-big-calendar/lib/utils/dates';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';

const localizer = momentLocalizer(moment);
class CalendarListViewModel {
  calendarStore = null;
  showView = 'month';
  showDate = new Date();

  tableStatus = PAGE_STATUS.LOADING;

  constructor(calendarStore) {
    makeAutoObservable(this);
    this.calendarStore = calendarStore;
  }

  initializeData = () => {
    this.calendarStore.fetchPlanning(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      this.buildFilter()
    );
  };

  onFilter = (date, view) => {
    console.log('onFilter', date, view);

    this.showDate = date;
    this.showView = view;

    this.tableStatus = PAGE_STATUS.LOADING;

    this.calendarStore.fetchPlanning(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      this.buildFilter()
    );
  };

  buildFilter = () => ({
    startDate: datesUtility.firstVisibleDay(this.showDate, localizer).toISOString(),
    endDate: datesUtility.lastVisibleDay(this.showDate, localizer).toISOString(),
  });

  callbackOnErrorHander = (error) => {
    console.log('callbackOnErrorHander');
    console.log(error);

    this.tableStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (calendarModelData) => {
    console.log('callbackOnSuccessHandler', calendarModelData);

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
