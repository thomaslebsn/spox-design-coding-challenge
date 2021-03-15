import React, { Component, lazy } from "react";

import { observer } from "mobx-react";

import { withContentViewModel } from "../../ContentViewModels/ContentViewModelContextProvider";
import ComponentContentFormPublish from "../ComponentContentFormPublish";

const ContentFormPublish = observer(
  class ContentFormPublish extends Component {
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
        <ComponentContentFormPublish
          {...this.props}
          viewModel={this.contentFormViewModel}
          formStatus={this.contentFormViewModel.formStatus}
        />
      );
    }
  }
);

export default withContentViewModel(ContentFormPublish);
