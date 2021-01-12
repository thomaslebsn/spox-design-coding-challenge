import ProjectsListViewModel from "../../ProjectsPage/ProjectViewModels/ProjectsListViewModel";

class WizardViewModel {
  projectListViewModel = null;

  constructor(projectStore) {
    if (projectStore) {
      console.log("WizardViewModel - Abstract");
      this.projectListViewModel = new ProjectsListViewModel(projectStore);
    }
  }

  getProjectListViewModel = () => this.projectListViewModel;
}

export default WizardViewModel;
