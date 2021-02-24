import React from "react";
import { runInAction } from "mobx";

import CampaignsUtils from "../CampaignsUtils/CampaignsUtils";
import CampaignsModel from "../CampaignsModel/CampaignsModel";
import { EasiiCampaignApiService } from "easii-io-web-service-library";
import { ProjectMasterDataModel } from "../../../store/Models/MasterDataModels/ProjectMasterDataModel";

class CampaignsStore {
  globalStore = null;
  constructor(args = {}) {
    if (args) {
      this.globalStore = args.globalStore ? args.globalStore : null;
    }
  }

  async getProjectMasterData(callbackOnSuccess, callbackOnError) {
    try {
      if (!this.globalStore) {
        runInAction(() => {
          callbackOnError({
            message: "Global Store is NULL",
          });
        });
      } else {
        console.log("Campaign Store - Get Global Store");
        console.log(this.globalStore);
        await this.globalStore.getMasterData(
          {
            isForProjectMaster: true,
          },
          (result) => {
            const resultInModel = new ProjectMasterDataModel(result && result.projectMasterData ? result.projectMasterData : null);
            console.log("CampaignsStore - getProjectMasterData");
            console.log(result);
            console.log("CampaignsStore - resultToDropdownlistValues");
            console.log(resultInModel);
            if (resultInModel) {
              runInAction(() => {
                callbackOnSuccess(resultInModel);
              });
            } else {
              runInAction(() => {
                callbackOnError({
                  message: "resultInModel - CampaignsStore - getProjectMasterData - Something went wrong from Server response",
                });
              });
            }
          },
          (error) => {
            runInAction(() => {
              callbackOnError({
                message: "CampaignsStore - getProjectMasterData - Something went wrong from Server response : " + error,
              });
            });
          }
        );
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async fetchCampaigns(callbackOnSuccess, callbackOnError) {
    try {
      console.log("Persona Store - Fetch Personas");
      const campaignService = new EasiiCampaignApiService();
      const respondedDataFromLibrary = await campaignService.getCampaigns(
        1,
        100
      );
      // console.log(respondedDataFromLibrary);
      // const respondedDataFromLibrary = campaigns;
      const CampaignsModels = await CampaignsUtils.transformCampaignResponseIntoModel(
        respondedDataFromLibrary
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

      console.log("convertedCampaignsData");
      console.log(convertedCampaignsData);

      const campaignService = new EasiiCampaignApiService();
      let resultOnSave = false;

      if (campaignsData.id === undefined) {
        console.log("CREATE CAMPAIGN");
        resultOnSave = await campaignService.createCampaign(
          convertedCampaignsData
        );
      } else {
        console.log("UPDATE CAMPAIGN", convertedCampaignsData);
        //convertedProjectData.logo = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
        resultOnSave = await campaignService.updateCampaign(
          convertedCampaignsData
        );
      }

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

    console.log("DELETE CAMPAIGN IDS");
    console.log(ids);

    try {
      const campaignService = new EasiiCampaignApiService();
      const deleteIds = ids.join();
      console.log("Prepare ids for delete: ", deleteIds);
      const respondedFromApi = await campaignService.deleteCampaign(deleteIds);

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

  async getCampaign(id, callbackOnSuccess, callbackOnError) {
    console.log("ID for get Campaign", id);
    if (!id) return false;

    // try {
    const results = true;

    // const editCampaigns = campaigns.filter(
    //   (campaigns) => campaigns.id !== parseInt(id)
    // );

    if (results) {
      const campaignService = new EasiiCampaignApiService();
      const respondedDataFromLibrary = await campaignService.getCampaign(
        id,
        false
      );

      console.log("Campaign - getCampain from API", respondedDataFromLibrary);

      const campaignsDataModels = CampaignsUtils.transformCampaignResponseIntoModel(
        [respondedDataFromLibrary]
      );

      console.log(campaignsDataModels);

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
    // } catch (error) {
    //   console.log(error);
    //   runInAction(() => {
    //     callbackOnError(error);
    //   });
    // }
  }
}

export default CampaignsStore;
