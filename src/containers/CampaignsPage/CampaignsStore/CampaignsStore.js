import React from "react";
import { runInAction } from "mobx";

import CampaignsUtils from "../CampaignsUtils/CampaignsUtils";
import CampaignsModel from "../CampaignsModel/CampaignsModel";

let campaigns = [
  {
    id: 1,
    name: "Hieu - simple",
    created_date: "2020-10-13",
    updated_date: "2020-10-13",
  },
  {
    id: 2,
    name: "Hieu - simple",
    created_date: "2020-10-13",
    updated_date: "2020-10-13",
  },
];

export default class CampaignsStore {
  async fetchCampaigns(callbackOnSuccess, callbackOnError) {
    try {
      console.log("Persona Store - Fetch Personas");
      const repondedDataFromLibrary = campaigns;
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
