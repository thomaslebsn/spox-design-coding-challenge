import { runInAction } from "mobx";

import ContentUtils from "../ContentUtils/ContentUtils";
import ContentModel from "../ContentModel/ContentModel";

import {
  EasiiContentApiService,
  EasiiProjectChannelApiService,
  EasiiOrganisationChannelApiService,
  EasiiPersonaApiService,
  EasiiProjectApiService,
} from "easii-io-web-service-library";

import { CONTENT_FIELD_KEY } from "../../../constants/ContentModule";

import { CampaignMasterDataModel } from "../../../store/Models/MasterDataModels/CampaignMasterDataModel";
import { PersonaMasterDataModel } from "../../../store/Models/MasterDataModels/PersonaMasterDataModel";
import { ContentConnectedChannelsModel } from "../ContentModel/ContentConnectedChannelsModel";

import ProjectUtils from "../../ProjectsPage/ProjectUtils/ProjectUtils";

export default class ContentStore {
  globalStore = null;
  constructor(args = {}) {
    if (args) {
      this.globalStore = args.globalStore ? args.globalStore : null;
    }
  }

  async fetchContents(
    callbackOnSuccess,
    callbackOnError,
    paginationStep = 0,
    paginationSize = 25
  ) {
    try {
      console.log("Content Store - Fetch Content");
      const contentAPIService = new EasiiContentApiService();

      const repondedDataFromLibrary = await contentAPIService.getContents(
        paginationStep,
        paginationSize
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

      if (convertedContentData.id == 0) {
        resultContent = await contentService.createContent(
          convertedContentData
        );
      } else {
        resultContent = await contentService.updateContent(
          convertedContentData
        );
      }

      if (resultContent) {
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

  async searchContents(
    callbackOnSuccess,
    callbackOnError,
    dataFilter = {},
    paginationStep = 1,
    paginationSize = 25
  ) {
    try {
      console.log("Content Store - filter Content");
      const contentAPIService = new EasiiContentApiService();
      const respondedDataFromLibrary = await contentAPIService.searchContents(
        dataFilter,
        paginationStep,
        paginationSize
      );

      console.log("Debugging ---- filter campaign");
      console.log(respondedDataFromLibrary);
      let contentDataModels = null;

      if (respondedDataFromLibrary !== null) {
        contentDataModels = ContentUtils.transformContentResponseIntoModel(
          respondedDataFromLibrary.list
        );
      }

      if (contentDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: contentDataModels,
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

  async getMasterData(callbackOnSuccess, callbackOnError) {
    try {
      if (!this.globalStore) {
        runInAction(() => {
          callbackOnError({
            message: "Global Store is NULL",
          });
        });
      } else {
        console.log("Content Store - Get Global Store");
        console.log(this.globalStore);
        await this.globalStore.getMasterData(
          {
            isForCampaignMasterData: true,
            isForPersonaMasterData: true,
          },
          (result) => {
            try {
              console.log("Content - getMasterData");
              console.log(result);

              const resultCampaignInModel = new CampaignMasterDataModel(
                result && result.campaignMasterData
                  ? result.campaignMasterData
                  : null
              );
              const resultPersonaInModel = new PersonaMasterDataModel(
                result && result.personaMasterData
                  ? result.personaMasterData
                  : null
              );
              console.log("resultInModel");
              console.log(resultCampaignInModel);
              console.log(resultPersonaInModel);
              console.log("CampaignsStore - getProjectMasterData");
              console.log(result);
              console.log("CampaignsStore - resultToDropdownlistValues");

              runInAction(() => {
                callbackOnSuccess({
                  resultCampaignInModel: resultCampaignInModel,
                  resultPersonaInModel: resultPersonaInModel,
                });
              });
            } catch (error) {
              runInAction(() => {
                callbackOnError({
                  message:
                    "resultInModel - ContentsStore - getMasterData - Something went wrong from Server response",
                });
              });
            }
          },
          (error) => {
            runInAction(() => {
              callbackOnError({
                message:
                  "ContentsStore - getMasterData - Something went wrong from Server response : " +
                  error,
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

  async getContentsByCampaignIDs(
    CampaignIDs,
    limit,
    callbackOnSuccess,
    callbackOnError
  ) {
    try {
      console.log("Content Store - Fetch Content CampaignIDs");
      const contentAPIService = new EasiiContentApiService();

      const repondedDataFromLibrary = await contentAPIService.getContentsByCampaignIDs(
        CampaignIDs,
        limit
      );

      console.log(
        "repondedDataFromLibrary - repondedDataFromLibrary CampaignIDs"
      );

      console.log(repondedDataFromLibrary);

      const contentDataModels = ContentUtils.transformContentResponseIntoModel(
        repondedDataFromLibrary
      );

      console.log("contentDataModels contentDataModels");
      console.log(contentDataModels);

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

  async getConnectedChannelsByOrganizationID(
    callbackOnSuccess,
    callbackOnError
  ) {
    try {
      const service = new EasiiPersonaApiService();

      const repondedDataFromLibrary = await service.getConnectedChannelByOrganisationId();

      console.log("repondedDataFromLibrary - getConnectedChannelsByProjectId");

      console.log(repondedDataFromLibrary);

      const contentDataModels = new ContentConnectedChannelsModel(
        repondedDataFromLibrary.result
      );

      console.log("contentDataModels contentDataModels");
      console.log(contentDataModels);

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

  async getConnectedChannelByPersonaIds(
    callbackOnSuccess,
    callbackOnError,
    personaIds
  ) {
    try {
      const service = new EasiiPersonaApiService();

      console.log("personaIds 3333");
      console.log(personaIds);

      const repondedDataFromLibrary = await service.getConnectedChannelByPersonaIds(
        personaIds
      );

      console.log(
        "repondedDataFromLibrary - getConnectedChannelByPersonaIds idsids"
      );

      console.log(repondedDataFromLibrary);

      const contentDataModels = new ContentConnectedChannelsModel(
        repondedDataFromLibrary.result
      );

      console.log("contentDataModels contentDataModels");
      console.log(contentDataModels);

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

  async getProjectItemByProjectId(
    projectId,
    callbackOnSuccess,
    callbackOnError
  ) {
    if (!projectId) return false;

    try {
      const results = true;

      if (results) {
        const projectAPIService = new EasiiProjectApiService();
        const respondedDataFromLibrary = await projectAPIService.getProjectItem(
          projectId,
          false
        );

        const projectDataModels = ProjectUtils.transformProjectResponseIntoModel(
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
