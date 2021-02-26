import ContentFormViewModel from "./ContentFormViewModel";
import ContentListViewModel from "./ContentsListViewModel";
import ContentsFilterFormViewModel from "./ContentsFilterFormViewModel";

class ContentViewModel {
  contentListViewModel = null;
  contentFormViewModel = null;
  contentsFilterFormViewModel = null;

  constructor(contentStore) {
    if (contentStore) {
      console.log("ContentViewModel - Abstract");
      this.contentFormViewModel = new ContentFormViewModel(contentStore);
      this.contentListViewModel = new ContentListViewModel(contentStore);
      this.contentsFilterFormViewModel = new ContentsFilterFormViewModel(
        contentStore
      );

      // Inject dependencies together among ViewModels
      this.contentFormViewModel.setContentListViewModel(
        this.contentListViewModel
      );
    }
  }

  getContentListViewModel = () => this.contentListViewModel;

  getContentFormViewModel = () => this.contentFormViewModel;

  getContentsFilterFormViewModel = () => this.contentsFilterFormViewModel;
}

export default ContentViewModel;
