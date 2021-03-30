import React, { Component } from "react";

import PAGE_STATUS from "../../../constants/PageStatus";

import Table from "../../../components/Table";

import { observer } from "mobx-react";
import { withProjectViewModel } from "../ProjectViewModels/ProjectViewModelContextProvider";
import { PROJECT_COLUMN_INDICATOR } from "../../../constants/ProjectModule";

import Spinner from "../../../components/Spinner";

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

    handerEditProjectThumb = (row) => {
      this.projectFormModalViewModel.getProject(row.id);
      this.projectFormModalViewModel.openModal();
    };

    handerEditProject = (e, row) => {
      console.log("fsdfsdfsd");
      this.projectFormModalViewModel.getProject(row.id);
      this.projectFormModalViewModel.openModal();
    };

    handerSelectProject = (data) => {
      this.projectListViewModel.projectIdsSelected = data
        .map((item) => {
          console.log("Debug An Item");
          console.log(item);
          return item[PROJECT_COLUMN_INDICATOR.ID];
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, []);
    };

    _handleList = () => {
      this.projectListViewModel.isList = !this.projectListViewModel.isList;
    };

    render() {
      console.log("[Quick Edit Product] - re-render .........");
      const { tableStatus, projects, pagination } = this.projectListViewModel;

      console.log("projects api, projects api", projects);
      console.log("pagination pagination", pagination);

      const tableRowHeader = [
        {
          Header: "Project Name",
          accessor: PROJECT_COLUMN_INDICATOR.NAME, // accessor is the "key" in the data
          Cell: ({ row }) => (
            <div {...row.getToggleRowExpandedProps()} className="d-flex">
              <span
                className="text-black opacity-75"
                onClick={(e) => this.handerEditProject(e, row.original)}
              >
                {row.original.name}
              </span>
            </div>
          ),
        },
        // {
        //   Header: "Logo",
        //   accessor: PROJECT_COLUMN_INDICATOR.LOGO,
        // },
        {
          Header: "Short Description",
          accessor: PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION,
        },
        {
          Header: "Start Date",
          accessor: PROJECT_COLUMN_INDICATOR.START_DATE,
        },
        {
          Header: "End Date",
          accessor: PROJECT_COLUMN_INDICATOR.END_DATE,
        },
        {
          Header: "Lead",
          accessor: PROJECT_COLUMN_INDICATOR.LEAD,
        },
        {
          Header: "Progress",
          accessor: PROJECT_COLUMN_INDICATOR.PROGRESS,
        },
        {
          Header: "Created Date",
          accessor: PROJECT_COLUMN_INDICATOR.CREATED_DATE,
        },
      ];

      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <Table
          rowData={projects}
          tableRowHeader={tableRowHeader}
          onEdit={this.handerEditProjectThumb}
          onSelect={this.handerSelectProject}
          isThumb={true}
          isList={this.projectListViewModel.isList}
          pageSize={this.projectListViewModel.pageSize}
          dataList={[
            PROJECT_COLUMN_INDICATOR.CREATED_DATE,
            PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION,
          ]}
          dataThumb={[
            "selection",
            PROJECT_COLUMN_INDICATOR.START_DATE,
            PROJECT_COLUMN_INDICATOR.END_DATE,
          ]}
          pagination={pagination}
          listViewModel={this.projectListViewModel}
          searchFunction={this.projectListViewModel.searchProjects}
          searchText="Search your project"
          hasSubRow={false}
          _handleList={this._handleList}
        ></Table>
      );
    }
  }
);

export default withProjectViewModel(ProjectsList);
