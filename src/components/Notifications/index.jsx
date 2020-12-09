import React from "react";
import { withTranslation } from "react-i18next";
import { Dropdown, Tabs, Tab } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

import "./index.scss";

const data = [
  {
    key: 1,
    icon: "/assets/images/avatar.png",
    name: "Salome Simoes",
    time: "a few seconds ago",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cur aitur id ipsum ut arcu commodo faucibus."
  },
  {
    key: 2,
    icon: "/assets/images/avatar.png",
    name: "Ponnappa Priya",
    time: "a few seconds ago",
    text: "Welcome to Easii.io Marketing Automation made easy!"
  },
  {
    key: 3,
    icon: "/assets/images/avatar.png",
    name: "Salome Simoes",
    time: "a few seconds ago",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cur aitur id ipsum ut arcu commodo faucibus."
  },
  {
    key: 4,
    icon: "/assets/images/avatar.png",
    name: "Ponnappa Priya",
    time: "a few seconds ago",
    text: "Welcome to Easii.io Marketing Automation made easy!"
  }
]


class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  CustomToggleBell = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="text-blue-0"
    >
      <span className="number_bell position-absolute rounded-circle bg-orange white d-flex align-items-center justify-content-center text-white">10</span>
      <FontAwesomeIcon icon={faBell} />
    </a>
  ));

  componentNotification = (data) => {
    return (
      <ul className="pl-0 list-unstyled mb-0">
        {
          data.map((value, index) => {
            return (
              <li key={index} className="pt-3 pb-3 border-bottom-1 border-gray item_notification">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <img src={value.icon} className="img-avatar"/>
                    <span className="pl-2">{value.name}</span>
                  </div>
                  <p className="mb-0 fs-14 black opacity-50">{value.time}</p>
                </div>
                <p className="mb-0 fs-14 black opacity-75">{value.text}</p>
              </li>
            )
          })
        }
      </ul>
    )
    
  }

  render() {
    const { t, i18n } = this.props;
    return (
      <div className="wrapper_dropdown position-relative">
        <Dropdown>
          <Dropdown.Toggle as={this.CustomToggleBell} id="dropdown-custom-components position-relative"></Dropdown.Toggle>
          <Dropdown.Menu className="top-100 shadow border-0 p-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="blue mb-0">{t("txt_notifications")}</h5>
              <p className="text_heading_bell fs-12 mb-0 black opacity-50 text-white">{t("txt_mark_all_as_read")}</p>
            </div>
            <div className="wrapper_tabs">
              <Tabs defaultActiveKey="internal" id="noanim-tab-example">
                <Tab eventKey="internal" title={t("txt_internal")}>
                  {this.componentNotification(data)}
                </Tab>
                <Tab eventKey="client" title={t("txt_client")}>
                  {this.componentNotification(data)}
                </Tab>
              </Tabs>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      
    );
  }
}

export default withTranslation("common")(Notifications);
