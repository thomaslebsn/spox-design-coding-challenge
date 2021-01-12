import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withWizardViewModel } from "../../WizardViewModels/WizardViewModelContextProvider";

import PAGE_STATUS from "../../../../constants/PageStatus";
import Spinner from "../../../../components/Spinner";
import ButtonNormal from "../../../../components/ButtonNormal";

const ProjectForm = lazy(() =>
  import("../../../ProjectsPage/ProjectForm/ProjectForm")
);

const ProjectFormWizard = observer(
  class ProjectFormWizard extends Component {
    projectFormModalViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("ProjectFormWizard - Debug View Model");
      console.log(viewModel);
      this.projectFormModalViewModel = viewModel
        ? viewModel.getProjectFormModalViewModel()
        : null;

      console.log("After binding class");
      console.log(this.projectFormModalViewModel);
    }

    render() {
      console.log("[ProjectFormWizard] - re-render .........");

      const { tableStatus } = this.projectFormModalViewModel;

      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <div className="w-40 m-auto">
          <h3 className="fw-medium text-blue-0 mb-3 fs-2">
            Create a new project
          </h3>
          <ProjectForm viewModel={this.projectFormModalViewModel} />

          <ButtonNormal
            className="btn btn-success"
            text="Next"
            onClick={this.props.nextStep}
          ></ButtonNormal>
        </div>
      );
    }
  }
);

export default withWizardViewModel(ProjectFormWizard);
