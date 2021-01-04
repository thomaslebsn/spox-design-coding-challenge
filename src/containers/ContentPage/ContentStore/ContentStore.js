import React from "react";
import { runInAction } from "mobx";

import { CONTENT_FIELD_KEY } from "../../../constants/ContentModule";

import ContentUtils from "../ContentUtils/ContentUtils";
import ContentModel from "../ContentModel/ContentModel";

let contents = [
  {
    id: 1,
    name: "Post 1 - simple",
    description: "Lorem",
    channels: "Test",
    status: 1,
  },
  {
    id: 2,
    name: "Post 2 - simple",
    description: "Lorem",
    channels: "Test",
    status: 2,
  },

  {
    id: 3,
    name: "Post 3 - simple",
    description: "Lorem",
    channels: "Test",
    status: 3,
  },
];

export default class ContentStore {
  async fetchContents(callbackOnSuccess, callbackOnError) {
    try {
      console.log("Content Store - Fetch Contents");
      const repondedDataFromLibrary = contents;
      const contentDataModels = ContentUtils.transformContentResponseIntoModel(
        repondedDataFromLibrary
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

      const resultOnSave = await contents.push(convertedContentData);

      if (resultOnSave) {
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

    try {
      const results = true;

      contents = contents.filter(function (e) {
        return ids.indexOf(e.id) === -1;
      });

      if (results) {
        const repondedDataFromLibrary = contents;
        const contentDataModels = ContentUtils.transformContentResponseIntoModel(
          repondedDataFromLibrary
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

        console.log(`Deleting Content ids: ${ids}`);
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
      const results = true;

      const editContent = contents.filter(
        (content) => content.id !== parseInt(id)
      );

      if (results) {
        const repondedDataFromLibrary = editContent;
        const contentDataModels = ContentUtils.transformContentResponseIntoModel(
          repondedDataFromLibrary
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
}
