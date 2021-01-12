import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withWizardViewModel } from "../../WizardViewModels/WizardViewModelContextProvider";
import ContentFormPublish from "../../../ContentPage/ContentForm/ContentFormPublish";

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

      return (
        <ContentFormPublish
          {...this.props}
          viewModel={this.contentFormViewModel}
        />
      );
    }
  }
);

export default withWizardViewModel(ContentFormPublishWizard);
