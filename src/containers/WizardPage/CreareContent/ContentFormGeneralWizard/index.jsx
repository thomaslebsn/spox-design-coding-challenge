import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withWizardViewModel } from "../../WizardViewModels/WizardViewModelContextProvider";
import ComponentContentFormGeneral from "../../../ContentPage/ContentForm/ComponentContentFormGeneral";
import GlobalStore from "../../../../store/Store";
import FragmentStore from "../../../../fragments/Store/FragmentStore";
import ProjectTableSelectionModalViewModel from "../../../../fragments/ProjectTableSelectionModal/ProjectTableSelectionModalViewModel";
import { ContentPreviewPersona } from "../../../ContentPage/ContentForm/ContentPreviewPersona";
import { ProjectTableSelectionModalViewModelContextProvider } from "../../../../fragments/ProjectTableSelectionModal/ProjectTableSelectionModalViewModelContextProvider";
import PersonaTableSelectionModalViewModel from "../../../../fragments/PersonaTableSelectionModal/PersonaTableSelectionModalViewModel";
import { PersonaTableSelectionModalViewModelContextProvider } from "../../../../fragments/PersonaTableSelectionModal/PersonaTableSelectionModalViewModelContextProvider";
import CampaignTableSelectionModalViewModel from "../../../../fragments/CampaignTableSelectionModal/CampaignTableSelectionModalViewModel";
import { CampaignTableSelectionModalViewModelContextProvider } from "../../../../fragments/CampaignTableSelectionModal/CampaignTableSelectionModalViewModelContextProvider";

const ProjectTableSelectionModal = lazy(() =>
  import(
    "../../../../fragments/ProjectTableSelectionModal/ProjectTableSelectionModal"
  )
);

const PersonaTableSelectionModal = lazy(() =>
  import(
    "../../../../fragments/PersonaTableSelectionModal/PersonaTableSelectionModal"
  )
);

const CampaignTableSelectionModal = lazy(() =>
  import(
    "../../../../fragments/CampaignTableSelectionModal/CampaignTableSelectionModal"
  )
);

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}
const globalStore = window.globalStore;

const fragmentStore = new FragmentStore({
  globalStore: globalStore,
});

const projectTableSelectionModalViewModel = new ProjectTableSelectionModalViewModel(
  fragmentStore
);

const personaTableSelectionModalViewModel = new PersonaTableSelectionModalViewModel(
  fragmentStore
);

const campaignTableSelectionModalViewModel = new CampaignTableSelectionModalViewModel(
  fragmentStore
);

const ContentFormGeneralWizard = observer(
  class ContentFormGeneralWizard extends Component {
    contentFormViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("ContentFormGeneralWizard - Debug View Model");
      console.log(viewModel);
      this.contentFormViewModel = viewModel
        ? viewModel.getContentFormViewModel()
        : null;

      console.log("After binding class");
      console.log(this.contentFormViewModel);
    }

    render() {
      console.log("[ContentFormGeneralWizard] - re-render .........");
      console.log(this.contentFormViewModel);

      return (
        <>
          <ComponentContentFormGeneral
            {...this.props}
            viewModel={this.contentFormViewModel}
            projectTableSelectionModalViewModel={
              projectTableSelectionModalViewModel
            }
            personaTableSelectionModalViewModel={
              personaTableSelectionModalViewModel
            }
            campaignTableSelectionModalViewModel={
              campaignTableSelectionModalViewModel
            }
          />
          <ContentPreviewPersona
            personaTableSelectionModalViewModel={
              personaTableSelectionModalViewModel
            }
          />
          <ProjectTableSelectionModalViewModelContextProvider
            viewModel={projectTableSelectionModalViewModel}
          >
            <ProjectTableSelectionModal />
          </ProjectTableSelectionModalViewModelContextProvider>

          <PersonaTableSelectionModalViewModelContextProvider
            viewModel={personaTableSelectionModalViewModel}
          >
            <PersonaTableSelectionModal />
          </PersonaTableSelectionModalViewModelContextProvider>

          <CampaignTableSelectionModalViewModelContextProvider
            viewModel={campaignTableSelectionModalViewModel}
          >
            <CampaignTableSelectionModal />
          </CampaignTableSelectionModalViewModelContextProvider>
        </>
      );
    }
  }
);

export default withWizardViewModel(ContentFormGeneralWizard);
