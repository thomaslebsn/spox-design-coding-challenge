import { runInAction } from "mobx";

import ContentUtils from "../ContentUtils/ContentUtils";
import ContentModel from "../ContentModel/ContentModel";

import {
  EasiiContentApiService,
  EasiiProjectChannelApiService,
} from "easii-io-web-service-library";
import {
  ESI_CONTENT_API_RESPONSE_FIELD_KEY,
  CONTENT_FIELD_KEY,
} from "../../../constants/ContentModule";

export default class ContentStore {
  globalStore = null;
  constructor(args = {}) {
    if (args) {
      this.globalStore = args.globalStore ? args.globalStore : null;
    }
  }

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
      console.log('contentDataModels');
      console.log(contentDataModels);

      if (contentDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: contentDataModels,
            pagination: repondedDataFromLibrary.pagination
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

  async saveContent(contentData, callbackOnSuccess, callbackOnError) {
    try {
      console.log("Saving Content via call web service lib function");
      console.log(contentData);

      const convertedContentData = ContentModel.convertSubmittedDataToAPIService(
        contentData
      );

      console.log("convertedContentData");
      console.log(convertedContentData);

      // Save Content
      const contentService = new EasiiContentApiService();
      let resultContent;

      if (convertedContentData.id == undefined) {
        resultContent = await contentService.createContent(
          convertedContentData
        );
      } else {
        resultContent = await contentService.updateContent(
          convertedContentData
        );
      }

      // Post channel
      const channelService = new EasiiProjectChannelApiService();
      const resultPost = await channelService.postToFanpage(
        contentData[CONTENT_FIELD_KEY.DESCRIPTION]
      );

      if (resultContent && resultPost) {
        runInAction(() => {
          callbackOnSuccess();
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

  async deleteContents(ids, callbackOnSuccess, callbackOnError) {
    if (!ids) return false;

    console.log("DELETE CONTENT IDS");
    console.log(ids);

    try {
      const contentAPIService = new EasiiContentApiService();
      const deleteIds = ids.join();
      console.log("Prepare ids for delete: ", deleteIds);

      const repondedDataFromLibrary = await contentAPIService.deleteContent(
        deleteIds
      );

      if (repondedDataFromLibrary.result === true) {
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

  async getContent(id, callbackOnSuccess, callbackOnError) {
    if (!id) return false;

    try {
      const contentService = new EasiiContentApiService();
      const repondedDataFromLibrary = await contentService.getContentItem(id);

      console.log("Content Store - getContent");
      console.log(repondedDataFromLibrary);

      if (repondedDataFromLibrary) {
        const contentDataModels = ContentUtils.transformContentResponseIntoModel(
          [repondedDataFromLibrary]
        );

        if (contentDataModels) {
          runInAction(() => {
            callbackOnSuccess(contentDataModels);
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

  async searchContents(callbackOnSuccess, callbackOnError, dataFilter = {}, paginationStep = 1) {
    try {
      console.log("Content Store - filter Content");
      const contentAPIService = new EasiiContentApiService();
      const respondedDataFromLibrary = await contentAPIService.searchContents(
        dataFilter,
        paginationStep,
        25
      );
      
      console.log("Debugging ---- filter campaign");
      console.log(respondedDataFromLibrary);
      let contentDataModels = null;

      if (respondedDataFromLibrary !== null)
      {
        contentDataModels = ContentUtils.transformContentResponseIntoModel(
          respondedDataFromLibrary.list
        );
      }

      if (contentDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: contentDataModels,
            pagination: respondedDataFromLibrary.pagination
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
}
