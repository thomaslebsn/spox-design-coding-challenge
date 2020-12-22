import React from "react";
import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import ProjectUtils from "../ProjectUtils/ProjectUtils";
class ProjectsListViewModel {
  projectStore = null;

  projects = null;
  
  tableRowHeader = null;

  tableStatus = PAGE_STATUS.LOADING;
   
  constructor(projectStore) {
    makeAutoObservable(this);
    this.projectStore = projectStore;
  }

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.projectStore.fetchProjects(this.displayProjectListHandler);
  }

  displayProjectListHandler = (ProjectModelData) => {
    console.log("displayProjectHandler");
    console.log(ProjectModelData);
    if(ProjectModelData){
      this.tableStatus = PAGE_STATUS.READY;
      this.tableRowHeader = ["name", "startdate", "enddate", "progress"];
      const rowDataTransformed = ProjectUtils.transformProjectModelIntoTableDataRow(
        ProjectModelData,
        this.tableRowHeader
      );
      this.projects = rowDataTransformed;
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  }
}

export default ProjectsListViewModel;

// const ProjectsListViewModelContext = React.createContext();

// export const ProjectsListViewModelContextProvider = ({
//   children,
//   viewModel,
// }) => {
//   return (
//     <ProjectsListViewModelContext.Provider value={viewModel}>
//       {children}
//     </ProjectsListViewModelContext.Provider>
//   );
// };

// /* Hook to use store in any functional component */
// export const useViewModel = () =>
//   React.useContext(ProjectsListViewModelContext);

// /* HOC to inject store to any functional or class component */
// export const withProjectsListViewModel = (Component) => (props) => {
//   return <Component {...props} viewModel={useViewModel()} />;
// };
