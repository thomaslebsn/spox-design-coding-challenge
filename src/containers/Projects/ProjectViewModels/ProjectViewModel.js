import ProjectFormModalViewModel from "./ProjectFormModalViewModel";
import ProjectListViewModel from "./ProjectsListViewModel";

class ProjectViewModel {
  projectListViewModel = null;
  projectFormModalViewModel = null;

  constructor(projectStore) {
    if (projectStore) {
      console.log("ProjectViewModel - Abstract");
      this.projectFormModalViewModel = new ProjectFormModalViewModel(projectStore);
      this.projectListViewModel = new ProjectListViewModel(projectStore);
    }
  }

  getProjectListViewModel = () => this.projectListViewModel;

  getProjectFormModalViewModel = () => this.projectFormModalViewModel;
}

export default ProjectViewModel;

