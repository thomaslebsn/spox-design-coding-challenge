import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withWizardViewModel } from "../../WizardViewModels/WizardViewModelContextProvider";
import ComponentContentFormPublish from "../../../ContentPage/ContentForm/ComponentContentFormPublish";

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
        />
      );
    }
  }
);

export default withWizardViewModel(ContentFormPublishWizard);
