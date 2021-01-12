import React, { Component } from "react";

import StepWizard from "react-step-wizard";

import ProjectStore from "../ProjectsPage/ProjectStore/ProjectStore";
import ContentStore from "../ContentPage/ContentStore/ContentStore";
import WizardViewModel from "./WizardViewModels/WizardViewModel";
import { WizardViewModelContextProvider } from "./WizardViewModels/WizardViewModelContextProvider";

import WizardSteps from "../../components/WizardSteps";

import ProjectsListWizard from "./CreateProject/ProjectsListWizard";
import ProjectFormWizard from "./CreateProject/ProjectFormWizard";
import ConnectChannel from "./ConnectChannel";
import ContentFormGeneralWizard from "./CreareContent/ContentFormGeneralWizard";
import ContentFormPublishWizard from "./CreareContent/ContentFormPublishWizard";

const projectStore = new ProjectStore();
const contentStore = new ContentStore();
const wizardViewModel = new WizardViewModel(projectStore, contentStore);

class WizardPage extends Component {
  render() {
    let custom = {
      enterRight: "",
      enterLeft: "",
      exitRight: "",
      exitLeft: "",
    };

    return (
      <WizardViewModelContextProvider viewModel={wizardViewModel}>
        <StepWizard
          nav={<WizardSteps />}
          isLazyMount={true}
          transitions={custom}
          isHashEnabled={true}
        >
          <ProjectsListWizard hashKey={"projects"} />
          <ProjectFormWizard hashKey={"createproject"} />
          <ConnectChannel hashKey={"connectchannel"} />
          <ContentFormGeneralWizard hashKey={"contentgeneral"} />
          <ContentFormPublishWizard hashKey={"contentpublish"} />
        </StepWizard>
      </WizardViewModelContextProvider>
    );
  }
}

export default WizardPage;
