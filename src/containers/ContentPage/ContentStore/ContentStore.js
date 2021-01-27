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

let contents = [
  {
    id: 1,
    name: "Post 1 - simple",
    description: "Lorem",
    status: 1,
    channels: [
      {
        id: 1,
        name: "facebook 1",
        image: "/assets/images/icon-pepsi.png",
        icon: "/assets/images/facebook.png",
      },
      {
        id: 2,
        name: "instagram 1",
        image: "/assets/images/icon-pepsi.png",
        icon: "/assets/images/instagram.png",
      },
    ],
    campain: {
      id: 1,
      name: "Campain 1",
    },
    persona: [
      {
        id: 1,
        name: "Hieu simple",
      },
      {
        id: 2,
        name: "Hieu simple 2",
      },
    ],
  },
  {
    id: 2,
    name: "Post 2 - simple",
    description: "Lorem",
    status: 2,
    channels: [
      {
        id: 1,
        name: "facebook 1",
        image: "/assets/images/icon-pepsi.png",
        icon: "/assets/images/facebook.png",
      },
    ],
    campain: {
      id: 1,
      name: "Campain 1",
    },
    persona: [
      {
        id: 1,
        name: "Hieu simple",
      },
      {
        id: 2,
        name: "Hieu simple 2",
      },
    ],
  },

  {
    id: 3,
    name: "Post 3 - simple",
    description: "Lorem",

    status: 3,
    channels: [
      {
        id: 1,
        name: "facebook 1",
        image: "/assets/images/icon-pepsi.png",
        icon: "/assets/images/facebook.png",
      },
    ],
    campain: {
      id: 1,
      name: "Campain 1",
    },
    persona: [
      {
        id: 1,
        name: "Hieu simple",
      },
      {
        id: 2,
        name: "Hieu simple 2",
      },
    ],
  },
];

export default class ContentStore {
  async fetchContents(callbackOnSuccess, callbackOnError) {
    try {
      console.log("Content Store - Fetch Content");
      const contentAPIService = new EasiiContentApiService();

      const repondedDataFromLibrary = await contentAPIService.getContents(
        1,
        100
      );
      console.log(
        "repondedDataFromLibrary repondedDataFromLibrary",
        repondedDataFromLibrary
      );

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

      console.log("convertedContentData");
      console.log(convertedContentData);

      // Save Content
      const contentService = new EasiiContentApiService();
      const resultContent = await contentService.createContent(
        convertedContentData
      );

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
      let deleteIds = ids.join();
      console.log("Prepare ids for delete: ", deleteIds);

      let repondedDataFromLibrary = await contentAPIService.deleteContent(
        deleteIds
      );

      if (repondedDataFromLibrary.result === true) {
        await this.fetchContents(callbackOnSuccess, callbackOnError);
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
}
