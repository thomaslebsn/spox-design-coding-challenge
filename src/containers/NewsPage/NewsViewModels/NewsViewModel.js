import NewsFormModalViewModel from "./NewsFormModalViewModel";
import NewsListViewModel from "./NewsListViewModel";
//
class NewsViewModel {
  projectListViewModel = null;
  projectFormModalViewModel = null;

  constructor(projectStore) {
    if (projectStore) {
      console.log("NewsViewModel - Abstract");
      this.projectFormModalViewModel = new NewsFormModalViewModel(projectStore);
      this.projectListViewModel = new NewsListViewModel(projectStore);

      // Inject dependencies together among ViewModels 
      this.projectFormModalViewModel.setNewsListViewModel(this.projectListViewModel);
    }
  }

  getNewsListViewModel = () => this.projectListViewModel;

  getNewsFormModalViewModel = () => this.projectFormModalViewModel;
}

export default NewsViewModel;

