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
      <aside className="sidebar vh-100 position-fixed">
        <div className="mt-4 mb-4">
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
