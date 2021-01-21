import React, { Component, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import StepWizard from "react-step-wizard";

import ProjectStore from "../ProjectsPage/ProjectStore/ProjectStore";
import ContentStore from "../ContentPage/ContentStore/ContentStore";
import WizardViewModel from "./WizardViewModels/WizardViewModel";
import { WizardViewModelContextProvider } from "./WizardViewModels/WizardViewModelContextProvider";

import WizardSteps from "../../components/WizardSteps";
import Spinner from "../../components/Spinner";

const ProjectsListWizard = lazy(() =>
  import("./CreateProject/ProjectsListWizard")
);

const ProjectFormWizard = lazy(() =>
  import("./CreateProject/ProjectFormWizard")
);

const ConnectChannel = lazy(() => import("./ConnectChannel"));

const CreareContent = lazy(() => import("./CreareContent"));

const projectStore = new ProjectStore();
const contentStore = new ContentStore();
const wizardViewModel = new WizardViewModel(projectStore, contentStore);

class WizardPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("[WizardPage] render...");
    return (
      <>
        <WizardSteps />

        <WizardViewModelContextProvider viewModel={wizardViewModel}>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/wizard">
              <ProjectsListWizard />
            </Route>

            <Route exact path="/wizard/createproject">
              <ProjectFormWizard />
            </Route>

            <Route exact path="/wizard/project/:id">
              <ConnectChannel />
            </Route>

            <Route exact path="/wizard/project/:id/content">
              <CreareContent />
            </Route>
          </Suspense>
        </WizardViewModelContextProvider>
      </>
    );
  }
}

export default WizardPage;
