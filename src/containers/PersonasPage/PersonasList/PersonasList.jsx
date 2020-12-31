import React, { Component } from "react";

import history from "../../../routes/history";

import PAGE_STATUS from "../../../constants/PageStatus";
import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

import Table from "../../../components/Table";

import { observer } from "mobx-react";
import { withPersonaViewModel } from "../PersonaViewModels/PersonaViewModelContextProvider";

const PersonasList = observer(
  class PersonasList extends Component {
    personaListViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("PersonaList - Debug View Model");
      console.log(viewModel);
      this.personaListViewModel = viewModel
        ? viewModel.getPersonaListViewModel()
        : null;

      console.log("After binding class");
      console.log(this.personaListViewModel);

      this.personaFormModalViewModel = viewModel
        ? viewModel.getPersonaFormViewModel()
        : null;
    }

    componentDidMount() {
      this.personaListViewModel.initializeData();
    }

    handerEditPersona = (row) => {
      history.push(`/personas/edit/${row[PERSONA_FIELD_KEY.ID]}`, {
        form: true,
        id: row[PERSONA_FIELD_KEY.ID],
      });
    };

    handerSelectPersona = (data) => {
      this.personaListViewModel.personaIdsSelected = data
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
        personas,
      } = this.personaListViewModel;
      console.log(personas);
      return tableStatus === PAGE_STATUS.LOADING ? (
        <div>Load</div>
      ) : (
        <Table
          rowData={personas}
          tableRowHeader={tableRowHeader}
          onEdit={this.handerEditPersona}
          onSelect={this.handerSelectPersona}
        ></Table>
      );
    }
  }
);

export default withPersonaViewModel(PersonasList);
