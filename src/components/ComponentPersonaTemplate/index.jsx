import React, { Component } from "react";
import "./index.scss";


class ComponentPersonaTemplate extends Component {
  render() {
    const personaTemplateHtml = this.props.personaTemplateHtml;

    return personaTemplateHtml ? (
      <div className="persona-recommendation">
        <h2 className="text-blue-0">Persona recommendations</h2>
        <div className="persona-template-list">
          <ul className="list-unstyled">{this.props.personaTemplateHtml}</ul>
        </div>
      </div>
    ) : null;
  }
}

export default ComponentPersonaTemplate;
