import ProjectsListViewModel from "../../ProjectsPage/ProjectViewModels/ProjectsListViewModel";
import CampaignsListViewModel from "../../CampaignsPage/CampaignsViewModels/CampaignsListViewModel";
import ContentsListViewModel from "../../ContentPage/ContentViewModels/ContentsListViewModel";

class HomeViewModel {
  projectListViewModel = null;
  campaignsListViewModel = null;
  contentsListViewModel = null;
  constructor(homeStore, projectStore, campaignsStore, contentStore) {
    if (homeStore) {
      this.projectListViewModel = new ProjectsListViewModel(projectStore);
      this.campaignsListViewModel = new CampaignsListViewModel(campaignsStore);
      this.contentsListViewModel = new ContentsListViewModel(contentStore);
    }
  }

  getProjectListViewModel = () => this.projectListViewModel;
  getCampaignsListViewModel = () => this.campaignsListViewModel;
  getContentsListViewModel = () => this.contentsListViewModel;
}

export default HomeViewModel;
