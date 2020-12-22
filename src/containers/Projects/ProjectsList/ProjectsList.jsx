import React, { Component } from "react";

import PAGE_STATUS from "../../../constants/PageStatus";

import Table from "../../../components/Table";

import { observer } from "mobx-react";
import { withProjectViewModel } from "../ProjectViewModels/ProjectViewModelContextProvider";

const ProjectsList = observer(
  class ProjectsList extends Component {
    projectListViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("ProjectList - Debug View Model");
      console.log(viewModel);
      this.projectListViewModel =
        viewModel ? viewModel.getProjectListViewModel() : null;

      console.log("After binding class");
      console.log(this.projectListViewModel);  
    }

    componentDidMount() {
      this.projectListViewModel.initializeData();
    }

    render() {
      console.log("[Quick Edit Product] - re-render .........");
      const {
        tableRowHeader,
        tableStatus,
        projects,
      } = this.projectListViewModel;

      return tableStatus === PAGE_STATUS.LOADING ? (
        <div>Load</div>
      ) : (
        <Table rowData={projects} tableRowHeader={tableRowHeader}></Table>
      );
    }
  }
);

export default withProjectViewModel(ProjectsList);
