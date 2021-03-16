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
          />
          <ContentPreviewPersona />
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
        </>
      );
    }
  }
);

export default withWizardViewModel(ContentFormGeneralWizard);
