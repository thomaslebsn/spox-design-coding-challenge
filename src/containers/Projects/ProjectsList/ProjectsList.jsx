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
      this.projectListViewModel = viewModel
        ? viewModel.getProjectListViewModel()
        : null;

      console.log("After binding class");
      console.log(this.projectListViewModel);

      this.projectFormModalViewModel = viewModel
        ? viewModel.getProjectFormModalViewModel()
        : null;
    }

    componentDidMount() {
      this.projectListViewModel.initializeData();
    }

    handerEditProject = (row) => {
      this.projectFormModalViewModel.setData(row);
      this.projectFormModalViewModel.openModal();
    };

    handerSelectProject = (data) => {
      this.projectListViewModel.projectIdsSelected = data
        .map((item) => {
          console.log("Debug An Item");
          console.log(item);
          return item.id;
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, []);
    };

    render() {
      console.log("[Quick Edit Product] - re-render .........");
      const {
        tableRowHeader,
        tableStatus,
        projects,
      } = this.projectListViewModel;
      console.log(projects);
      return tableStatus === PAGE_STATUS.LOADING ? (
        <div>Load</div>
      ) : (
        <Table
          rowData={projects}
          tableRowHeader={tableRowHeader}
          onEdit={this.handerEditProject}
          onSelect={this.handerSelectProject}
        ></Table>
      );
    }
  }
);

export default withProjectViewModel(ProjectsList);
