import ProjectFormModalViewModel from "./ProjectFormModalViewModel";
import ProjectListViewModel from "./ProjectsListViewModel";

class ProjectViewModel {
  projectListViewModel = null;
  projectFormViewModel = null;

  constructor(projectStore) {
    if (projectStore) {
      console.log("ProjectViewModel - Abstract");
      this.projectFormViewModel = new ProjectFormModalViewModel(projectStore);
      this.projectListViewModel = new ProjectListViewModel(projectStore);
    }
  }

  getProjectListViewModel = () => this.projectListViewModel;

  getProjectFormViewModel = () => this.projectFormViewModel;
}

export default ProjectViewModel;

