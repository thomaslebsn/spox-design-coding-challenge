import React from "react";
import { withTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";

import "./index.scss";

import { logout } from "../../auth";

const data = [
  {
    key: 1,
    text: "Profile",
    link: "/profile",
  },
  {
    key: 2,
    text: "Billing & Plan",
    link: "/billing-plan",
  },
  // {
  //   key: 3,
  //   text: "Members",
  // },
  // {
  //   key: 4,
  //   text: "My collections",
  // },
  // {
  //   key: 5,
  //   text: "Upgrade",
  // },
];

class DropdownAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  CustomToggleAvatar = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="d-flex align-items-center text-decoration-none"
    >
      <img src="/assets/images/avatar.png" alt="" className="img-avatar" />
      <div className="text ps-3 pe-3">
        <p className="mb-0 text-blue-0 fs-14 fw-bold">Dave Johnson</p>
        <p className="mb-0 text-blue-0 fs-14 opacity-75">Small Business Owner</p>
      </div>
      <i className="icons green">
        <FontAwesomeIcon icon={faChevronDown} />
      </i>
    </a>
  ));

  render() {
    const { t, i18n } = this.props;
    return (
      <div className="wrapper_avatar position-relative">
        <Dropdown>
          <Dropdown.Toggle
            as={this.CustomToggleAvatar}
            id="dropdown-custom-components position-relative"
          ></Dropdown.Toggle>
          <Dropdown.Menu className="shadow border-0">
            <div className="p-3">
              <ul className="list-unstyled ps-0 mb-0 list_menu_avatar">
                {data.map((value, index) => {
                  return (
                    <li key={index}>
                      <Dropdown.Item
                        href={value.link}
                        className="text-blue-0 d-block rounded-1 text-decoration-none p-2"
                      >
                        {value.text}
                      </Dropdown.Item>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div
              onClick={logout}
              className="d-flex align-items-center p-3 text-red-1 border-top-1 border-gray cursor-pointer"
            >
              <span className="ps-2 pe-2">{t("txt_sign_out")}</span>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default withTranslation("common")(DropdownAvatar);
