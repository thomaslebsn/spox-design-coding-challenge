import React from "react";
import { withTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

class ComponentHeaderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { t, i18n, title, textBtn, handleCreate } = this.props;
    return (
      <div className="py-4 px-3">
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="fs-2">{title}</h2>
          <a href="#" className="cursor-pointer text-decoration-none btn btn-success" onClick={handleCreate}>
            <i className="text-white"><FontAwesomeIcon icon={faPlus} /></i>
            <span className="ps-2">{textBtn}</span>
          </a>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(ComponentHeaderPage);