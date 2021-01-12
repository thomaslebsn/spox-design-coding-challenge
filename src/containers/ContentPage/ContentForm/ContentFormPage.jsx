import React, { Component, lazy } from "react";

import StepWizard from "react-step-wizard";

import { observer } from "mobx-react";
import { withContentViewModel } from "../ContentViewModels/ContentViewModelContextProvider";
import ContentSbarRight from "../../../components/ContentSbarRight";

const ContentFormGeneral = lazy(() => import("./ContentFormGeneral"));
const ContentFormPublish = lazy(() => import("./ContentFormPublish"));

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

      let custom = {
        enterRight: "",
        enterLeft: "",
        exitRight: "",
        exitLeft: "",
      };

      return (
        <>
          <StepWizard isLazyMount={true} transitions={custom}>
            <ContentFormGeneral
              viewModel={this.contentFormViewModel}
              hashKey={"general"}
            />
            <ContentFormPublish
              viewModel={this.contentFormViewModel}
              hashKey={"publish"}
            />
          </StepWizard>
          <ContentSbarRight />
        </>
      );
    }
  }
);

export default withContentViewModel(ContentFormPage);
