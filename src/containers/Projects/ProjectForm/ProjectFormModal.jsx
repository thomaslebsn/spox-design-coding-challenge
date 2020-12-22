import React, { Component } from "react";

import ModalComponent from "../../../components/Modal";

import { observer } from "mobx-react";
import { withProjectViewModel } from "../ProjectViewModels/ProjectViewModelContextProvider";

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

      console.log(
        "Inject ProjectListViewModel is to hand-on when form is valid and call refresh table list project"
      );
      this.projectListViewModel = viewModel
        ? viewModel.getProjectListViewModel()
        : null;
      console.log(this.projectListViewModel);
    }

    saveProjectHandler = () => {
      //Validate Form 
      //Form Valid 
      const isFormValid = true;
      if(isFormValid){
        //Call projectFormModalViewModel.saveProject
        this.projectFormModalViewModel.saveProject(this.saveProjectSuccessHandler);
      } else {
        // Fail => show Error
      }

    };
    saveProjectSuccessHandler = () => {
      this.projectListViewModel.refreshProjectList();
      this.getProjectFormModalViewModel.closeModal();
    }
    render() {
      console.log("[ProjectFormModal] - re-render .........");
      const { show } = this.projectFormModalViewModel;
      return (
        <ModalComponent
          show={show}
          onHide={this.projectFormModalViewModel.closeModal}
          onSave={this.saveProjectHandler}
          header={"Create a new project"}
          body="test"
        />
      );
    }
  }
);

export default withProjectViewModel(ProjectFormModal);
