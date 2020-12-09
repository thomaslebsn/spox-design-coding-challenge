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
      <aside className="sidebar w-260 p-3 mt-0 position-relative bg-white mh-100 overflow-hidden overflow-y-auto">
        <Menu />
      </aside>
    );
  }
}

export default withTranslation("common")(SbarLeft);
