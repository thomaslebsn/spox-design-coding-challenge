import React from "react";

import "./index.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="col-6">
        <h2>Dashboard</h2>
        <i>
          <FontAwesomeIcon icon={faCoffee} />
        </i>
      </div>
    );
  }
}

export default HomePage;
