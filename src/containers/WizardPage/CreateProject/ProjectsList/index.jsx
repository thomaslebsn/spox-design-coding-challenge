import React, { Component } from "react";

import PAGE_STATUS from "../../../../constants/PageStatus";

import Table from "../../../../components/Table";

import { observer } from "mobx-react";
import { withWizardViewModel } from "../../WizardViewModels/WizardViewModelContextProvider";
import { PROJECT_COLUMN_INDICATOR } from "../../../../constants/ProjectModule";

import Spinner from "../../../../components/Spinner";

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
    }

    componentDidMount() {
      this.projectListViewModel.initializeData();
    }

    handerEditProject = (row) => {
      this.projectFormModalViewModel.getProject(row.id);
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
      console.log("[ProjectsList] - re-render .........");
      const { tableStatus, projects } = this.projectListViewModel;
      console.log(projects);

      const tableRowHeader = [
        {
          Header: "Project Name",
          accessor: PROJECT_COLUMN_INDICATOR.NAME, // accessor is the "key" in the data
        },
      ];

      console.log("Row Data is tableRowHeader");
      console.log(this.tableRowHeader);

      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <Table
          rowData={projects}
          tableRowHeader={tableRowHeader}
          onEdit={this.handerEditProject}
          onSelect={this.handerSelectProject}
          noSelection={true}
          noColumns={true}
          isList={false}
        ></Table>
      );
    }
  }
);

export default withWizardViewModel(ProjectsList);
