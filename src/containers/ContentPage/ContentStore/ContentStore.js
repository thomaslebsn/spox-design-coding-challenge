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

      const repondedDataFromLibrary = await contentAPIService.getContents(1, 2);
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

      // const resultPost = true;

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
