import React from "react";
import { withTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";

import "./index.scss";

const data = [
  {
    key: 1,
    text: "Profile",
  },
  {
    key: 2,
    text: "Billing & Plan",
  },
  {
    key: 3,
    text: "Members",
  },
  {
    key: 4,
    text: "My collections",
  },
  {
    key: 5,
    text: "Upgrade",
  },
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
      <div className="ps-3 pe-3">
        <p className="mb-0 text-blue-0 fs-14 fw-bold">David William White</p>
        <p className="mb-0 text-blue-0 fs-14 opacity-75">Project Manager</p>
      </div>
      <i className="green">
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
                      <a
                        href="#"
                        className="text-blue-0 d-block rounded-1 text-decoration-none p-2"
                      >
                        {value.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <a
              href="#"
              className="d-flex align-items-center p-3 text-red border-top-1 border-gray"
            >
              <span className="ps-2 pe-2">{t("txt_sign_out")}</span>
            </a>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default withTranslation("common")(DropdownAvatar);
