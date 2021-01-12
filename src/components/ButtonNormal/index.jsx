import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

import "./index.scss";

class ButtonNormal extends React.Component {
  render() {
    let { iconStart, text, onClick, className } = this.props;

    if (className == undefined) {
      className = "btn-success";
    }

    return (
      <>
        <button type="button" className={`btn ${className}`} onClick={onClick}>
          {iconStart && (
            <i className="me-1">
              <FontAwesomeIcon icon={faPlus} />
            </i>
          )}
          {text}
          {!iconStart && (
            <i className="ms-1">
              <FontAwesomeIcon icon={faChevronRight} />
            </i>
          )}
        </button>
      </>
    );
  }
}

export default ButtonNormal;
