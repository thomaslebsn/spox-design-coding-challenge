import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withPersonaViewModel } from "../PersonaViewModels/PersonaViewModelContextProvider";

const PersonaForm = lazy(() => import("./PersonaForm"));

const PersonaFormPage = observer(
  class PersonaFormPage extends Component {
    personaFormViewModel = null;
    personaListViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel, id } = props;

      console.log(id);
      console.log("PersonaFormPage - Debug View Model");
      console.log(viewModel);
      this.personaFormViewModel = viewModel
        ? viewModel.getPersonaFormViewModel()
        : null;

      if (id) {
        this.personaFormViewModel.getPersona(id);
      }

      console.log("PersonaFormPage - After binding class");
      console.log(this.personaFormViewModel);
    }

    savePersonaHandler = () => {
      this.personaFormViewModel.saveOnModal();
    };

    cancelSavingHandler = () => {
      this.personaFormViewModel.closeModal();
    };

    render() {
      console.log("[PersonaFormPage] - re-render .........");

      return <PersonaForm viewModel={this.personaFormViewModel} />;
    }
  }
);

export default withPersonaViewModel(PersonaFormPage);
