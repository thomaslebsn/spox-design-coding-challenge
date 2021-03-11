import ContentFormViewModel from "./ContentFormViewModel";
import ContentListViewModel from "./ContentsListViewModel";
import ContentsFilterFormViewModel from "./ContentsFilterFormViewModel";
import { ContentConnectedChannelsModel } from "../ContentModel/ContentConnectedChannelsModel";
import ContentConnectedChannelsByProjectViewModel from "./ContentConnectedChannelsByProjectViewModel";

class ContentViewModel {
  contentListViewModel = null;
  contentFormViewModel = null;
  contentsFilterFormViewModel = null;
  contentConnectedChannelsByProjectViewModel = null;

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

      // Inject dependencies together among ViewModels
      this.contentFormViewModel.setContentListViewModel(
        this.contentListViewModel
      );

      this.contentFormViewModel.setContentConnectedChannelsViewModel(
        this.contentConnectedChannelsByProjectViewModel
      );
    }
  }

  getContentListViewModel = () => this.contentListViewModel;

  getContentFormViewModel = () => this.contentFormViewModel;

  getContentsFilterFormViewModel = () => this.contentsFilterFormViewModel;

  getContentConnectedChannelsViewModel = () => this.contentConnectedChannelsByProjectViewModel;
}

export default ContentViewModel;
