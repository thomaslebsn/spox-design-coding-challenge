import React, { Component, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import StepWizard from "react-step-wizard";

// import ProjectStore from "../ProjectsPage/ProjectStore/ProjectStore";
import ChannelsStore from "../ChannelsPage/ChannelsStore/ChannelsStore";
import ContentStore from "../ContentPage/ContentStore/ContentStore";
import WizardViewModel from "./WizardViewModels/WizardViewModel";
import { WizardViewModelContextProvider } from "./WizardViewModels/WizardViewModelContextProvider";

import WizardSteps from "../../components/WizardSteps";
import Spinner from "../../components/Spinner";

const ConnectChannel = lazy(() => import("./ConnectChannel"));

const CreareContent = lazy(() => import("./CreareContent"));

const channelsStore = new ChannelsStore();
const contentStore = new ContentStore();
const wizardViewModel = new WizardViewModel(channelsStore, contentStore);

class WizardPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("[WizardPage] render...");

    return (
      <>
        <WizardSteps match={this.props.match} />

        <WizardViewModelContextProvider viewModel={wizardViewModel}>
          <Suspense fallback={<Spinner />}>
            {/* <Route exact path="/wizard">
              <ProjectsListWizard />
            </Route> */}

            {/* <Route exact path="/wizard/createproject">
              <ProjectFormWizard />
            </Route> */}

            {/* <Route exact path="/wizard/project/:id">
              <ConnectChannel />
            </Route> */}

            {/* <Route exact path="/wizard/project/:id/content">
              <CreareContent match={this.props.match} />
            </Route> */}

            <Route exact path="/wizard">
              <ConnectChannel />
            </Route>

            <Route exact path="/wizard/:id/content">
              <CreareContent match={this.props.match} />
            </Route>
          </Suspense>
        </WizardViewModelContextProvider>
      </>
    );
  }
}

export default WizardPage;
