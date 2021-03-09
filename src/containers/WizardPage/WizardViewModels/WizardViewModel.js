import ProjectsListViewModel from "../../ProjectsPage/ProjectViewModels/ProjectsListViewModel";
import ProjectFormModalViewModel from "../../ProjectsPage/ProjectViewModels/ProjectFormModalViewModel";
import ContentFormViewModel from "../../ContentPage/ContentViewModels/ContentFormViewModel";
import LoginCMSChannelFormModalViewModel from "./LoginCMSChannelFormModalViewModel";

class WizardViewModel {
  projectListViewModel = null;
  projectFormViewModel = null;
  contentFormViewModel = null;
  loginCMSChannelFormModalViewModel = null;

  constructor(projectStore, contentStore) {
    if (projectStore) {
      console.log("WizardViewModel - Abstract");
      this.projectListViewModel = new ProjectsListViewModel(projectStore);
      this.projectFormViewModel = new ProjectFormModalViewModel(projectStore);

      this.contentFormGeneral = new ContentFormViewModel(contentStore);

      this.loginCMSChannelFormModalViewModel = new LoginCMSChannelFormModalViewModel(
        projectStore
      );
    }
  }

  getProjectListViewModel = () => this.projectListViewModel;
  getProjectFormModalViewModel = () => this.projectFormViewModel;
  getContentFormViewModel = () => this.contentFormGeneral;
  getLoginCMSChannelFormModalViewModel = () =>
    this.loginCMSChannelFormModalViewModel;
}

export default WizardViewModel;
