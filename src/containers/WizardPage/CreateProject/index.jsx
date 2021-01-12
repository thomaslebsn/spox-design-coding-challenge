import React, { Component } from "react";

import { withWizardViewModel } from "../WizardViewModels/WizardViewModelContextProvider";
import ProjectsList from "./ProjectsList";

class CreateProject extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ProjectsList />;
  }
}
export default CreateProject;
