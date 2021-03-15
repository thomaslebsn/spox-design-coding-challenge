import React, { Component, lazy } from "react";

import { Image } from "react-bootstrap";

import PAGE_STATUS from "../../../constants/PageStatus";
import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

import Table from "../../../components/Table";

import { observer } from "mobx-react";
import { withPersonaViewModel } from "../PersonaViewModels/PersonaViewModelContextProvider";

import Spinner from "../../../components/Spinner";

const ModalComponent = lazy(() => import("../../../components/Modal"));

const PersonasSelection = observer(
  class PersonasSelection extends Component {
    personasListViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("PersonaList - Debug View Model");
      console.log(viewModel);
      this.personaSelectionViewModel = viewModel
        ? viewModel.getPersonaSelectionViewModel()
        : null;

      console.log("After binding class");
      console.log(this.personaSelectionViewModel);
    }

    componentDidMount() {
      this.personaSelectionViewModel.initializeData();
    }

    handerEditPersona = (e, row) => {
      this.personaSelectionViewModel.setSelectionData(row);
      this.personaSelectionViewModel.closeModal();
    };

    render() {
      const { tableStatus, personas, show } = this.personaSelectionViewModel;

      if (!show) return null;

      console.log("[PersonasSelection] - re-render .........");

      console.log(personas);

      const tableRowHeader = [
        {
          Header: "Name",
          accessor: PERSONA_FIELD_KEY.NAME, // accessor is the "key" in the data
          Cell: ({ row }) => (
            console.log("row.original", row),
            (
              <div className="d-flex">
                <span
                  className="text-black opacity-75"
                  onClick={(e) => this.handerEditPersona(e, row.original)}
                >
                  {row.original[PERSONA_FIELD_KEY.NAME]}
                </span>
              </div>
            )
          ),
        },
      ];

      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <ModalComponent
          show={show}
          onHide={this.personaSelectionViewModel.closeModal}
          header={"Choose Persona"}
          dialogClassName="modal-lg modal_content_general"
          body={
            <Table
              rowData={personas}
              tableRowHeader={tableRowHeader}
              //onEdit={this.handerEditPersona}
              noSelection={true}
              noColumns={true}
              noDropDownColumns={true}
              isSearch={false}
            ></Table>
          }
          key={Math.random(40, 200)}
        />
      );
    }
  }
);

export default withPersonaViewModel(PersonasSelection);
