import React from "react";
import { withTranslation } from "react-i18next";

import "./index.scss";
import Menu from "../Menu";
import Menu2 from "../Menu2";
import Upgrade from "../../components/Upgrade";

class SbarLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { settingPage } = this.props;

    return (
      <aside
        className={`sidebar w-260 ${
          !settingPage ? "p-3" : ""
        } mt-0 position-relative bg-white mh-100 overflow-hidden overflow-y-auto d-flex flex-column justify-content-between z-index-100`}
      >
        {!settingPage ? (
          <>
            <Menu />
            <Upgrade />
          </>
        ) : (
          <Menu2 />
        )}
      </aside>
    );
  }
}

export default withTranslation("common")(SbarLeft);
