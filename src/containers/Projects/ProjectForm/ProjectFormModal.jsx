import React, { Component } from "react";

import ModalComponent from "../../../components/Modal";

import { observer } from "mobx-react";

const ProjectFormModal = observer(
  class ProjectFormModal extends Component {

    render() {
      console.log("[ProjectFormModal] - re-render .........");

      // const { viewModel } = this.props;
      // console.log(viewModel);
      // const open = viewModel.open;

      return (
        <ModalComponent
          // show={"open"}
          // onHide={}
          header={"Create a new project"}
          body="test"
        />
      );
    }
  }
);

export default ProjectFormModal;
