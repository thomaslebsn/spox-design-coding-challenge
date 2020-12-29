import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import ProjectUtils from "../ProjectUtils/ProjectUtils";
import { PROJECT_COLUMN_INDICATOR } from "../../../constants/ProjectModule";
class ProjectsListViewModel {
  projectStore = null;

  projects = null;

  tableRowHeader = null;

  tableStatus = PAGE_STATUS.LOADING;

  projectIdsSelected = null;

  constructor(projectStore) {
    makeAutoObservable(this);
    this.projectStore = projectStore;
  }

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.projectStore.fetchProjects(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  refreshTableProjectList = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.projectStore.fetchProjects(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  deleteProjects = () => {
    this.tableStatus = PAGE_STATUS.LOADING;

    this.projectStore.deleteProjects(
      this.projectIdsSelected,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    alert(error);
  };

  callbackOnSuccessHandler = (projectModelData) => {
    console.log("callbackOnSuccessHandler");
    console.log(projectModelData);
    if (projectModelData) {
      this.tableStatus = PAGE_STATUS.READY;
      this.tableRowHeader = [
        {
          Header: "Project Name",
          accessor: PROJECT_COLUMN_INDICATOR.NAME, // accessor is the "key" in the data
        },
        {
          Header: "Logo",
          accessor: PROJECT_COLUMN_INDICATOR.LOGO,
        },
        {
          Header: "Start Date",
          accessor: PROJECT_COLUMN_INDICATOR.START_DATE,
        },
        {
          Header: "End Date",
          accessor: PROJECT_COLUMN_INDICATOR.END_DATE,
        },
        // {
        //   Header: "Lead",
        //   accessor: PROJECT_COLUMN_INDICATOR.LEAD,
        // },
        {
          Header: "Progress",
          accessor: PROJECT_COLUMN_INDICATOR.PROGRESS,
        },
      ];

      console.log("Row Data is tableRowHeader");
      console.log(this.tableRowHeader);

      const rowDataTransformed = ProjectUtils.transformProjectModelIntoTableDataRow(
        projectModelData
      );
      console.log("Row Data is Formatted");
      console.log(rowDataTransformed);
      this.projects = rowDataTransformed;
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
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
