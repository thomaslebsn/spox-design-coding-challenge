import React, { Component } from "react";

import ButtonNormal from "../../../components/ButtonNormal";

import ProjectFormModal from "./ProjectFormModal";
import { withProjectViewModel } from "../ProjectViewModels/ProjectViewModelContextProvider";
import { Dropdown } from "react-bootstrap";

class ProjectActionBar extends Component {
  projectFormModalViewModel = null;
  projectsListViewModel = null;
  constructor(props) {
    super(props);
    const { viewModel } = props;
    console.log("ProjectActionBar - Debug View Model");
    console.log(viewModel);
    this.projectFormModalViewModel = viewModel
      ? viewModel.getProjectFormModalViewModel()
      : null;

    this.projectsListViewModel = viewModel
      ? viewModel.getProjectListViewModel()
      : null;

    console.log("ProjectActionBar - After binding class");
    console.log(this.projectFormModalViewModel);
  }

  createProjectHandler = (event) => {
    this.projectFormModalViewModel.openModal();
  };

  handerDeleteProject = () => {
    console.log("handerDeleteProject");
    this.projectsListViewModel.deleteProjects();
  };

  render() {
    console.log("[ProjectActionBar] - re-render .........");

    return (
      <div className="d-flex justify-content-end">
        <Dropdown>
          <Dropdown.Toggle variant="info" id="actions">
            Choose an action
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={this.handerDeleteProject}>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ButtonNormal
          onClick={this.createProjectHandler}
          text="Crete new project"
        />
        <ProjectFormModal />
      </div>
    );
  }
}
export default withProjectViewModel(ProjectActionBar);
