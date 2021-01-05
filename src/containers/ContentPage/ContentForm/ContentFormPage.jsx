import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withContentViewModel } from "../ContentViewModels/ContentViewModelContextProvider";

const ContentFormGeneral = lazy(() => import("./ContentFormGeneral"));

const ContentFormPage = observer(
  class ContentFormPage extends Component {
    contentFormViewModel = null;
    contentListViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel, id } = props;

      console.log(id);
      console.log("ContentFormPage - Debug View Model");
      console.log(viewModel);
      this.contentFormViewModel = viewModel
        ? viewModel.getContentFormViewModel()
        : null;

      if (id) {
        this.contentFormViewModel.getContent(id);
      }

      console.log("ContentFormPage - After binding class");
      console.log(this.contentFormViewModel);
    }

    render() {
      console.log("[ContentFormPage] - re-render .........");

      return (
        <>
          <ContentFormGeneral viewModel={this.contentFormViewModel} />
        </>
      );
    }
  }
);

export default withContentViewModel(ContentFormPage);
