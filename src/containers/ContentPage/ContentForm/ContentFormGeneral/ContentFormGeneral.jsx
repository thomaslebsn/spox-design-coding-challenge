import React, { Component, lazy } from "react";

import { observer } from "mobx-react";

import { withContentViewModel } from "../../ContentViewModels/ContentViewModelContextProvider";
import ComponentContentFormGeneral from "../ComponentContentFormGeneral";

const ContentFormGeneral = observer(
  class ContentFormGeneral extends Component {
    contentFormViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = this.props;
      console.log("ContentFormGenera - Debug View Model");
      console.log(viewModel);

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
          match={this.props.match}
        />
      );
    }
  }
);

export default withContentViewModel(ContentFormGeneral);
