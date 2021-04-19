import ProjectsListViewModel from "../../ProjectsPage/ProjectViewModels/ProjectsListViewModel";

class HomeViewModel {
  projectListViewModel = null;
  constructor(homeStore, projectStore) {
    if (homeStore) {
      this.projectListViewModel = new ProjectsListViewModel(projectStore);

      console.log("this.projectListViewModel 55555");
      console.log(this.projectListViewModel);
    }
  }

  getProjectListViewModel = () => this.projectListViewModel;
}

export default HomeViewModel;
