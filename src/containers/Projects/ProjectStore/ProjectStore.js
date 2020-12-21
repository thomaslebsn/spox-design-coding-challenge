import React from "react";
import { makeAutoObservable, runInAction } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";

import ProductUtils from "../ProjectUtils/ProjectUtils";

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
  pageStatus = PAGE_STATUS.LOADING;
  errorMessage = "";
  successMessage = "";
  projects = null;
  projectLead = null;
  tableRowHeader = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTableRowHeader = (tableRowHeader) => {
    this.tableRowHeader = tableRowHeader;
  };

  initializeData = () => {
    this.fetchProjects();
  };

  async fetchProjects() {
    this.pageStatus = PAGE_STATUS.LOADING;
    this.errorMessage = "";
    this.projects = null;
    try {
      const projectDataTransformed = ProductUtils.transformProjectResponseIntoModel(
        projects
      );
      const rowDataTransformed = ProductUtils.transformProjectModelIntoTableDataRow(
        projectDataTransformed,
        this.tableRowHeader
      );

      runInAction(() => {
        this.pageStatus = PAGE_STATUS.READY;
        this.projects = rowDataTransformed;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.pageStatus = PAGE_STATUS.ERROR;
        this.errorMessage = "Projects - fetchProjects - Error Log: " + error;
      });
    }
  }

  async fetchLead() {
    this.pageStatus = PAGE_STATUS.LOADING;
    this.errorMessage = "";
    this.projectLead = null;
    try {
      const leadDataTransformed = ProductUtils.transformProjectLeadResponseIntoModel(
        leads
      );
      console.log("Lead Data Transformed");
      console.log(leadDataTransformed);
      runInAction(() => {
        this.projectLead = leadDataTransformed;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.pageStatus = PAGE_STATUS.ERROR;
        this.errorMessage = "Projects - fetchLead - Error Log: " + error;
      });
    }
  }

  async deleteProduct(productID) {
    /*if (!productID) return false;

    this.pageStatus = PAGE_STATUS.LOADING;
    this.errorMessage = "";
    this.successMessage = "";

    try {
      const results = await ProductApiService.deleteProduct(productID);
      console.log("Deleting Product");
      console.log(results);
      runInAction(() => {
        if (results && results.status === 200 && results.data) {
          this.successMessage = `A product ${productID} has been deleted permanantly!`;
          this.fetchProjects();
        } else {
          this.pageStatus = PAGE_STATUS.ERROR;
          this.errorMessage =
            "Quick Edit Product - Delete Product - Error Log when call WooCommerce API: " +
            JSON.stringify({ results });
        }
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.pageStatus = PAGE_STATUS.ERROR;
        this.errorMessage =
          "Quick Edit Product - Delete Product - Error Log when call WooCommerce API: " +
          error;
      });
    }*/
  }
  async saveProject(productData) {
    console.log("saveProject");
    /*this.pageStatus = PAGE_STATUS.LOADING;
    this.errorMessage = "";
    this.successMessage = "";

    try {
      const convertedProductData = ProductModel.convertSubmittedDataToAPIService(
        productData
      );
      console.log(convertedProductData);
      const results = await ProductApiService.createProduct(
        convertedProductData
      );
      console.log("Creating Product");
      console.log(results);
      runInAction(() => {
        if (results && results.status === 201 && results.data) {
          this.successMessage = "A new product has been created!";
          this.fetchProjects();
        } else {
          this.pageStatus = PAGE_STATUS.ERROR;
          this.errorMessage =
            "Quick Edit Product - SaveProduct - Error Log when call WooCommerce API: " +
            JSON.stringify({ results });
        }
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.pageStatus = PAGE_STATUS.ERROR;
        this.errorMessage =
          "Quick Edit Product - loadProjectsDataHandler - Error Log when call WooCommerce API: " +
          error;
      });
    }*/
  }
}

const ProjectStoreContext = React.createContext();

export const ProjectStoreContextProvider = ({ children, store }) => {
  return (
    <ProjectStoreContext.Provider value={store}>
      {children}
    </ProjectStoreContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useStore = () => React.useContext(ProjectStoreContext);

/* HOC to inject store to any functional or class component */
export const withProjectStore = (Component) => (props) => {
  return <Component {...props} store={useStore()} />;
};
