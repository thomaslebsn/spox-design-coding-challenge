import React, { Component, lazy } from "react";

import StepWizard from "react-step-wizard";

const ContentFormGeneral = lazy(() =>
  import("./ContentFormGeneral/ContentFormGeneral")
);
const ContentFormPublish = lazy(() =>
  import("./ContentFormPublish/ContentFormPublish")
);

const FormPreviewPersona = lazy(() =>
  import("../../PersonasPage/FormPreviewPersona/FormPreviewPersona")
);

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
        <FormPreviewPersona />
      </>
    );
  }
}

export default ContentFormPage;
