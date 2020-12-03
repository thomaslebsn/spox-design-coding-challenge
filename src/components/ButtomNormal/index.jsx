import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

import "./index.scss";

class ButtonNormal extends React.Component {
  render() {
    let { text } = this.props;
    return (
      <div>
        <button type="button" className={`btn btn-success w-100`}>
          {text}
          <i className="ml-1">
            <FontAwesomeIcon icon={faChevronRight} />
          </i>
        </button>
      </div>
    );
  }
}

export default ButtonNormal;
