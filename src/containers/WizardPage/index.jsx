import React, { Component } from "react";
import { Route } from "react-router-dom";
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
  initialStep = 1;

  render() {
    console.log("[WizardPage] render...");

    let custom = {
      enterRight: "",
      enterLeft: "",
      exitRight: "",
      exitLeft: "",
    };

    return (
      <WizardViewModelContextProvider viewModel={wizardViewModel}>
        <Route exact path="/wizard">
          <ProjectsListWizard hashKey={"createproject"} />
        </Route>
        <Route exact path={["/wizard/createproject"]}>
          <ProjectFormWizard hashKey={"createproject"} />
        </Route>

        <Route exact path={["/wizard/project/:id"]}>
          <ConnectChannel hashKey={"connectchannel"} />
        </Route>

        <Route exact path={["/wizard/project/:id/content"]}>
          <StepWizard isLazyMount={true} transitions={custom}>
            <ContentFormGeneralWizard hashKey={"contentgeneral"} />
            <ContentFormPublishWizard hashKey={"contentpublish"} />
          </StepWizard>
        </Route>
      </WizardViewModelContextProvider>
    );
  }
}

export default WizardPage;
