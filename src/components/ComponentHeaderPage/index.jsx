import React from "react";
import { withTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

class ComponentHeaderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { t, i18n, title, textBtn, handleCreate, isCreate } = this.props;
    return (
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="fs-2">{title}</h2>
        <a href="#" className={`cursor-pointer text-decoration-none btn ${isCreate ? "btn-light border-0" : "btn-success"}`} onClick={handleCreate}>
          <i className={`${isCreate ? "text-blue-0" : "text-white"}`}><FontAwesomeIcon icon={isCreate ? faTimes : faPlus} /></i>
          <span className="ps-2">{textBtn}</span>
        </a>
      </div>
    );
  }
}

export default withTranslation("common")(ComponentHeaderPage);