import React, { Component } from "react";

import PAGE_STATUS from "../../../constants/PageStatus";
import { withProjectStore } from "../ProjectStore/ProjectStore";

import Table from "../../../components/Table";

import { observer } from "mobx-react";

const ProjectsList = observer(
  class ProjectsList extends Component {
    constructor(props) {
      super(props);

      this.tableRowHeader = ["name", "startdate", "enddate", "progress"];

      const { store } = this.props;
      this.projectStore = store;

      this.projectStore.setTableRowHeader(this.tableRowHeader);
    }

    componentDidMount() {
      this.projectStore.initializeData();
    }

    render() {
      console.log("[Quick Edit Product] - re-render .........");
      // const store = this.projectsListtore;
      const {
        pageStatus,
        errorMessage,
        successMessage,
        projects,
        tableRowHeader,
      } = this.projectStore;

      return pageStatus === PAGE_STATUS.LOADING ? (
        <div>Load</div>
      ) : (
        <div>
          <Table rowData={projects} tableRowHeader={tableRowHeader}></Table>
        </div>
      );
    }
  }
);

export default withProjectStore(ProjectsList);
