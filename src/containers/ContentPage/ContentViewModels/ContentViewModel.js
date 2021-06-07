import ContentFormViewModel from "./ContentFormViewModel";
import ContentListViewModel from "./ContentsListViewModel";
import ContentsFilterFormViewModel from "./ContentsFilterFormViewModel";
import { ContentConnectedChannelsModel } from "../ContentModel/ContentConnectedChannelsModel";
import ContentConnectedChannelsByOrganisationViewModel from "./ContentConnectedChannelsByOrganisationViewModel";
import ContentDisplayProjectNameInWizardStep3ViewModel from "./ContentDisplayProjectNameInWizardStep3ViewModel";
import ChannelsListViewModel from "../../ChannelsPage/ChannelsViewModels/ChannelsListViewModel";

class ContentViewModel {
  contentListViewModel = null;
  contentFormViewModel = null;
  contentsFilterFormViewModel = null;
  contentConnectedChannelsByOrganisationViewModel = null;
  contentDisplayProjectNameInWizardStep3ViewModel = null;
  channelsListViewModel = null;

  constructor(contentStore, channelsStore) {
    if (contentStore) {
      console.log("ContentViewModel - Abstract");
      console.log(contentStore);
      console.log(channelsStore);

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

      this.channelsListViewModel = new ChannelsListViewModel(channelsStore);

      console.log("this.channelsListViewModel - Abstract1234");
      console.log(this.channelsListViewModel);

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

  getChannelsListViewModel = () => this.channelsListViewModel;
}

export default ContentViewModel;
