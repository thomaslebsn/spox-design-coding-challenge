import React, { Component, lazy } from "react";

import StepWizard from "react-step-wizard";

import { observer } from "mobx-react";
import { withContentViewModel } from "../ContentViewModels/ContentViewModelContextProvider";
import ContentSbarRight from "../../../components/ContentSbarRight";

const ContentFormGeneral = lazy(() => import("./ContentFormGeneral"));
const ContentFormPublish = lazy(() => import("./ContentFormPublish"));

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
          <ContentFormGeneral hashKey={"general"} match={this.props.match} />
          <ContentFormPublish hashKey={"publish"} />
        </StepWizard>
        <ContentSbarRight />
      </>
    );
  }
}

export default ContentFormPage;
