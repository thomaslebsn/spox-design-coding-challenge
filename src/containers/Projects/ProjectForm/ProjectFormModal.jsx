import React, { Component } from "react";

import ModalComponent from "../../../components/Modal";

import PAGE_STATUS from "../../../constants/PageStatus";
import { withProjectFormViewModel } from "./ProjectFormViewModel";
import { observer } from "mobx-react";

const ProjectFormModal = observer(
  class ProjectFormModal extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      console.log("[ProjectFormModal] - re-render .........");

      const { viewModel } = this.props;
      console.log(viewModel);
      const open = viewModel.open;

      return (
        <ModalComponent
          show={open}
          onHide={viewModel.closeModal}
          header={"Create a new project"}
          body="test"
        />
      );
    }
  }
);

export default withProjectFormViewModel(ProjectFormModal);
