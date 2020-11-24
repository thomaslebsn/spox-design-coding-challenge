import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

import "./index.scss";

class ButtonNormal extends React.Component {
  render() {
    let { text } = this.props;
    return (
      <div className="main_btn_normal">
        <button type="button" className={`btn btn-primary link_btn_normal`}>
          <span className="text_btn">{text}</span>
          <i className="icon_btn">
            <FontAwesomeIcon icon={faChevronRight} />
          </i>
        </button>
      </div>
    );
  }
}

export default ButtonNormal;
