import React, { Component, lazy } from "react";

import StepWizard from "react-step-wizard";

import ProjectStore from "../ProjectsPage/ProjectStore/ProjectStore";
import WizardViewModel from "./WizardViewModels/WizardViewModel";
import { WizardViewModelContextProvider } from "./WizardViewModels/WizardViewModelContextProvider";

import CreateProject from "./CreateProject";

const projectStore = new ProjectStore();
const wizardViewModel = new WizardViewModel(projectStore);

class WizardPage extends Component {
  render() {
    return (
      <WizardViewModelContextProvider viewModel={wizardViewModel}>
        <StepWizard isLazyMount={true}>
          <CreateProject />
        </StepWizard>
      </WizardViewModelContextProvider>
    );
  }
}

export default WizardPage;
