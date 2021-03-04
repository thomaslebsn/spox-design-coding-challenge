import React, { Component } from "react";

import {
  PERSONA_TEMPLATE_FIELD_KEY,
  ESI_PERSONA_TEMPLATE_FIELD_KEY,
} from "../../constants/PersonaTemplateModule";
import "./index.scss";
import history from "../../routes/history";

class ComponentPersonaTemplate extends Component {

  handlerClick = (id) => {
    history.push(`/personas/create/bypersonatemplate/` + id);
  }

  render() {
    console.log("persona template render");

    const { personaTemplatesData } = this.props;

    let personaTemplateHtml = null;
    console.log(personaTemplatesData);
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

    return personaTemplateHtml ? (
      <div className="persona-recommendation">
        <h2 className="text-blue-0">Persona recommendations</h2>
        <div className="persona-template-list">
          <ul className="list-unstyled">{personaTemplateHtml}</ul>
        </div>
      </div>
    ) : null;
  }
}

export default ComponentPersonaTemplate;
