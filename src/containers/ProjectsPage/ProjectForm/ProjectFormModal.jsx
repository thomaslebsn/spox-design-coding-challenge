import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withProjectViewModel } from "../ProjectViewModels/ProjectViewModelContextProvider";
import { Button } from "react-bootstrap";
import PAGE_STATUS from '../../../constants/PageStatus'

const ModalComponent = lazy(() => import("../../../components/Modal"));
const ProjectForm = lazy(() => import("./ProjectForm"));

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
      this.projectFormModalViewModel.saveOnModal();
    };

    cancelSavingHandler = () => {
      this.projectFormModalViewModel.closeModal();
    };

    render() {
      console.log('project form model modal');
      console.log(this.projectFormModalViewModel);
      console.log("[ProjectFormModal] - re-render .........");
      const { show } = this.projectFormModalViewModel;
      return (
        <ModalComponent
          show={show}
          onHide={this.projectFormModalViewModel.closeModal}
          header={"Create a new project"}
          body={<ProjectForm viewModel={this.projectFormModalViewModel} />}
          footer={<Button onClick={this.saveProjectHandler}>Save</Button>}
          key={Math.random(40, 200)}
        />
      );
    }
  }
);

export default withProjectViewModel(ProjectFormModal);
