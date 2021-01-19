import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./index.module.scss";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { icon, text, className, onClick } = this.props;

    if (className !== undefined && styles[className] !== undefined) {
      className = styles[className];
    }
    return (
      <button
        type="button"
        className={`d-flex justify-content-center btn ${className}`}
        onClick={onClick}
      >
        <i className="pe-1">
          <FontAwesomeIcon icon={icon} />
        </i>
        <span className="text_btn">{text}</span>
      </button>
    );
  }
}

export default Button;
