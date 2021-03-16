import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withWizardViewModel } from "../../WizardViewModels/WizardViewModelContextProvider";
import ComponentContentFormPublish from "../../../ContentPage/ContentForm/ComponentContentFormPublish";
import GlobalStore from "../../../../store/Store";
import FragmentStore from "../../../../fragments/Store/FragmentStore";
import PersonaTableSelectionModalViewModel from "../../../../fragments/PersonaTableSelectionModal/PersonaTableSelectionModalViewModel";

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}
const globalStore = window.globalStore;

const fragmentStore = new FragmentStore({
  globalStore: globalStore,
});

const personaTableSelectionModalViewModel = new PersonaTableSelectionModalViewModel(
  fragmentStore
);

const ContentFormPublishWizard = observer(
  class ContentFormPublishWizard extends Component {
    contentFormViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("ContentFormPublishWizard - Debug View Model");
      console.log(viewModel);
      this.contentFormViewModel = viewModel
        ? viewModel.getContentFormViewModel()
        : null;

      console.log("After binding class");
      console.log(this.contentFormViewModel);
    }

    render() {
      console.log("[ContentFormPublishWizard] - re-render .........");
      console.log(this.contentFormViewModel);

      return (
        <ComponentContentFormPublish
          {...this.props}
          viewModel={this.contentFormViewModel}
          formStatus={this.contentFormViewModel.formStatus}
          personaTableSelectionModalViewModel={
            personaTableSelectionModalViewModel
          }
        />
      );
    }
  }
);

export default withWizardViewModel(ContentFormPublishWizard);
