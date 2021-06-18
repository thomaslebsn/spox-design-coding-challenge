import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faMagic } from "@fortawesome/free-solid-svg-icons/faMagic";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons/faFileAlt";
import { faNetworkWired } from "@fortawesome/free-solid-svg-icons/faNetworkWired";
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons/faVolumeUp";

import { authRoutes, mainRoutes } from "../../routes/routes";

import "./index.scss";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMenu: [
        {
          name: "home",
          text: "Dashboard",
          link: "/",
          icons: "/assets/images/icon_dashboard.svg",
        },
        {
          name: "wizard",
          text: "Wizard",
          link: "/wizard",
          icons: "/assets/images/icon_wizard.svg",
        },
        {
          name: "projects",
          text: "Projects",
          link: "/projects",
          icons: "/assets/images/icon_projects.svg"
        },
        {
          name: "campaigns",
          text: "Campaigns",
          link: "/campaigns",
          icons: "/assets/images/icon_campaigns.svg"
        },
        {
          name: "personas",
          text: "Personas",
          link: "/personas",
          icons: "/assets/images/icon_personas.svg"
        },
        {
          name: "content",
          text: "Content",
          link: "/content",
          icons: "/assets/images/icon_content.svg"
        },
        {
          name: "channels",
          text: "Channels",
          link: "/channels",
          icons: "/assets/images/icon_channles.svg"
        },
        {
          name: "calendar",
          text: "Calendar",
          link: "/calendar",
          icons: "/assets/images/icon_calendar.svg"
        },
        {
          name: "analytics",
          text: "Analytics",
          link: "/analytics",
          icons: "/assets/images/icon_analytics.svg"
        },
        {
          name: "digital",
          text: "Digital Assets",
          link: "/digital-assets",
          icons: "/assets/images/icon_digital_assets.svg"
        },
      ],
    };
  }

  checkActiveMenu = (name) => {
    if (window.location.pathname === "/") {
      document.getElementById("wr_list_menu").classList.remove("wr_list_menu");
    } else {
      document.getElementById("wr_list_menu").classList.add("wr_list_menu");
    }

    if (name === "/" || name === "/analytics" || name === "/calendar") {
      document.getElementById("all_header").classList.add("all_header");
    } else {
      document.getElementById("all_header").classList.remove("all_header");
    }
  };

  componentDidMount = () => {
    this.checkActiveMenu();
    if (window.location.pathname === "/") {
      document.getElementById("all_header").classList.add("all_header");
    } else {
      document.getElementById("all_header").classList.remove("all_header");
    }
  };

  handleCheckActive = (name) => {
    this.checkActiveMenu(name);
  };

  render() {
    let { dataMenu } = this.state;

    return (
      <nav>
        <ul id="wr_list_menu" className="list-unstyled mb-0 py-3 pt-md-1">
          {dataMenu.map((value, key) => {
            return (
              <li
                key={key}
                className={`item_menu `}
                onClick={(e) => this.handleCheckActive(value.link)}
              >
                <NavLink
                  to={value.link}
                  className={`d-block rounded-1 p-3 link_menu text-blue-0 text-decoration-none `}
                  activeClassName={`active`}
                >
                  <img src={value.icons} alt={value.icons} />
                  <span className="ms-3">{value.text}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Menu;
