import React from "react";
import { withTranslation } from "react-i18next";

import "./index.scss";
import Menu from "../Menu";

class SbarLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <aside className="col-3">
        <div className="mt-3 mb-3">
          <a href="/">
            <img src="/assets/images/logo/logo.svg" alt="logo" />
          </a>
        </div>
        <Menu />
      </aside>
    );
  }
}

export default withTranslation("common")(SbarLeft);
