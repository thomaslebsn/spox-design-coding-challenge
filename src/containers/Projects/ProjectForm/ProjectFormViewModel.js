import React from "react";
import { makeAutoObservable } from "mobx";

class ProjectFormViewModel {
  open = false;
  dimmer = undefined;

  projectFormComponent = null;
  projectStore = null;

  constructor(projectStore) {
    makeAutoObservable(this);
    this.projectStore = projectStore;
  }

  openModal = () => {
    this.open = true;
    this.dimmer = "blurring";
  };

  closeModal = () => {
    this.open = false;
    this.dimmer = undefined;
  };

  getProjectLead = () => {
    return this.projectStore.categoryMasterData ?? null;
  };

  setProductForm = (projectFormComponent) => {
    this.projectFormComponent = projectFormComponent;
  };

  saveHandler = (event) => {
    event.preventDefault();
    const submitButton = event.target;
    submitButton.disabled = true;

    // show spinner within Form
    // disable submit button is to prevent double-click
    // form validation
    const isFormValid = this.projectFormComponent.isFormValid();
    if (isFormValid) {
      const submittedFormData = this.projectFormComponent.formPropsData;
      this.projectStore.saveProject(submittedFormData);
      this.closeModal();
    } else {
      submitButton.disabled = false;
    }
  };
}

export default ProjectFormViewModel;

const ProjectFormViewModelContext = React.createContext();

export const ProjectFormViewModelContextProvider = ({
  children,
  viewModel,
}) => {
  return (
    <ProjectFormViewModelContext.Provider value={viewModel}>
      {children}
    </ProjectFormViewModelContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useViewModel = () => React.useContext(ProjectFormViewModelContext);

/* HOC to inject store to any functional or class component */
export const withProjectFormViewModel = (Component) => (props) => {
  return <Component {...props} viewModel={useViewModel()} />;
};
