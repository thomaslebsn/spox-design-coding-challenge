import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withWizardViewModel } from "../../WizardViewModels/WizardViewModelContextProvider";
import ContentFormGeneral from "../../../ContentPage/ContentForm/ContentFormGeneral";

const ContentFormGeneralWizard = observer(
  class ProjectFormWizard extends Component {
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
      console.log("[ContentFormGeneralWizard] - re-render ......... wwwwưư");
      console.log(this.contentFormViewModel);

      return (
        <ContentFormGeneral
          {...this.props}
          viewModel={this.contentFormViewModel}
        />
      );
    }
  }
);

export default withWizardViewModel(ContentFormGeneralWizard);
