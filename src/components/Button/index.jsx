import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./index.scss";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { icon, text, className } = this.props;
    return (
      <div className="main_btn">
        <button type="button" className={`btn ${className}`}>
          <i className="icon_btn">
            <FontAwesomeIcon icon={icon} />
          </i>
          <span className="text_btn">{text}</span>
        </button>
      </div>
    );
  }
}

export default Button;
