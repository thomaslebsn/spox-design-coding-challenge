import React from "react";
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";

import ListThumb from "../../components/ListThumb";
import styles from "./index.module.scss";

class Projects extends React.Component {
  render() {
    const { t, i18n } = this.props;

    return (
      <div className="py-4 px-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="fs-2">Projects</h2>
          <a href={void(0)} className="cursor-pointer text-decoration-none btn btn-success">
            <i><FontAwesomeIcon icon={faPlus} /></i>
            <span className="ps-2">Create project</span>
          </a>
        </div>
        <div>
          <ListThumb />
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(Projects);
