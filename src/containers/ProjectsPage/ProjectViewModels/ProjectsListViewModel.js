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

  facebookConnected = false;

  twitterConnected = false;

  linkedinConnected = false;

  mailchimpConnected = false;

  instagramConnected = false;

  listFaceBookFanpage = null;

  listFaceBookFanpageView = null;

  showModalCMS = true;

  isList = true

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

  getPagination = (paginationStep, isList) => {
    console.log("paginationStep", paginationStep);
    this.tableStatus = PAGE_STATUS.LOADING;
    this.isList = isList;
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
    console.log("projectIdprojectId", projectId);
    console.log("channelUniqueName", channelUniqueName);
    console.log("response", response);
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

                let responseResult = response.result;
                switch (channelUniqueName) {
                  case "facebook":
                    if (responseResult.pages.status === "connected") {
                      this.facebookConnected = true;
                      clearInterval(checkConnectionStatusInterval);
                      this.listFaceBookFanpage = responseResult.pages.pages;
                    }
                    break;

                  case "twitter":
                    if (responseResult.connected == 1) {
                      this.twitterConnected = true;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;

                  case "linkedin":
                    if (responseResult.connected == 1) {
                      this.linkedinConnected = true;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;

                  case "mailchimp":
                    if (responseResult.connected == 1) {
                      this.mailchimpConnected = true;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;

                  case "instagram":
                    if (responseResult.connected == 1) {
                      this.instagramConnected = true;
                      clearInterval(checkConnectionStatusInterval);
                    }
                    break;

                  default:
                    break;
                }
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
    this.projectStore.saveChosseFacebookFanpages(
      this.callbackOnSuccessListFacebookFanpage,
      this.callbackOnErrorHander,
      projectId,
      pageIds
    );
  };

  callbackOnSuccessListFacebookFanpage = (response, projectId, pageIds) => {
    if (response) {
      this.tableStatus = PAGE_STATUS.READY;
      this.projectStore.getFacebookFanpages(
        (respons) => {
          this.listFaceBookFanpageView = respons.result.pages.pages;
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
