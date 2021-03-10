import React from "react";
import { makeAutoObservable, runInAction } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";

import ProjectUtils from "../ProjectUtils/ProjectUtils";
import ProjectModel from "../ProjectModel/ProjectModel";
import {
  EasiiProjectApiService,
  EasiiProjectChannelApiService,
} from "easii-io-web-service-library";

export default class ProjectStore {
  async fetchProjects(callbackOnSuccess, callbackOnError, paginationStep) {
    try {
      console.log("Project Store - Fetch Projects");
      const projectAPIService = new EasiiProjectApiService();
      const respondedDataFromLibrary = await projectAPIService.getProjects(
        paginationStep,
        25
      );
      console.log("Debugging ---- fetchProjects");
      console.log(respondedDataFromLibrary);
      const projectDataModels = ProjectUtils.transformProjectResponseIntoModel(
        respondedDataFromLibrary.list
      );

      console.log('projectDataModels');
      console.log(projectDataModels);

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

  async searchProjects(
    callbackOnSuccess,
    callbackOnError,
    dataFilter = {},
    paginationStep = 1
  ) {
    try {
      console.log("Project Store - filter Projects");
      const projectAPIService = new EasiiProjectApiService();
      const respondedDataFromLibrary = await projectAPIService.searchProjects(
        dataFilter,
        paginationStep,
        25
      );

      console.log("Debugging ---- filterProjects");
      console.log(respondedDataFromLibrary);
      let projectDataModels = null;

      if (respondedDataFromLibrary !== null) {
        projectDataModels = ProjectUtils.transformProjectResponseIntoModel(
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

  async saveProject(projectData, callbackOnSuccess, callbackOnError) {
    try {
      console.log("Saving Project via call web service lib function");
      console.log(projectData);

      const convertedProjectData = ProjectModel.convertSubmittedDataToAPIService(
        projectData
      );

      console.log("Project Converted Data");
      console.log(convertedProjectData);

      const projectAPIService = new EasiiProjectApiService();

      var resultOnSave;
      let projectId = null;

      if (projectData.id == undefined) {
        console.log("CREATE PROJECT");
        resultOnSave = await projectAPIService.createProject(
          convertedProjectData
        );
        projectId = resultOnSave;
      } else {
        console.log("UPDATE PROJECT", convertedProjectData);
        convertedProjectData.logo =
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
        resultOnSave = await projectAPIService.updateProject(
          convertedProjectData
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

  async deleteProjects(ids, callbackOnSuccess, callbackOnError) {
    if (!ids) return false;

    console.log("DELETE PROJECT IDS");
    console.log(ids);

    try {
      const projectAPIService = new EasiiProjectApiService();
      const deleteIds = ids.join();
      console.log("Prepare ids for delete: ", deleteIds);
      const respondedFromApi = await projectAPIService.deleteProject(deleteIds);

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

  async getProject(id, callbackOnSuccess, callbackOnError) {
    if (!id) return false;

    try {
      const results = true;

      // const editProject = projects.filter(function (e) {
      //   return id === e.id;
      // });

      if (results) {
        const projectAPIService = new EasiiProjectApiService();
        const respondedDataFromLibrary = await projectAPIService.getProjectItem(
          id,
          false
        );
        console.log("PROJECT RESPONDED ITEM");
        console.log(id);
        console.log(respondedDataFromLibrary);
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

  async getChannelLoginUrl(
    callbackOnSuccess,
    callbackOnError,
    projectId,
    channelUniqueName
  ) {
    try {
      const projectChannelService = new EasiiProjectChannelApiService();
      console.log("channelUniqueName channelUniqueName");
      console.log(channelUniqueName);
      let response = null;

      switch (channelUniqueName) {
        case "facebook":
          response = await projectChannelService.getLoginUrl(
            projectId,
            channelUniqueName
          );
          break;

        case "twitter":
        case "linkedin":
        case "mailchimp":
          response = await projectChannelService.getLoginUrl(
            projectId,
            channelUniqueName
          );
          break;

        default:
          break;
      }

      if (response) {
        runInAction(() => {
          callbackOnSuccess(response, projectId, channelUniqueName);
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

  async intervalAskForConnectedChannels(
    callbackOnSuccess,
    callbackOnError,
    projectId,
    channelUniqueName
  ) {
    try {
      const projectChannelService = new EasiiProjectChannelApiService();
      let result = null;

      switch (channelUniqueName) {
        case "facebook":
          result = await projectChannelService.checkConnectionStatusFacebook(
            projectId,
            channelUniqueName
          );
          break;

        case "twitter":
        case "linkedin":
        case "mailchimp":
          result = await projectChannelService.getCheckConnectStatusChannel(
            projectId,
            channelUniqueName
          );
          break;

        default:
          break;
      }

      if (result) {
        runInAction(() => {
          callbackOnSuccess(result, projectId, channelUniqueName);
        });
      } else {
        callbackOnError({
          message:
            "[intervalAskForConnectedChannels] - Something went wrong from Server response",
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError("[intervalAskForConnectedChannels] - " + error);
      });
    }
  }

  async saveChosseFacebookFanpages(
    callbackOnSuccess,
    callbackOnError,
    projectId,
    pageIds
  ) {
    try {
      console.log("store projectId", projectId);
      console.log("store pageIds", pageIds);
      const projectChannelService = new EasiiProjectChannelApiService();
      const response = await projectChannelService.connectMultiFanpage(
        projectId,
        pageIds
      );

      console.log("store response", response);
      if (response) {
        runInAction(() => {
          callbackOnSuccess(response, projectId, pageIds);
        });
      } else {
        callbackOnError({
          message:
            "[intervalAskForConnectedChannels] - Something went wrong from Server response",
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError("[intervalAskForConnectedChannels] - " + error);
      });
    }
  }

  async getFacebookFanpages(
    callbackOnSuccess,
    callbackOnError,
    projectId,
    pageIds
  ) {
    try {
      const projectChannelService = new EasiiProjectChannelApiService();
      const response = await projectChannelService.getListFanpage(
        projectId,
        pageIds
      );
      if (response) {
        runInAction(() => {
          callbackOnSuccess(response, projectId, pageIds);
        });
      } else {
        callbackOnError({
          message:
            "[intervalAskForConnectedChannels] - Something went wrong from Server response",
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError("[intervalAskForConnectedChannels] - " + error);
      });
    }
  }

  async connectCMS(
    callbackOnSuccess,
    callbackOnError,
    dataPost,
    channelUniqueName
  ) {
    const projectChannelService = new EasiiProjectChannelApiService();
    // const response = projectChannelService.getFBLoginUrl(projectChannelId);
    console.log("channelUniqueName channelUniqueName");
    console.log(channelUniqueName);
    let response = null;

    switch (channelUniqueName) {
      case "wordpress":
        response = await projectChannelService.doLoginCMS(dataPost);
        break;
      default:
        break;
    }

    if (response == true) {
      runInAction(() => {
        callbackOnSuccess(response);
      });
    } else {
      callbackOnError({
        message: "Something went wrong from Server response",
      });
    }
  }

  // async getCheckConnectStatusChannelList(
  //   callbackOnSuccess,
  //   callbackOnError,
  //   projectId,
  //   channelUniqueName
  // ) {
  //   try {
  //     const projectChannelService = new EasiiProjectChannelApiService();
  //     const response = await projectChannelService.getCheckConnectStatusChannel(
  //       projectId,
  //       channelUniqueName
  //     );

  //     if (response != null) {
  //       console.log("responseresponse status 222 store", response);
  //       runInAction(() => {
  //         callbackOnSuccess(response);
  //       });
  //     } else {
  //       callbackOnError({
  //         message:
  //           "[intervalAskForConnectedChannels] - Something went wrong from Server response",
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     runInAction(() => {
  //       callbackOnError("[intervalAskForConnectedChannels] - " + error);
  //     });
  //   }
  // }
}
