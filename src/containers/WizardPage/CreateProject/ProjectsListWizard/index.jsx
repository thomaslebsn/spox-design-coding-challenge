import React, { Component } from "react";

import PAGE_STATUS from "../../../../constants/PageStatus";
import history from "../../../../routes/history";

import Table from "../../../../components/Table";

import { observer } from "mobx-react";
import { withWizardViewModel } from "../../WizardViewModels/WizardViewModelContextProvider";
import { PROJECT_COLUMN_INDICATOR } from "../../../../constants/ProjectModule";

import Spinner from "../../../../components/Spinner";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProjectsListWizard = observer(
  class ProjectsListWizard extends Component {
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

    handerEditProject = ({ id }) => {
      if (id > 0) {
        history.push(`/wizard/project/${id}`);
        //this.props.goToStep(3);
      } else {
        history.push(`/wizard/createproject`);
      }
    };

    render() {
      console.log("[ProjectsList] - re-render .........");
      const { tableStatus, projects } = this.projectListViewModel;
      const createNew = {
        id: 0,
        name: (
          <div className="border-da-1 p-4 h-100 text-center position-relative d-block text-body text-decoration-none">
            <div className="position-absolute top-50 start-50 translate-middle">
              <FontAwesomeIcon icon={faPlus} />
              <span className="ps-2">Create projects</span>
            </div>
          </div>
        ),
      };

      const tableRowHeader = [
        {
          Header: "Project Name",
          accessor: PROJECT_COLUMN_INDICATOR.NAME, // accessor is the "key" in the data
        },
      ];

      console.log("Row Data is tableRowHeader");
      console.log(tableRowHeader);

      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <div className="bg-white d-flex flex-column m-4 p-4">
          <div className="w-50 mx-auto my-5 py-4">
            <Table
              rowData={[createNew, ...projects]}
              tableRowHeader={tableRowHeader}
              onEdit={this.handerEditProject}
              noSelection={true}
              noDropDownColumns={true}
              isList={false}
              thumbColumnsNumber={6}
            ></Table>
          </div>
        </div>
      );
    }
  }
);

export default withWizardViewModel(ProjectsListWizard);
