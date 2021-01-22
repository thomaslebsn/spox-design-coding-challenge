import React from "react";
import { makeAutoObservable, runInAction } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";

import ProjectUtils from "../ProjectUtils/ProjectUtils";
import ProjectModel from "../ProjectModel/ProjectModel";
import { EasiiProjectApiService } from "easii-io-web-service-library";

let projects = [
  {
    id: 1,
    name: "Marketing Vietnam Suntory PepsiCo1 ",
    start_date: "2020-10-13 06:08:06",
    end_date: "2020-12-13 06:08:06",
    logo_url: "/assets/images/icon-pepsi.png",
    short_description:
      "Suntory PepsiCo Vietnam Beverage (SPVB), is 100% owned by foreign capital, and is a new beverage joint venture between PepsiCo Inc. and Suntory",
    project_lead: {
      id: 1,
      name: "Ponnappa Priya",
      avatar_url: "/assets/images/avatar-5.png",
    },
    created_date: "2020-12-13 06:08:06",
    list_modified_date: "20/09/2020",
    progress: 70,
  },
  {
    id: 2,
    name: "Marketing Vietnam Suntory PepsiCo2",
    start_date: "2020-10-13",
    end_date: "2020-12-13",
    logo_url: "/assets/images/icon-pepsi.png",
    short_description:
      "Embrace the adventure that life offers, whist making a difference in the world.",
    project_lead: {
      id: 2,
      name: "Natalie Lee-Walsh",
      avatar_url: "/assets/images/avatar-4.png",
    },
    created_date: "2020-12-13 06:08:06",
    list_modified_date: "20/09/2020",
    progress: 90,
  },
  {
    id: 3,
    name: "Marketing Vietnam Suntory PepsiCo3",
    start_date: "2020-10-13 06:08:06",
    end_date: "2020-12-13 06:08:06",
    logo_url: "/assets/images/icon-pepsi.png",
    short_description:
      "Adidas’ straightforward digital marketing strategy is the power behind this success.",
    project_lead: {
      id: 3,
      name: "Natalie Lee-Walsh",
      avatar_url: "/assets/images/avatar-4.png",
    },
    created_date: "2020-12-13 06:08:06",
    list_modified_date: "20/09/2020",
    progress: 40,
  },
  {
    id: 4,
    name: "Marketing Vietnam Suntory PepsiCo4",
    start_date: "2020-10-13 06:08:06",
    end_date: "2020-12-13 06:08:06",
    logo_url: "/assets/images/icon-pepsi.png",
    short_description: "short_description Marketing Vietnam Suntory PepsiCo",
    project_lead: {
      id: 4,
      name: "Natalie Lee-Walsh",
      avatar_url: "/assets/images/avatar-4.png",
    },
    created_date: "2020-12-8 16:08:06",
    list_modified_date: "20/09/2020",
    progress: 60,
  },
  {
    id: 5,
    name: "Marketing Vietnam Suntory PepsiCo5",
    start_date: "2020-10-13 06:08:06",
    end_date: "2020-12-13 06:08:06",
    logo_url: "/assets/images/icon-pepsi.png",
    short_description:
      "Levi Strauss & Co is an American clothing company known worldwide for its Levi's brand of denim jeans.",
    project_lead: {
      id: 5,
      name: "Natalie Lee-Walsh",
      avatar_url: "/assets/images/avatar-4.png",
    },
    created_date: "2020-12-13 06:08:06",
    list_modified_date: "20/09/2020",
    progress: 30,
  },
  {
    id: 6,
    name: "Marketing Vietnam Suntory PepsiCo6",
    start_date: "2020-10-12 23:08:06",
    end_date: "2020-12-13 06:08:06",
    logo_url: "/assets/images/icon-pepsi.png",
    short_description:
      "Shop casual women's, men's, maternity, kids' & baby clothes at Gap. Our style is clean and confident, comfortable and accessible, classic",
    project_lead: {
      id: 6,
      name: "Natalie Lee-Walsh",
      avatar_url: "/assets/images/avatar-4.png",
    },
    created_date: "2020-12-13 06:08:06",
    list_modified_date: "20/09/2020",
    progress: 55,
  },
  {
    id: 7,
    name: "Marketing Vietnam Suntory PepsiCo2",
    start_date: "2020-10-13",
    end_date: "2020-12-13",
    logo_url: "/assets/images/icon-pepsi.png",
    short_description:
      "McDonald's Corporation is an American fast food company, founded in 1940 as a restaurant operated by Richard and Maurice McDonald,",
    project_lead: {
      id: 7,
      name: "Natalie Lee-Walsh",
      avatar_url: "/assets/images/avatar-4.png",
    },
    created_date: "2020-12-13 06:08:06",
    list_modified_date: "20/09/2020",
    progress: 75,
  },
  {
    id: 8,
    name: "Marketing Vietnam Suntory PepsiCo2",
    start_date: "2020-10-14 06:08:06",
    end_date: "2020-12-13 06:08:06",
    logo_url: "/assets/images/icon-pepsi.png",
    short_description:
      "Samsung Galaxy Note20 Ultra 5G. The Samsung Galaxy Note 20 Ultra 5G sets the pace for 2020 smartphones with a huge screen.",
    project_lead: {
      id: 8,
      name: "Natalie Lee-Walsh",
      avatar_url: "/assets/images/avatar-4.png",
    },
    created_date: "2020-12-13 06:08:06",
    list_modified_date: "20/09/2020",
    progress: 80,
  },
  {
    id: 9,
    name: "Marketing Vietnam Suntory PepsiCo2",
    start_date: "2020-10-13",
    end_date: "2020-12-13",
    logo_url: "/assets/images/icon-pepsi.png",
    short_description:
      "Phasellus scelerisque commodo nunc, sit amet blandit est tincidunt vitae.",
    project_lead: {
      id: 9,
      name: "Natalie Lee-Walsh",
      avatar_url: "/assets/images/avatar-4.png",
    },
    created_date: "2020-12-22 06:08:06",
    list_modified_date: "20/09/2020",
    progress: 10,
  },
  {
    id: 10,
    name: "Marketing Vietnam Suntory PepsiCo2",
    start_date: "2020-10-13",
    end_date: "2020-12-13",
    logo_url: "/assets/images/icon-pepsi.png",
    short_description:
      "Donec at maximus nulla, ac molestie purus. Aliquam nunc lacus, lobortis ut placerat eu, suscipit at erat. Sed at mi diam. Sed aliquam diam ac",
    project_lead: {
      id: 10,
      name: "Natalie Lee-Walsh",
      avatar_url: "/assets/images/avatar-4.png",
    },
    created_date: "2020-12-25 06:08:06",
    list_modified_date: "20/09/2020",
    progress: 20,
  },
  {
    id: 11,
    name: "Marketing Vietnam Suntory PepsiCo2",
    start_date: "2020-10-13",
    end_date: "2020-12-13",
    logo_url: "/assets/images/icon-pepsi.png",
    short_description:
      "Donec at maximus nulla, ac molestie purus. Aliquam nunc lacus, lobortis ut placerat eu, suscipit at erat. Sed at mi diam. Sed aliquam diam ac",
    project_lead: {
      id: 11,
      name: "Natalie Lee-Walsh",
      avatar_url: "/assets/images/avatar-4.png",
    },
    created_date: "2020-12-13 06:08:06",
    list_modified_date: "20/09/2020",
    progress: 35,
  },
];

export default class ProjectStore {
  async fetchProjects(callbackOnSuccess, callbackOnError) {
    try {
      console.log("Project Store - Fetch Projects");
      const projectAPIService = new EasiiProjectApiService();
      const repondedDataFromLibrary = await projectAPIService.getProjects(1,20);
      console.log("Debugging ---- fetchProjects");
      console.log(repondedDataFromLibrary);
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

      console.log('Project Converted Data');
      console.log(convertedProjectData);

      const projectAPIService = new EasiiProjectApiService();    
      const resultOnSave = await projectAPIService.createProject(convertedProjectData);

      console.log("---- ABC ----");
      console.log(resultOnSave);

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

    try {
      const results = true;

      projects = projects.filter(function (e) {
        return ids.indexOf(e.id) === -1;
      });

      if (results) {
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

        console.log(`Deleting Project ids: ${ids}`);
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

      const editProject = projects.filter(function (e) {
        return id === e.id;
      });

      if (results) {
        const repondedDataFromLibrary = editProject;
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
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
