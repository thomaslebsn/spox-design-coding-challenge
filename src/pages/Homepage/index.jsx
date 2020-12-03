import React from "react";

import "./index.scss";

import Header from "../../containers/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import SbarLeft from "../../containers/SbarLeft";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="row">
        <SbarLeft />
        <div className="col-6">
          <h2>Hello Home</h2>
          <i>
            <FontAwesomeIcon icon={faCoffee} />
          </i>
          <Header />
        </div>
      </div>
    );
  }
}

export default HomePage;
