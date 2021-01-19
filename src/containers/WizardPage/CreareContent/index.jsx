import React, { Component, lazy } from "react";

import StepWizard from "react-step-wizard";

import ContentFormGeneralWizard from "./ContentFormGeneralWizard";
import ContentFormPublishWizard from "./ContentFormPublishWizard";
import WizardSteps from "../../../components/WizardSteps";

class CreareContent extends Component {
  custom = {
    enterRight: "",
    enterLeft: "",
    exitRight: "",
    exitLeft: "",
  };

  render() {
    console.log("[CreareContent] - re-render .........");

    return (
      <StepWizard isLazyMount={true} transitions={this.custom}>
        <ContentFormGeneralWizard hashKey={"contentgeneral"} />
        <ContentFormPublishWizard hashKey={"contentpublish"} />
      </StepWizard>
    );
  }
}
export default CreareContent;
