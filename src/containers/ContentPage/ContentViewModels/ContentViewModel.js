import ContentFormViewModel from "./ContentFormViewModel";
import ContentListViewModel from "./ContentsListViewModel";
import ContentsFilterFormViewModel from "./ContentsFilterFormViewModel";
import { ContentConnectedChannelsModel } from "../ContentModel/ContentConnectedChannelsModel";
import ContentConnectedChannelsByOrganisationViewModel from "./ContentConnectedChannelsByOrganisationViewModel";
import ContentDisplayProjectNameInWizardStep3ViewModel from "./ContentDisplayProjectNameInWizardStep3ViewModel";

class ContentViewModel {
  contentListViewModel = null;
  contentFormViewModel = null;
  contentsFilterFormViewModel = null;
  contentConnectedChannelsByOrganisationViewModel = null;
  contentDisplayProjectNameInWizardStep3ViewModel = null;

  constructor(contentStore) {
    if (contentStore) {
      console.log("ContentViewModel - Abstract");
      this.contentFormViewModel = new ContentFormViewModel(contentStore);
      this.contentListViewModel = new ContentListViewModel(contentStore);
      this.contentsFilterFormViewModel = new ContentsFilterFormViewModel(
        contentStore
      );

      this.contentConnectedChannelsByOrganisationViewModel = new ContentConnectedChannelsByOrganisationViewModel(
        contentStore
      );

      this.contentDisplayProjectNameInWizardStep3ViewModel = new ContentDisplayProjectNameInWizardStep3ViewModel(
        contentStore
      );
      // Inject dependencies together among ViewModels
      this.contentFormViewModel.setContentListViewModel(
        this.contentListViewModel
      );

      this.contentFormViewModel.setContentConnectedChannelsViewModel(
        this.contentConnectedChannelsByOrganisationViewModel
      );

      this.contentFormViewModel.setContentDisplayProjectNameInWizardStep3ViewModel(
        this.contentDisplayProjectNameInWizardStep3ViewModel
      );
    }
  }

  getContentListViewModel = () => this.contentListViewModel;

  getContentFormViewModel = () => this.contentFormViewModel;

  getContentsFilterFormViewModel = () => this.contentsFilterFormViewModel;

  getContentConnectedChannelsViewModel = () =>
    this.contentConnectedChannelsByOrganisationViewModel;

  getContentDisplayProjectNameInWizardStep3ViewModel = () =>
    this.contentDisplayProjectNameInWizardStep3ViewModel;
}

export default ContentViewModel;
