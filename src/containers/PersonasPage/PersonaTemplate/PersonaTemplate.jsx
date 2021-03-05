import React, { Component } from "react";

import history from "../../../routes/history";

import PAGE_STATUS from "../../../constants/PageStatus";
import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

import Table from "../../../components/Table";
import Spinner from "../../../components/Spinner";

import { observer } from "mobx-react";
import { withPersonaViewModel } from "../PersonaViewModels/PersonaViewModelContextProvider";
import ComponentPersonaTemplate from "../../../components/ComponentPersonaTemplate";
import {
  PERSONA_TEMPLATE_FIELD_KEY,
  ESI_PERSONA_TEMPLATE_FIELD_KEY,
} from "../../../constants/PersonaTemplateModule";

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

    handlerClick = (id) => {
      history.push(`/personas/create/bypersonatemplate/` + id);
    }

    render() {
      console.log("PersonaTemplate - render");
      console.log(this.personaTemplateViewModel.personaTemplatesData);
      const personaTemplatesData = this.personaTemplateViewModel.personaTemplatesData
      let personaTemplateHtml = null;

      if (personaTemplatesData !== null) {
        console.log("before loop");
        personaTemplateHtml = personaTemplatesData.map((personaTemplate) => {
          console.log(personaTemplate);
          return (
            <li onClick={e => this.handlerClick(personaTemplate[PERSONA_TEMPLATE_FIELD_KEY.ID])}>
              <p>{personaTemplate[PERSONA_TEMPLATE_FIELD_KEY.NAME]}</p>
              <p>
                <img
                  src={personaTemplate[PERSONA_TEMPLATE_FIELD_KEY.THUMBNAIL_URL]}
                  alt=""
                />
              </p>
            </li>
          );
        });
      }

      return (
        <React.Fragment>
          <ComponentPersonaTemplate
            personaTemplateHtml={
              personaTemplateHtml
            }
            viewModel={this.viewModel}
          />
        </React.Fragment>
      );
    }
  }
);

export default withPersonaViewModel(PersonaTemplate);
