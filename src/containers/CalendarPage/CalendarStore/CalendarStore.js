import { runInAction } from "mobx";

import ContentUtils from "../../ContentPage/ContentUtils/ContentUtils";

import { EasiiContentApiService } from "easii-io-web-service-library";

export default class CalendarStore {
  async fetchContents(callbackOnSuccess, callbackOnError, paginationStep) {
    try {
      console.log("Content Store - Fetch Content");
      const contentAPIService = new EasiiContentApiService();

      const repondedDataFromLibrary = await contentAPIService.getContents(
        paginationStep,
        25
      );
      console.log(
        "repondedDataFromLibrary repondedDataFromLibrary",
        repondedDataFromLibrary
      );

      const contentDataModels = ContentUtils.transformContentResponseIntoModel(
        repondedDataFromLibrary.list
      );
      console.log("contentDataModels");
      console.log(contentDataModels);

      if (contentDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: contentDataModels,
            pagination: repondedDataFromLibrary.pagination,
          });
        });
      } else {
        callbackOnError({
          message: "Something went wrong from Server response",
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
