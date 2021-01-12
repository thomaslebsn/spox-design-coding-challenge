import ProjectsListViewModel from "../../ProjectsPage/ProjectViewModels/ProjectsListViewModel";
import ProjectFormModalViewModel from "../../ProjectsPage/ProjectViewModels/ProjectFormModalViewModel";

class WizardViewModel {
  projectListViewModel = null;
  projectFormViewModel = null;

  constructor(projectStore) {
    if (projectStore) {
      console.log("WizardViewModel - Abstract");
      this.projectListViewModel = new ProjectsListViewModel(projectStore);
      this.projectFormViewModel = new ProjectFormModalViewModel(projectStore);
    }
  }

  getProjectListViewModel = () => this.projectListViewModel;
  getProjectFormModalViewModel = () => this.projectFormViewModel;
}

export default WizardViewModel;
