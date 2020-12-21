import React, { Component } from "react";

import PAGE_STATUS from "../../../constants/PageStatus";

class ProjectForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("[ProjectForm] - re-render .........");

    return pageStatus === PAGE_STATUS.LOADING ? (
      <div>Load</div>
    ) : (
      <div>Form</div>
    );
  }
}
export default withProjectsListStore(ProjectForm);
