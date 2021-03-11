import ContentFormViewModel from "./ContentFormViewModel";
import ContentListViewModel from "./ContentsListViewModel";
import ContentsFilterFormViewModel from "./ContentsFilterFormViewModel";
import { ContentConnectedChannelsModel } from "../ContentModel/ContentConnectedChannelsModel";
import ContentConnectedChannelsByProjectViewModel from "./ContentConnectedChannelsByProjectViewModel";
import ContentDisplayProjectNameInWizardStep3ViewModel from "./ContentDisplayProjectNameInWizardStep3ViewModel";

class ContentViewModel {
  contentListViewModel = null;
  contentFormViewModel = null;
  contentsFilterFormViewModel = null;
  contentConnectedChannelsByProjectViewModel = null;
  contentDisplayProjectNameInWizardStep3ViewModel = null;

  constructor(contentStore) {
    if (contentStore) {
      console.log("ContentViewModel - Abstract");
      this.contentFormViewModel = new ContentFormViewModel(contentStore);
      this.contentListViewModel = new ContentListViewModel(contentStore);
      this.contentsFilterFormViewModel = new ContentsFilterFormViewModel(
        contentStore
      );

      this.contentConnectedChannelsByProjectViewModel = new ContentConnectedChannelsByProjectViewModel(
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
        this.contentConnectedChannelsByProjectViewModel
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
    this.contentConnectedChannelsByProjectViewModel;

  getContentDisplayProjectNameInWizardStep3ViewModel = () =>
    this.contentDisplayProjectNameInWizardStep3ViewModel;
}

export default ContentViewModel;
