import React from 'react';
import { withTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons/faQuestionCircle";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";

import './index.scss';
import Notifications from '../../components/Notifications';
import DropdownAvatar from '../../components/DropdownAvatar';
import AllProjects from '../../components/AllProjects';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMini: false
    };
  }

  handleCollap = () => {
    let { isMini } = this.state;
    document.body.classList.toggle('mini_left');
    this.setState({
      isMini: !isMini
    })
  }

  render() {
    const { t, i18n } = this.props;
    let { isMini } = this.state;
    return (
      <div className="wrapper_header d-flex position-fixed w-100 top-0 left-0 right-0 pr-3 align-items-center shadow-sm">
        <div className="w-260 h-80">
          <a href="/" className="header_logo d-block pl-3">
            {
              isMini ? (
              <img className="logo_white" src="/assets/images/logo/logo-white.svg" alt="logo" />
              ) : (
                <img className="logo" src="/assets/images/logo/logo.svg" alt="logo" />
              )
            }
          </a>
        </div>
        <div className="content_header border-left-1 border-gray flex-1 d-flex align-items-center pl-4 pr-4 position-relative">
          <a 
            href="#" 
            className="
              item_collap 
              d-flex 
              position-absolute
              text-green 
              bg-blue-1 
              rounded-circle 
              align-items-center 
              justify-content-center
            "
            onClick={this.handleCollap}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>
          <div className="d-flex justify-content-between flex-1 align-items-center">
            <AllProjects />
            <div className="d-flex align-items-center">
              <div className="input-group mb-0 pr-2 wr_input_search">
                <input type="text" placeholder={t("txt_search_for_something")} aria-describedby="button-search" className="form-control border-right-0 pr-2"/>
                <button type="button" id="button-search" className="btn btn_search border-1 border-left-0 border-gray text-green">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              <div className="pl-3 pr-3">
                <a href="#" className="item_help d-flex align-items-center text-blue-0">
                  <FontAwesomeIcon icon={faQuestionCircle} />
                  <span className="white-spacing-nowrap pl-2">{t("txt_help_center")}</span>
                </a>
              </div>
              <div className="pl-3 pr-3">
                <Notifications />
              </div>
              <div className="pl-3 pr-3">
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
