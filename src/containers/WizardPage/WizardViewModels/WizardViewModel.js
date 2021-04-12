// import ProjectsListViewModel from "../../ProjectsPage/ProjectViewModels/ProjectsListViewModel";
// import ProjectFormModalViewModel from "../../ProjectsPage/ProjectViewModels/ProjectFormModalViewModel";
import ContentFormViewModel from "../../ContentPage/ContentViewModels/ContentFormViewModel";
import ContentConnectedChannelsByOrganisationViewModel from "../../ContentPage/ContentViewModels/ContentConnectedChannelsByOrganisationViewModel";
import ContentDisplayProjectNameInWizardStep3ViewModel from "../../ContentPage/ContentViewModels/ContentDisplayProjectNameInWizardStep3ViewModel";
import LoginCMSChannelFormModalViewModel from "../../ChannelsPage/ChannelsViewModels/LoginCMSChannelFormModalViewModel";
import ChannelsListViewModel from "../../ChannelsPage/ChannelsViewModels/ChannelsListViewModel";

class WizardViewModel {
  // projectListViewModel = null;
  // projectFormViewModel = null;
  channelsListViewModel = null;
  contentFormViewModel = null;
  loginCMSChannelFormModalViewModel = null;
  contentConnectedChannelsByOrganisationViewModel = null;
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

      this.contentConnectedChannelsByOrganisationViewModel = new ContentConnectedChannelsByOrganisationViewModel(
        contentStore
      );

      this.contentFormViewModel.setContentConnectedChannelsViewModel(
        this.contentConnectedChannelsByOrganisationViewModel
      );

      this.contentDisplayProjectNameInWizardStep3ViewModel = new ContentDisplayProjectNameInWizardStep3ViewModel(
        contentStore
      );

      this.contentFormViewModel.setContentDisplayProjectNameInWizardStep3ViewModel(
        this.contentDisplayProjectNameInWizardStep3ViewModel
      );

      console.log("this.contentConnectedChannelsByOrganisationViewModel 11111");
      console.log(this.contentConnectedChannelsByOrganisationViewModel);
    }
  }

  // getProjectListViewModel = () => this.projectListViewModel;
  // getProjectFormModalViewModel = () => this.projectFormViewModel;
  getChannelsListViewModel = () => this.channelsListViewModel;
  getContentFormViewModel = () => this.contentFormViewModel;
  getLoginCMSChannelFormModalViewModel = () =>
    this.loginCMSChannelFormModalViewModel;
  getContentConnectedChannelsViewModel = () =>
    this.contentConnectedChannelsByOrganisationViewModel;

  getContentDisplayProjectNameInWizardStep3ViewModel = () =>
    this.contentDisplayProjectNameInWizardStep3ViewModel;
}

export default WizardViewModel;
