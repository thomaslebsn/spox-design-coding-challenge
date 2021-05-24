import { runInAction } from 'mobx';

import CalendarUtils from '../CalendarUtils/CalendarUtils';

import { EasiiPlanningApiService } from 'easii-io-web-service-library';

export default class CalendarStore {
  async fetchPlanning(callbackOnSuccess, callbackOnError, dataFilter) {
    try {
      console.log('Calendar Store - Fetch Content');
      const planningAPIService = new EasiiPlanningApiService();

      const repondedDataFromLibrary = await planningAPIService.searchPlanning(dataFilter);
      console.log('repondedDataFromLibrary', repondedDataFromLibrary);

      const planningDataModels = CalendarUtils.transformCalendarResponseIntoModel(
        repondedDataFromLibrary.list
      );
      console.log('planningDataModels', planningDataModels);

      if (planningDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: planningDataModels,
            pagination: repondedDataFromLibrary.pagination,
          });
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
