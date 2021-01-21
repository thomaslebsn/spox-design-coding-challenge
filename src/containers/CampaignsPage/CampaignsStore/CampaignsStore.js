import React from "react";
import { runInAction } from "mobx";

import CampaignsUtils from "../CampaignsUtils/CampaignsUtils";
import CampaignsModel from "../CampaignsModel/CampaignsModel";
import { EasiiCampaignApiService } from "easii-io-web-service-library";


let campaigns = [
  {
    id: 1,
    name: "Hieu - simple",
    status: 1,
    start_date: "2020-10-13",
    end_date: "2020-10-13",
    need_to_do: 8,
    schedude_post: 3,
    publish_content: 2,
    progress: 50,
  },
  {
    id: 2,
    name: "Hieu - simple 2",
    status: 2,
    start_date: "2020-10-13",
    end_date: "2020-10-13",
    need_to_do: 8,
    schedude_post: 3,
    publish_content: 2,
    progress: 50,
  },
  {
    id: 3,
    name: "Hieu - simple 3",
    status: 3,
    start_date: "2020-10-13",
    end_date: "2020-10-13",
    need_to_do: 8,
    schedude_post: 3,
    publish_content: 2,
    progress: 70,
  },
];

let dataSocial = [
  {
    key: 1,
    images: "/assets/images/ic-youtube.svg",
    number: "2.344",
    des: "Subscribers",
  },
  {
    key: 2,
    images: "/assets/images/ic-facebook.svg",
    number: "1.891",
    des: "Likes",
  },
  {
    key: 3,
    images: "/assets/images/ic-facebook.svg",
    number: "1.004",
    des: "Followers",
  },
  {
    key: 4,
    images: "/assets/images/ic-facebook.svg",
    number: "35,134",
    des: "Followers",
  },
  {
    key: 5,
    images: "/assets/images/ic-facebook.svg",
    number: "1,284",
    des: "Followers",
  },
  {
    key: 6,
    images: "/assets/images/ic-facebook.svg",
    number: "600",
    des: "Posts",
  },
  {
    key: 7,
    images: "/assets/images/ic-facebook.svg",
    number: "2,134",
    des: "Followers",
  },
  {
    key: 8,
    images: "/assets/images/ic-facebook.svg",
    number: "49",
    des: "Posts",
  },
  {
    key: 9,
    images: "/assets/images/ic-facebook.svg",
    number: "59",
    des: "Posts",
  },
];

export default class CampaignsStore {
  async fetchCampaigns(callbackOnSuccess, callbackOnError) {
    try {
      console.log("Persona Store - Fetch Personas");
      const campaignService = new EasiiCampaignApiService;
      const repondedDataFromLibrary = await campaignService.getCampaigns(1, 2, true);

      const CampaignsModels = CampaignsUtils.transformCampaignsResponseIntoModel(
        repondedDataFromLibrary
      );

      if (CampaignsModels) {
        runInAction(() => {
          callbackOnSuccess(CampaignsModels);
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

  async saveCampaigns(campaignsData, callbackOnSuccess, callbackOnError) {
    try {
      console.log("Saving Project via call web service lib function");
      console.log(campaignsData);

      const convertedCampaignsData = CampaignsModel.convertSubmittedDataToAPIService(
        campaignsData
      );

      const resultOnSave = await campaigns.push(convertedCampaignsData);

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

  async deleteCampaigns(ids, callbackOnSuccess, callbackOnError) {
    if (!ids) return false;

    try {
      const results = true;

      campaigns = campaigns.filter(function (e) {
        return ids.indexOf(e.id) === -1;
      });

      if (results) {
        const repondedDataFromLibrary = campaigns;
        const campaignsDataModels = CampaignsUtils.transformCampaignsResponseIntoModel(
          repondedDataFromLibrary
        );

        if (campaignsDataModels) {
          runInAction(() => {
            callbackOnSuccess(campaignsDataModels);
          });
        } else {
          callbackOnError({
            message: "Something went wrong from Server response",
          });
        }

        console.log(`Deleting Persona ids: ${ids}`);
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getCampaigns(id, callbackOnSuccess, callbackOnError) {
    if (!id) return false;

    try {
      const results = true;

      const editCampaigns = campaigns.filter(
        (campaigns) => campaigns.id !== parseInt(id)
      );

      if (results) {
        const repondedDataFromLibrary = editCampaigns;
        const campaignsDataModels = CampaignsUtils.transformCampaignsResponseIntoModel(
          repondedDataFromLibrary
        );

        if (campaignsDataModels) {
          runInAction(() => {
            callbackOnSuccess(campaignsDataModels);
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
