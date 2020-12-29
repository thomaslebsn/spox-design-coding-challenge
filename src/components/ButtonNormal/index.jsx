import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

import "./index.scss";

class ButtonNormal extends React.Component {
  render() {
    let { icon, text, onClick, className } = this.props;

    if (className == undefined) {
      className = "btn-success";
    }

    return (
      <>
        <button type="button" className={`btn ${className}`} onClick={onClick}>
          {text}
          <i className="ms-1">
            <FontAwesomeIcon icon={faChevronRight} />
          </i>
        </button>
      </>
    );
  }
}

export default ButtonNormal;
