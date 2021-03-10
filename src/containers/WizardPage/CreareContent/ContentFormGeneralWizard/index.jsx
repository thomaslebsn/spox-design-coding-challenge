import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withWizardViewModel } from "../../WizardViewModels/WizardViewModelContextProvider";
import ComponentContentFormGeneral from "../../../ContentPage/ContentForm/ComponentContentFormGeneral";
import GlobalStore from "../../../../store/Store";
import FragmentStore from "../../../../fragments/Store/FragmentStore";
import ProjectTableSelectionModalViewModel from "../../../../fragments/ProjectTableSelectionModal/ProjectTableSelectionModalViewModel";
import { ContentPreviewPersona } from "../../../ContentPage/ContentForm/ContentPreviewPersona";
import { ProjectTableSelectionModalViewModelContextProvider } from "../../../../fragments/ProjectTableSelectionModal/ProjectTableSelectionModalViewModelContextProvider";

const ProjectTableSelectionModal = lazy(() =>
  import(
    "../../../../fragments/ProjectTableSelectionModal/ProjectTableSelectionModal"
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
          />
          <ContentPreviewPersona />
          <ProjectTableSelectionModalViewModelContextProvider
            viewModel={projectTableSelectionModalViewModel}
          >
            <ProjectTableSelectionModal />
          </ProjectTableSelectionModalViewModelContextProvider>
        </>
      );
    }
  }
);

export default withWizardViewModel(ContentFormGeneralWizard);
