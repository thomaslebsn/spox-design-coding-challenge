import React from "react";
import { makeAutoObservable, runInAction } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";

import NewsUtils from "../NewsUtils/NewsUtils";
import NewsModel from "../NewsModel/NewsModel";
import {
  EasiiNewsApiService,
  EasiiNewsChannelApiService,
} from "easii-io-web-service-library";

export default class NewsStore {
  async fetchNews(callbackOnSuccess, callbackOnError, paginationStep = 0, paginationSize = 25) {
    try {
      console.log("News Store - Fetch News");
      const projectAPIService = new EasiiNewsApiService();
      const respondedDataFromLibrary = await projectAPIService.getNews(
        paginationStep,
        paginationSize
      );

      const projectDataModels = NewsUtils.transformNewsResponseIntoModel(
        respondedDataFromLibrary.list
      );

      if (projectDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: projectDataModels,
            pagination: respondedDataFromLibrary.pagination,
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

  async searchNews(
    callbackOnSuccess,
    callbackOnError,
    dataFilter = {},
    paginationStep = 1,
    paginationSize = 25
  ) {
    try {
      console.log("News Store - filter News");
      const projectAPIService = new EasiiNewsApiService();
      const respondedDataFromLibrary = await projectAPIService.searchNews(
        dataFilter,
        paginationStep,
        paginationSize
      );

      console.log("Debugging ---- filterNews");
      console.log(respondedDataFromLibrary);
      let projectDataModels = null;

      if (respondedDataFromLibrary !== null) {
        projectDataModels = NewsUtils.transformNewsResponseIntoModel(
          respondedDataFromLibrary.list
        );
      }

      if (projectDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: projectDataModels,
            pagination: respondedDataFromLibrary.pagination,
          });
        });
      } else {
        callbackOnError({
          message: "No result",
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async saveNews(projectData, callbackOnSuccess, callbackOnError) {
    try {
      console.log("Saving News via call web service lib function");
      console.log(projectData);

      const convertedNewsData = NewsModel.convertSubmittedDataToAPIService(
        projectData
      );

      console.log("News Converted Data");
      console.log(convertedNewsData);

      const projectAPIService = new EasiiNewsApiService();

      var resultOnSave;
      let projectId = null;

      if (projectData.id == undefined) {
        console.log("CREATE PROJECT");
        resultOnSave = await projectAPIService.createNews(
          convertedNewsData
        );

        projectId = resultOnSave;
        console.log("CREATE PROJECT projectId");
        console.log(projectId);
      } else {
        console.log("UPDATE PROJECT", convertedNewsData);
        convertedNewsData.logo =
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
        resultOnSave = await projectAPIService.updateNews(
          convertedNewsData
        );
        projectId = projectData.id;
      }

      console.log("resultOnSave projectId", projectId);

      if (resultOnSave) {
        runInAction(() => {
          callbackOnSuccess(projectId);
        });
      } else {
        runInAction(() => {
          callbackOnError({
            message: "Something went wrong from Server response",
          });
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async deleteNews(ids, callbackOnSuccess, callbackOnError) {
    if (!ids) return false;

    console.log("DELETE PROJECT IDS");
    console.log(ids);

    try {
      const projectAPIService = new EasiiNewsApiService();
      const deleteIds = ids.join();
      console.log("Prepare ids for delete: ", deleteIds);
      const respondedFromApi = await projectAPIService.deleteNews(deleteIds);

      if (respondedFromApi.result === true) {
        runInAction(() => {
          callbackOnSuccess();
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getNews(id, callbackOnSuccess, callbackOnError) {
    if (!id) return false;

    try {
      const results = true;

      // const editNews = projects.filter(function (e) {
      //   return id === e.id;
      // });

      if (results) {
        const projectAPIService = new EasiiNewsApiService();
        const respondedDataFromLibrary = await projectAPIService.getNewsItem(
          id
        );
        console.log("PROJECT RESPONDED ITEM");
        console.log(id);
        console.log(respondedDataFromLibrary);
        const projectDataModels = NewsUtils.transformNewsResponseIntoModel(
          [respondedDataFromLibrary]
        );

        console.log(projectDataModels);

        if (projectDataModels) {
          runInAction(() => {
            callbackOnSuccess(projectDataModels);
          });
        } else {
          callbackOnError({
            message: "Something went wrong from Server response",
          });
        }
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
