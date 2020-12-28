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
    let pathName = window.location.pathname;
    let checkPathName =
      pathName == "/profile" ||
      pathName == "/billing-plan" ||
      pathName == "/organisations" ||
      pathName == "/team-members" ||
      pathName == "/roles" ||
      pathName == "/workflow-schemes" ||
      pathName == "/social-media" ||
      pathName == "/advertising" ||
      pathName == "/cms" ||
      pathName == "/emailmarketing"

    return (
      <aside className={`sidebar w-260 ${!checkPathName ? "p-3" : ""} mt-0 position-relative bg-white mh-100 overflow-hidden overflow-y-auto d-flex flex-column justify-content-between z-index-100`}>
        {
          !checkPathName ? (
            <>
              <Menu />
              <Upgrade />
            </>
          ) : (
            <Menu2 />
          )
        }
        
      </aside>
    );
  }
}

export default withTranslation("common")(SbarLeft);
