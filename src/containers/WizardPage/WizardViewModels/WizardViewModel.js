import ProjectsListViewModel from "../../ProjectsPage/ProjectViewModels/ProjectsListViewModel";
import ProjectFormModalViewModel from "../../ProjectsPage/ProjectViewModels/ProjectFormModalViewModel";
import ContentFormViewModel from "../../ContentPage/ContentViewModels/ContentFormViewModel";

class WizardViewModel {
  projectListViewModel = null;
  projectFormViewModel = null;
  contentFormViewModel = null;

  constructor(projectStore, contentStore) {
    if (projectStore) {
      console.log("WizardViewModel - Abstract");
      this.projectListViewModel = new ProjectsListViewModel(projectStore);
      this.projectFormViewModel = new ProjectFormModalViewModel(projectStore);

      this.contentFormGeneral = new ContentFormViewModel(contentStore);
    }
  }

  getProjectListViewModel = () => this.projectListViewModel;
  getProjectFormModalViewModel = () => this.projectFormViewModel;
  getContentFormViewModel = () => this.contentFormGeneral;
}

export default WizardViewModel;
