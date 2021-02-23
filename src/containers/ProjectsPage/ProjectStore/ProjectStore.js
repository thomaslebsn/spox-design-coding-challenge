import React from "react";
import { makeAutoObservable, runInAction } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";

import ProjectUtils from "../ProjectUtils/ProjectUtils";
import ProjectModel from "../ProjectModel/ProjectModel";
import { EasiiProjectApiService } from "easii-io-web-service-library";

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

      if (projectDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: projectDataModels,
            pagination: respondedDataFromLibrary.pagination
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

  async filterProjects(callbackOnSuccess, callbackOnError, dataFilter = {}, paginationStep = 1) {
    try {
      console.log("Project Store - Fetch Projects");
      const projectAPIService = new EasiiProjectApiService();
      const respondedDataFromLibrary = await projectAPIService.filterProject(
        dataFilter,
        paginationStep,
        25
      );
      
      console.log("Debugging ---- filterProjects");
      console.log(respondedDataFromLibrary);
      let projectDataModels = null;

      if (respondedDataFromLibrary !== null)
      {
        console.log('================');
        projectDataModels = ProjectUtils.transformProjectResponseIntoModel(
          respondedDataFromLibrary.list
        );
      }

      if (projectDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: projectDataModels,
            pagination: respondedDataFromLibrary.pagination
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

      if (projectData.id == undefined) {
        console.log("CREATE PROJECT");
        resultOnSave = await projectAPIService.createProject(
          convertedProjectData
        );
      } else {
        console.log("UPDATE PROJECT", convertedProjectData);
        convertedProjectData.logo =
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
        resultOnSave = await projectAPIService.updateProject(
          convertedProjectData
        );
      }

      console.log("resultOnSave", resultOnSave);

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
}
