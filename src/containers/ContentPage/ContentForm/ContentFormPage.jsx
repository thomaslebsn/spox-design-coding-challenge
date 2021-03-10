import React, { Component, lazy } from "react";

import StepWizard from "react-step-wizard";

import { ContentPreviewPersona } from "./ContentPreviewPersona";
import GlobalStore from "../../../store/Store";
import FragmentStore from "../../../fragments/Store/FragmentStore";
import ProjectTableSelectionModalViewModel from "../../../fragments/ProjectTableSelectionModal/ProjectTableSelectionModalViewModel";
import { ProjectTableSelectionModalViewModelContextProvider } from "../../../fragments/ProjectTableSelectionModal/ProjectTableSelectionModalViewModelContextProvider";

const ContentFormGeneral = lazy(() =>
  import("./ContentFormGeneral/ContentFormGeneral")
);
const ContentFormPublish = lazy(() =>
  import("./ContentFormPublish/ContentFormPublish")
);

const ProjectTableSelectionModal = lazy(() => import("../../../fragments/ProjectTableSelectionModal/ProjectTableSelectionModal"));

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}
const globalStore = window.globalStore;

const fragmentStore = new FragmentStore({
  globalStore: globalStore,
});

const projectTableSelectionModalViewModel = new ProjectTableSelectionModalViewModel(fragmentStore);

class ContentFormPage extends Component {
  render() {
    console.log("[ContentFormPage] - re-render .........");

    let custom = {
      enterRight: "",
      enterLeft: "",
      exitRight: "",
      exitLeft: "",
    };

    return (
      <>
        <StepWizard isLazyMount={true} transitions={custom}>
          <ContentFormGeneral hashKey={"general"} match={this.props.match} projectTableSelectionModalViewModel={projectTableSelectionModalViewModel}  />
          <ContentFormPublish hashKey={"publish"} />
        </StepWizard>
        <ContentPreviewPersona />
        <ProjectTableSelectionModalViewModelContextProvider viewModel={projectTableSelectionModalViewModel}>
          <ProjectTableSelectionModal />
        </ProjectTableSelectionModalViewModelContextProvider>
      </>
    );
  }
}

export default ContentFormPage;
