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

  dataFilter = null;

  connected = false;

  listFaceBookFanpage = null;

  listFaceBookFanpageView = null;

  // show = false;

  constructor(projectStore) {
    makeAutoObservable(this);
    this.projectStore = projectStore;
  }

  // openModal = () => {
  //   this.show = true;
  // };

  // closeModal = () => {
  //   this.show = false;
  // };

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
    console.log("paginationStep", paginationStep);
    this.tableStatus = PAGE_STATUS.LOADING;
    this.projectStore.fetchProjects(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      paginationStep
    );
  };

  searchProjects = (dataFilter) => {
    this.dataFilter = dataFilter;

    this.projectStore.searchProjects(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      dataFilter
    );
  };

  connectLoginUrl = (projectId, channelUniqueName) => {
    console.log("projectId channel", projectId);
    console.log("channelUniqueName channel", channelUniqueName);
    this.projectStore.getChannelLoginUrl(
      this.callbackOnSuccessChannel,
      this.callbackOnErrorHander,
      projectId,
      channelUniqueName
    );
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
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
      this.pagination = projectModelData.pagination;
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };

  callbackOnSuccessChannel = (response, projectId, channelUniqueName) => {
    if (response) {
      this.tableStatus = PAGE_STATUS.READY;

      window.open(response.result.loginUrl, "popup", "width=600,height=600");
      const stepInterval = 2000;
      let intervalTimeLimitInMiliseconds = stepInterval * 60;
      let checkConnectionStatusInterval = setInterval(
        () => {
          intervalTimeLimitInMiliseconds -= stepInterval;
          if (intervalTimeLimitInMiliseconds <= 0) {
            clearInterval(checkConnectionStatusInterval);
          }

          this.projectStore.intervalAskForConnectedChannels(
            (response) => {
              if (response) {
                this.tableStatus = PAGE_STATUS.READY;
                clearInterval(checkConnectionStatusInterval);

                console.log("resultresultresultresult", response);
                console.log(
                  "resultresultresultresult pages",
                  response.result.pages.pages
                );

                this.listFaceBookFanpage = response.result.pages.pages;

                this.connected = true;
              }
            },
            (error) => {},
            projectId,
            channelUniqueName
          );
        },
        stepInterval,
        projectId,
        channelUniqueName
      );
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };

  saveChosseFacebookFanpages = (projectId, pageIds) => {
    console.log("projectId saveChosseFacebookFanpages", projectId);
    console.log("channelUniqueName saveChosseFacebookFanpages", pageIds);
    this.projectStore.saveChosseFacebookFanpages(
      this.callbackOnSuccessListFacebookFanpage,
      this.callbackOnErrorHander,
      projectId,
      pageIds
    );
  };

  callbackOnSuccessListFacebookFanpage = (response, projectId, pageIds) => {
    console.log("callbackOnSuccessListFacebookFanpage");
    console.log("callbackOnSuccessListFacebookFanpage projectId", projectId);
    console.log("callbackOnSuccessListFacebookFanpage pageIds", pageIds);
    console.log(response);

    if (response) {
      this.tableStatus = PAGE_STATUS.READY;
      // Show modal of list FB fanpage
      // User selects and click save
      // Call projectStore save list of selected FB Fanpage
      this.projectStore.getFacebookFanpages(
        (respons) => {
          console.log("respons getFacebookFanpages 2222", respons);
          this.listFaceBookFanpageView = respons.result.pages.pages;
          // Close Modal
          // List selected and connected FB Fanpages in UI
        },
        (error) => {},
        projectId,
        pageIds
      );
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
