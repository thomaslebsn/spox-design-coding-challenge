import React, { Component } from "react";

import ButtonNormal from "../../../components/ButtonNormal";
import ProjectFormModal from "./ProjectFormModal";

import PAGE_STATUS from "../../../constants/PageStatus";
import { withProjectFormViewModel } from "../ProjectViewModels/ProjectFormModalViewModel";
import { withViewModel } from "../../../hoc/ContextProvider/ViewModelContextProvider";
import { withProjectViewModel } from "../ProjectViewModels/ProjectViewModelContextProvider";

class ProjectActionBar extends Component {
  projectFormModalViewModel = null;
  constructor(props) {
    super(props);
      const { viewModel } = props;
      console.log("ProjectActionBar - Debug View Model");
      console.log(viewModel);
      this.projectFormModalViewModel = viewModel
        ? viewModel.getProjectFormModalViewModel()
        : null;

      console.log("ProjectActionBar - After binding class");
      console.log(this.projectFormModalViewModel);
  }

  createProjectHandler = (event) => {
    this.projectFormModalViewModel.openModal();
  };

  render() {
    console.log("[ProjectActionBar] - re-render .........");

    return (
      <>
        <ButtonNormal
          onClick={this.createProjectHandler}
          text="Crete new project"
        />
        <ProjectFormModal />
      </>
    );
  }
}
export default withProjectViewModel(ProjectActionBar);
