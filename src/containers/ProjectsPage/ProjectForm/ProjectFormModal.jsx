import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withProjectViewModel } from "../ProjectViewModels/ProjectViewModelContextProvider";
import { Button } from "react-bootstrap";
import PAGE_STATUS from "../../../constants/PageStatus";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

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
      console.log("project form model modal");
      console.log(this.projectFormModalViewModel);
      console.log("[ProjectFormModal] - re-render .........");
      const { show, editMode } = this.projectFormModalViewModel;
      return (
        <ModalComponent
          show={show}
          onHide={this.projectFormModalViewModel.closeModal}
          header={
            editMode == false || editMode == null
              ? "Create a new project"
              : "Edit project"
          }
          body={<ProjectForm viewModel={this.projectFormModalViewModel} />}
          footer={
            <Button
              onClick={this.saveProjectHandler}
              className="btn btn-success w-100"
            >
              <span>
                {editMode == false || editMode == null
                  ? "Create project"
                  : "Save project"}
              </span>
              <i className="ms-1">
                <FontAwesomeIcon icon={faChevronRight} />
              </i>
            </Button>
          }
          key={Math.random(40, 200)}
        />
      );
    }
  }
);

export default withProjectViewModel(ProjectFormModal);
