import React, { Component } from "react";

import history from "../../../routes/history";

import PAGE_STATUS from "../../../constants/PageStatus";
import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

import Table from "../../../components/Table";
import Spinner from "../../../components/Spinner";

import { observer } from "mobx-react";
import { withPersonaViewModel } from "../PersonaViewModels/PersonaViewModelContextProvider";
import ComponentPersonaTemplate from "../../../components/ComponentPersonaTemplate";

const PersonaTemplate = observer(
  class PersonaTemplate extends Component {
    personaTemplateViewModel = null;
    viewModel = null;
    isPersonaTemplate = true;

    constructor(props) {
      super(props);

      const { viewModel } = props;
      this.viewModel = viewModel;

      this.personaTemplateViewModel = viewModel
        ? viewModel.getPersonaTemplateViewModel()
        : null;
    }

    componentDidMount() {
      this.personaTemplateViewModel.initializeData();
    }

    render() {
      console.log("PersonaTemplate - render");
      console.log(this.personaTemplateViewModel.personaTemplatesData);
      return (
        <React.Fragment>
          <ComponentPersonaTemplate
            personaTemplatesData={
              this.personaTemplateViewModel.personaTemplatesData
            }
            viewModel={this.viewModel}
          />
        </React.Fragment>
      );
    }
  }
);

export default withPersonaViewModel(PersonaTemplate);
