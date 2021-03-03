import React, { Component } from "react";

import contentsStore from "../../containers/ContentPage/ContentStore/ContentStore";
import PersonaTemplateUtils from "../../containers/ContentPage/ContentUtils/PersonaTemplateUtils";
import { notify } from "../../components/Toast";

import {
    PERSONA_TEMPLATE_FIELD_KEY,
    ESI_PERSONA_TEMPLATE_FIELD_KEY,
  } from "../../constants/PersonaTemplateModule";
import "./index.scss";

class PersonaTemplate extends Component {
  personaTemplates = null;
  contentsStore = null;

  constructor(props) {
    super(props);

    if (this.contentsStore === null) {
      this.contentsStore = new contentsStore();
    }

    this.state = {
        personaTemplatesData: null,
      }
  }

  componentDidMount = () => {
      console.log('componentDidMount');
        this.contentsStore.getPersonaRecommendations(
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHander,
        1
    );
  };

  callbackOnSuccessHandler = (personaTemplateModelData) => {
    console.log('Component PersonaTemplate - callbackOnSuccessHandler');
    console.log(personaTemplateModelData);

    const rowDataTransformed = PersonaTemplateUtils.transformPersonaTemplateModelIntoTableDataRow(
        personaTemplateModelData.list
      );

      console.log("Row Data is Formatted");
      console.log(rowDataTransformed);

      this.personaTemplates = rowDataTransformed;
      this.setState({
        personaTemplatesData: this.personaTemplates,
      });
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
  };

  render() {
      console.log('persona template render');
      const { personaTemplatesData } = this.state;
    
      let personaTemplateHtml = null;
        console.log(personaTemplatesData);
      if (personaTemplatesData !== null)
      {
          console.log('before loop');
        personaTemplateHtml = personaTemplatesData.map(personaTemplate => {
            console.log(personaTemplate);
            return (
                <li>
                    <p>{personaTemplate[PERSONA_TEMPLATE_FIELD_KEY.NAME]}</p>
                    <p><img src={personaTemplate[PERSONA_TEMPLATE_FIELD_KEY.THUMBNAIL_URL]} alt=""/></p>
                </li>
            );
        })
      }

    return (
      <div className="persona-recommendation">
        <h2 className="text-blue-0">Persona recommendations</h2>
        <div className="persona-template-list">
          <ul className="list-unstyled">
            {personaTemplateHtml}
          </ul>
        </div>
      </div>
    );
  }
}

export default PersonaTemplate;
