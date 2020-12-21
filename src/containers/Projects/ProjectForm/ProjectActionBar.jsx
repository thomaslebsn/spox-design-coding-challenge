import React, { Component } from "react";

import ButtonNormal from "../../../components/ButtonNormal";
import ProjectFormModal from "./ProjectFormModal";

import PAGE_STATUS from "../../../constants/PageStatus";
import { withProjectFormViewModel } from "./ProjectFormViewModel";

class ProjectActionBar extends Component {
  constructor(props) {
    super(props);

    const { viewModel } = this.props;
    this.viewModel = viewModel;
  }

  addProductHandler = (event) => {
    this.viewModel.openModal();
  };

  render() {
    console.log("[ProjectActionBar] - re-render .........");

    return (
      <>
        <ButtonNormal
          onClick={this.addProductHandler}
          text="Crete new project"
        />
        <ProjectFormModal />
      </>
    );
  }
}
export default withProjectFormViewModel(ProjectActionBar);
