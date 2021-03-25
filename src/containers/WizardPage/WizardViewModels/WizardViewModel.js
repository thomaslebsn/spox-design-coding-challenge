// import ProjectsListViewModel from "../../ProjectsPage/ProjectViewModels/ProjectsListViewModel";
// import ProjectFormModalViewModel from "../../ProjectsPage/ProjectViewModels/ProjectFormModalViewModel";
import ContentFormViewModel from "../../ContentPage/ContentViewModels/ContentFormViewModel";
import ContentConnectedChannelsByProjectViewModel from "../../ContentPage/ContentViewModels/ContentConnectedChannelsByProjectViewModel";
import ContentDisplayProjectNameInWizardStep3ViewModel from "../../ContentPage/ContentViewModels/ContentDisplayProjectNameInWizardStep3ViewModel";
import LoginCMSChannelFormModalViewModel from "../../ChannelsPage/ChannelsViewModels/LoginCMSChannelFormModalViewModel";
import ChannelsListViewModel from "../../ChannelsPage/ChannelsViewModels/ChannelsListViewModel";

class WizardViewModel {
  // projectListViewModel = null;
  // projectFormViewModel = null;
  channelsListViewModel = null;
  contentFormViewModel = null;
  loginCMSChannelFormModalViewModel = null;
  contentConnectedChannelsByProjectViewModel = null;
  contentDisplayProjectNameInWizardStep3ViewModel = null;

  constructor(channelsStore, contentStore) {
    if (channelsStore) {
      console.log("WizardViewModel - Abstract");
      // this.projectListViewModel = new ProjectsListViewModel(projectStore);
      // this.projectFormViewModel = new ProjectFormModalViewModel(projectStore);

      this.channelsListViewModel = new ChannelsListViewModel(channelsStore);

      this.contentFormViewModel = new ContentFormViewModel(contentStore);

      this.loginCMSChannelFormModalViewModel = new LoginCMSChannelFormModalViewModel(
        channelsStore
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

  // getProjectListViewModel = () => this.projectListViewModel;
  // getProjectFormModalViewModel = () => this.projectFormViewModel;
  getChannelsListViewModel = () => this.channelsListViewModel;
  getContentFormViewModel = () => this.contentFormViewModel;
  getLoginCMSChannelFormModalViewModel = () =>
    this.loginCMSChannelFormModalViewModel;
  getContentConnectedChannelsViewModel = () =>
    this.contentConnectedChannelsByProjectViewModel;

  getContentDisplayProjectNameInWizardStep3ViewModel = () =>
    this.contentDisplayProjectNameInWizardStep3ViewModel;
}

export default WizardViewModel;
