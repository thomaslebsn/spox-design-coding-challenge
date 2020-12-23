import React, { Component } from "react";

import ModalComponent from "../../../components/Modal";

import { observer } from "mobx-react";
import { withProjectViewModel } from "../ProjectViewModels/ProjectViewModelContextProvider";
import { Button } from "react-bootstrap";

const ProjectFormModal = observer(
  class ProjectFormModal extends Component {
    projectFormModalViewModel = null;
    projectListViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel } = props;
      console.log("ProjectFormModal - Debug View Model");
      console.log(viewModel);
      this.projectFormModalViewModel = viewModel
        ? viewModel.getProjectFormModalViewModel()
        : null;

      console.log("ProjectFormModal - After binding class");
      console.log(this.projectFormModalViewModel);
    }

    saveProjectHandler = () => {
      //Validate Form
      //Form Valid
      const isFormValid = true;
      if (isFormValid) {
        //Call projectFormModalViewModel.saveProject
        this.projectFormModalViewModel.saveOnModal();
      } else {
        // Fail => show Error
      }
    };

    cancelSavingHandler = () => {
      this.projectFormModalViewModel.closeModal();
    };

    render() {
      console.log("[ProjectFormModal] - re-render .........");
      const { show } = this.projectFormModalViewModel;
      return (
        <ModalComponent
          show={show}
          onHide={this.projectFormModalViewModel.closeModal}
          header={"Create a new project"}
          body="test"
          footer={
            <div>
              <Button onClick={this.saveProjectHandler}>Save</Button>{" "}
              <Button onClick={this.cancelSavingHandler}>Cancel</Button>
            </div>
          }
        />
      );
    }
  }
);

export default withProjectViewModel(ProjectFormModal);
