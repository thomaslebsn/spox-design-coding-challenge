import React from "react";
import { withTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";
import Notifications from "../../components/Notifications";
import DropdownAvatar from "../../components/DropdownAvatar";
import AllProjects from "../../components/AllProjects";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t, i18n } = this.props;
    return (
      <div className="wrapper_header d-flex position-fixed w-100 top-0 start-0 end-0 pe-3 align-items-center shadow-sm">
        <div className="w-260 ps-3">
          <a href="/" className="d-block">
            <img src="/assets/images/logo/logo.svg" alt="logo" />
          </a>
        </div>
        <div className="content_header border-start-1 border-gray flex-1 d-flex align-items-center ps-4 pe-4">
          <div className="d-flex justify-content-between flex-1 align-items-center">
            <AllProjects />
            <div className="d-flex align-items-center">
              <div className="input-group mb-0 pe-2 wr_input_search">
                <input
                  type="text"
                  placeholder={t("txt_search_for_something")}
                  aria-describedby="button-search"
                  className="form-control border-end-0 pe-2"
                />
                <button
                  type="button"
                  id="button-search"
                  className="btn btn_search border-1 border-start-0 border-gray text-green"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              <div className="ps-3 pe-3">
                <a
                  href="#"
                  className="item_help d-flex align-items-center text-blue-0"
                >
                  <FontAwesomeIcon icon={faQuestionCircle} />
                  <span className="white-spacing-nowrap ps-2">
                    {t("txt_help_center")}
                  </span>
                </a>
              </div>
              <div className="ps-3 pe-3">
                <Notifications />
              </div>
              <div className="ps-3 pe-3">
                <DropdownAvatar />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(Header);
