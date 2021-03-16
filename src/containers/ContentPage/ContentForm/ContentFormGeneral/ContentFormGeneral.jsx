import React, { Component, lazy } from "react";

import { observer } from "mobx-react";

import { withContentViewModel } from "../../ContentViewModels/ContentViewModelContextProvider";
import ComponentContentFormGeneral from "../ComponentContentFormGeneral";

const ContentFormGeneral = observer(
  class ContentFormGeneral extends Component {
    contentFormViewModel = null;
    projectTableSelectionModalViewModel = null;
    personaTableSelectionModalViewModel = null;
    constructor(props) {
      super(props);

      const {
        viewModel,
        projectTableSelectionModalViewModel,
        personaTableSelectionModalViewModel,
      } = this.props;
      console.log("ContentFormGeneral - Debug View Model");
      console.log(viewModel);

      this.projectTableSelectionModalViewModel = projectTableSelectionModalViewModel
        ? projectTableSelectionModalViewModel
        : null;

      console.log(
        "ContentFormGeneral - Debug projectTableSelectionModalViewModel"
      );
      console.log(this.projectTableSelectionModalViewModel);

      this.personaTableSelectionModalViewModel = personaTableSelectionModalViewModel
      ? personaTableSelectionModalViewModel
      : null;

      console.log(
        "ContentFormGeneral - Debug personaTableSelectionModalViewModel"
      );
      console.log(this.personaTableSelectionModalViewModel);
      this.contentFormViewModel = viewModel
        ? viewModel.getContentFormViewModel()
        : null;

      console.log("After binding class");
      console.log(this.contentFormViewModel);
    }

    render() {
      return (
        <ComponentContentFormGeneral
          {...this.props}
          viewModel={this.contentFormViewModel}
          projectTableSelectionModalViewModel={
            this.projectTableSelectionModalViewModel
          }
          personaTableSelectionModalViewModel={
            this.personaTableSelectionModalViewModel
          }
          match={this.props.match}
        />
      );
    }
  }
);

export default withContentViewModel(ContentFormGeneral);
