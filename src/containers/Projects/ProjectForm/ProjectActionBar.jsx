import React, { Component } from "react";

import ButtonNormal from "../../../components/ButtonNormal";
import ProjectFormModal from "./ProjectFormModal";

import PAGE_STATUS from "../../../constants/PageStatus";
import { withProjectFormViewModel } from "../ProjectViewModels/ProjectFormModalViewModel";
import { withViewModel } from "../../../hoc/ContextProvider/ViewModelContextProvider";

class ProjectActionBar extends Component {
  constructor(props) {
    super(props);

    const { viewModel } = this.props;
    this.viewModel = viewModel;
  }

  addProjectHandler = (event) => {
    this.viewModel.openModal();
  };

  render() {
    console.log("[ProjectActionBar] - re-render .........");

    return (
      <>
        <ButtonNormal
          onClick={this.addProjectHandler}
          text="Crete new project"
        />
        <ProjectFormModal />
      </>
    );
  }
}
export default withViewModel(ProjectActionBar);
