import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import ProjectUtils from "../ProjectUtils/ProjectUtils";
import { PROJECT_COLUMN_INDICATOR } from "../../../constants/ProjectModule";
import { notify } from "../../../components/Toast";
class ProjectsListViewModel {
  projectStore = null;

  projects = null;

  pagination = null;

  tableRowHeader = null;

  tableStatus = PAGE_STATUS.LOADING;

  projectIdsSelected = null;

  valueSearch = null;

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
    let getArrayId = this.contentIdsSelected;

    this.projectStore.deleteProjects(
      this.projectIdsSelected,
      this.refreshTableProjectList,
      this.callbackOnErrorHander
    );
  };

  getPagination = (paginationStep) => {
    console.log('paginationStep', paginationStep);
    this.tableStatus = PAGE_STATUS.LOADING;
    this.projectStore.fetchProjects(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      paginationStep
    );
  }

  filterProject = (keyword) => {
    const dataFilter = {
      keyword: keyword
    }

    this.valueSearch = keyword;

    // this.tableStatus = PAGE_STATUS.LOADING;
    this.projectStore.filterProjects(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      dataFilter
    );
  }

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
    // this.tableStatus = PAGE_STATUS.READY;
    // this.projects = {};
    // this.pagination = {};
  };

  callbackOnSuccessHandler = (projectModelData) => {
    console.log("callbackOnSuccessHandler");
    console.log(projectModelData);
    if (projectModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      const rowDataTransformed = ProjectUtils.transformProjectModelIntoTableDataRow(
        projectModelData.list
      );
      console.log("Row Data is Formatted");
      console.log(rowDataTransformed);

      this.projects = rowDataTransformed;
      this.pagination = projectModelData.pagination
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
