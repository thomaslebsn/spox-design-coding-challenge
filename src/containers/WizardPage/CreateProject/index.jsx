import React, { Component, lazy } from "react";

const ProjectsListWizard = lazy(() => import("./ProjectsListWizard"));
const ProjectFormWizard = lazy(() => import("./ProjectFormWizard"));

class CreateProject extends Component {
  render() {
    return (
      <div className="bg-white d-flex flex-column m-4 p-4">
        <div className="w-50 mx-auto my-5 py-4">
          <ProjectsListWizard />
          <ProjectFormWizard />
        </div>
      </div>
    );
  }
}

export default CreateProject;
