import React from "react";
import { withTranslation } from "react-i18next";
import { Dropdown, FormControl } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const data = [
  {
    key: "1",
    icon: "/assets/images/icon-pepsi.png",
    text: "Marketing Vietnam Suntory PepsiCo",
  },
  {
    key: "2",
    icon: "/assets/images/icon-nikon.png",
    text: "Marketing Vietnam Nikon",
  },
  {
    key: "3",
    icon: "/assets/images/icon-adidas.png",
    text: "Marketing Vietnam Adidas",
  },
  {
    key: "4",
    icon: "/assets/images/icon-levis.png",
    text: "Marketing Vietnam Levi's",
  },
  {
    key: "5",
    icon: "/assets/images/icon-gap.png",
    text: "Shop Gap for Casual Women's Men's",
  },
  {
    key: "6",
    icon: "/assets/images/icon-gap.png",
    text: "Marketing Vietnam McDonalds",
  },
];

class AllProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <span className="me-2 text-blue-0">{children}</span>
      <i className="text-green">
        <FontAwesomeIcon icon={faChevronDown} />
      </i>
    </a>
  ));

  CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const { t, i18n } = this.props;
      let { value } = this.state;

      return (
        <div
          ref={ref}
          style={style}
          className={`${className} p-0 border-0 shadow top-100`}
          aria-labelledby={labeledBy}
        >
          <div className="p-3">
            <div className="d-flex position-relative mb-3">
              <FormControl
                autoFocus
                className="w-100 "
                placeholder={t("txt_search_projects")}
                onChange={(e) => this.setState({ value: e.target.value })}
                value={value}
              />
              <i className="position-absolute end-0 top-0 bottom-0 me-3 d-flex align-items-center green">
                <FontAwesomeIcon icon={faSearch} />
              </i>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="mb-0 text-uppercase opacity-75">
                {t("txt_recent")}
              </p>
              <a href="#">{t("txt_view_all_projects")}</a>
            </div>
            <ul className="list-unstyled mb-0">
              {React.Children.toArray(children).filter(
                (child) =>
                  !value ||
                  child.props.children[1].props.children
                    .toLowerCase()
                    .startsWith(value)
              )}
            </ul>
          </div>
          <a
            href="#"
            className="d-flex align-items-center p-3 justify-content-center text-green border-top-1 border-gray"
          >
            <p className="mb-0 d-flex align-items-center">
              <span className="me-1">{t("txt_create_a_new_project")}</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </p>
          </a>
        </div>
      );
    }
  );

  render() {
    const { t, i18n } = this.props;
    return (
      <div className="wrapper_dropdown">
        <Dropdown>
          <Dropdown.Toggle
            as={this.CustomToggle}
            id="dropdown-custom-components"
          >
            {t("txt_all_projects")}
          </Dropdown.Toggle>

          <Dropdown.Menu as={this.CustomMenu}>
            {data.map((value, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  eventKey={value.key}
                  className="d-flex align-items-center p-2"
                >
                  <img src={value.icon} alt="" className="img-avatar" />
                  <span className="ps-2">{value.text}</span>
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default withTranslation("common")(AllProjects);
