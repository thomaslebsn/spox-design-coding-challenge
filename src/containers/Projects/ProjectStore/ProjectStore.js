import React from "react";
import { makeAutoObservable, runInAction } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";

import ProjectUtils from "../ProjectUtils/ProjectUtils";
import ProjectModel from "../ProjectModel/ProjectModel";

let projects = [
  {
    id: 1,
    name: "Marketing Vietnam Suntory PepsiCo1",
    start_date: "2020-10-13 06:08:06",
    end_date: "2020-12-13 06:08:06",
    logo_url: "/assets/images/icon-pepsi.png",
    short_description: "short_description Marketing Vietnam Suntory PepsiCo",
    project_lead: 1,
    created_date: "20/09/2020 06:08:06",
    list_modified_date: "20/09/2020 06:08:06",
    progress: 70,
  },
];

let leads = [
  {
    id: 1,
    name: "Ponnappa Priya",
    avatar_url: "/assets/images/avatar-5.png",
  },
  {
    id: 2,
    name: "Natalie Lee-Walsh",
    avatar_url: "/assets/images/avatar-4.png",
  },
];

export default class ProjectStore {
  async fetchProjects(callbackOnSuccess, callbackOnError) {
    try {
      console.log("Project Store - Fetch Projects");
      const repondedDataFromLibrary = projects;
      const projectDataModels = ProjectUtils.transformProjectResponseIntoModel(
        repondedDataFromLibrary
      );

      if (projectDataModels) {
        runInAction(() => {
          callbackOnSuccess(projectDataModels);
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

      const resultOnSave = await projects.push(convertedProjectData);

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
}
