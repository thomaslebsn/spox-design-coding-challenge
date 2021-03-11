import ProjectsListViewModel from "../../ProjectsPage/ProjectViewModels/ProjectsListViewModel";
import ProjectFormModalViewModel from "../../ProjectsPage/ProjectViewModels/ProjectFormModalViewModel";
import ContentFormViewModel from "../../ContentPage/ContentViewModels/ContentFormViewModel";
import LoginCMSChannelFormModalViewModel from "./LoginCMSChannelFormModalViewModel";
import ContentConnectedChannelsByProjectViewModel from "../../ContentPage/ContentViewModels/ContentConnectedChannelsByProjectViewModel";
import ContentDisplayProjectNameInWizardStep3ViewModel from "../../ContentPage/ContentViewModels/ContentDisplayProjectNameInWizardStep3ViewModel";

class WizardViewModel {
  projectListViewModel = null;
  projectFormViewModel = null;
  contentFormViewModel = null;
  loginCMSChannelFormModalViewModel = null;
  contentConnectedChannelsByProjectViewModel = null;
  contentDisplayProjectNameInWizardStep3ViewModel = null;

  constructor(projectStore, contentStore) {
    if (projectStore) {
      console.log("WizardViewModel - Abstract");
      this.projectListViewModel = new ProjectsListViewModel(projectStore);
      this.projectFormViewModel = new ProjectFormModalViewModel(projectStore);

      this.contentFormViewModel = new ContentFormViewModel(contentStore);

      this.loginCMSChannelFormModalViewModel = new LoginCMSChannelFormModalViewModel(
        projectStore
      );

      this.contentConnectedChannelsByProjectViewModel = new ContentConnectedChannelsByProjectViewModel(
        contentStore
      );

      this.contentFormViewModel.setContentConnectedChannelsViewModel(
        this.contentConnectedChannelsByProjectViewModel
      );

      this.contentDisplayProjectNameInWizardStep3ViewModel = new ContentDisplayProjectNameInWizardStep3ViewModel(
        contentStore
      );


      this.contentFormViewModel.setContentDisplayProjectNameInWizardStep3ViewModel(
        this.contentDisplayProjectNameInWizardStep3ViewModel
      );
    }
  }

  getProjectListViewModel = () => this.projectListViewModel;
  getProjectFormModalViewModel = () => this.projectFormViewModel;
  getContentFormViewModel = () => this.contentFormViewModel;
  getLoginCMSChannelFormModalViewModel = () =>
    this.loginCMSChannelFormModalViewModel;
  getContentConnectedChannelsViewModel = () =>
    this.contentConnectedChannelsByProjectViewModel;

  getContentDisplayProjectNameInWizardStep3ViewModel = () =>
  this.contentDisplayProjectNameInWizardStep3ViewModel;
}

export default WizardViewModel;
