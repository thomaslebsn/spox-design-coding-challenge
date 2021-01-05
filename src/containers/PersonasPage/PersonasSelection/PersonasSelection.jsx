import React, { Component } from "react";

import { Image } from "react-bootstrap";

import PAGE_STATUS from "../../../constants/PageStatus";
import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

import Table from "../../../components/Table";

import { observer } from "mobx-react";
import { withPersonaViewModel } from "../PersonaViewModels/PersonaViewModelContextProvider";

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

    handerEditPersona = (row) => {
      this.personaSelectionViewModel.setSelectionData(row);
      this.personaSelectionViewModel.closeModal();
    };

    render() {
      console.log("[Quick Edit Product] - re-render .........");
      const { tableStatus, personas } = this.personaSelectionViewModel;
      console.log(personas);

      const tableRowHeader = [
        {
          Header: "Image",
          accessor: PERSONA_FIELD_KEY.IMAGE,
          Cell: ({ value }) => <Image src={value} rounded width="50" />,
        },
        {
          Header: "Name",
          accessor: PERSONA_FIELD_KEY.NAME, // accessor is the "key" in the data
        },
      ];

      return tableStatus === PAGE_STATUS.LOADING ? (
        <div>Load</div>
      ) : (
        <Table
          rowData={personas}
          tableRowHeader={tableRowHeader}
          onEdit={this.handerEditPersona}
          noSelection={true}
          noColumns={true}
          isList={false}
        ></Table>
      );
    }
  }
);

export default withPersonaViewModel(PersonasSelection);
