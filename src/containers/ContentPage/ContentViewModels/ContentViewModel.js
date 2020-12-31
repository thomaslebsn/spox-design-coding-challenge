import ContentFormViewModel from "./ContentFormViewModel";
import ContentListViewModel from "./ContentsListViewModel";

class ContentViewModel {
  contentListViewModel = null;
  contentFormViewModel = null;

  constructor(contentStore) {
    if (contentStore) {
      console.log("ContentViewModel - Abstract");
      this.contentFormViewModel = new ContentFormViewModel(contentStore);
      this.contentListViewModel = new ContentListViewModel(contentStore);

      // Inject dependencies together among ViewModels
      this.contentFormViewModel.setContentListViewModel(
        this.contentListViewModel
      );
    }
  }

  getContentListViewModel = () => this.contentListViewModel;

  getContentFormViewModel = () => this.contentFormViewModel;
}

export default ContentViewModel;
