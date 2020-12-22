import React from "react";
import { makeAutoObservable, runInAction } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";

import ProjectUtils from "../ProjectUtils/ProjectUtils";

const projects = [
  {
    id: 1,
    name: "Marketing Vietnam Suntory PepsiCo1",
    start_date: "31/08/2020",
    end_date: "20/09/2020",
    logo_url: "/assets/images/icon-pepsi.png",
    short_description: "short_description Marketing Vietnam Suntory PepsiCo",
    project_lead: 1,
    created_date: "20/09/2020",
    list_modified_date: "20/09/2020",
    progress: 70,
  },
  {
    id: 2,
    name: "Marketing Vietnam Suntory PepsiCo2",
    start_date: "31/08/2020",
    end_date: "20/09/2020",
    logo_url: "/assets/images/icon-pepsi.png",
    short_description: "short_description Marketing Vietnam Suntory PepsiCo",
    project_lead: 1,
    created_date: "20/09/2020",
    list_modified_date: "20/09/2020",
    progress: 70,
  },
];

const leads = [
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

  async fetchProjects(callback) {
    
    try {
      console.log("Project Store - Fetch Projects");
      const repondedDataFromLibrary = projects;
      const projectDataTransformed = ProjectUtils.transformProjectResponseIntoModel(
        repondedDataFromLibrary
      );
      runInAction(() => {
        callback(projectDataTransformed);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.pageStatus = PAGE_STATUS.ERROR;
        this.errorMessage = "Projects - fetchProjects - Error Log: " + error;
      });
    }
  }
}
