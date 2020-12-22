import React from "react";
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";

class Upgrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="text-center pb-3">
        <div className="mb-2">
          <img src="/assets/images/annotation.png" alt="" />
        </div>
        <p className="mb-2">
          <span>Unlock more features now! Upgrade to </span>
          <a href="#" className="text-uppercase text-green fw-bold">OTHER PLAN</a>
        </p>
        <div>
          <a href="#" className="btn btn-success w-100">
            <i><FontAwesomeIcon icon={faCog} /></i>
            <span className="ms-2">Upgrade</span>
          </a>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(Upgrade);
