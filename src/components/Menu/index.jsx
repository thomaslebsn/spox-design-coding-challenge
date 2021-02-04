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
          icons: faHome,
        },
        {
          name: "wizard",
          text: "Wizard",
          link: "/wizard",
          icons: faMagic,
        },
        {
          name: "projects",
          text: "Projects",
          link: "/projects",
          icons: faFileAlt,
        },
        {
          name: "campaigns",
          text: "Campaigns",
          link: "/campaigns",
          icons: faVolumeUp,
        },
        {
          name: "personas",
          text: "Personas",
          link: "/personas",
          icons: faMagic,
        },
        {
          name: "content",
          text: "Content",
          link: "/content",
          icons: faMagic,
        },
        {
          name: "channels",
          text: "Channels",
          link: "/channels",
          icons: faNetworkWired,
        },
        {
          name: "calendar",
          text: "Calendar",
          link: "/calendar",
          icons: faMagic,
        },
        {
          name: "analytics",
          text: "Analytics",
          link: "/analytics",
          icons: faMagic,
        },
        {
          name: "digital",
          text: "Digital Assets",
          link: "/digital",
          icons: faMagic,
        },
      ],
    };
  }

  checkActiveMenu = () => {
    if (window.location.pathname === "/") {
      document.getElementById("wr_list_menu").classList.remove("wr_list_menu");
    } else {
      document.getElementById("wr_list_menu").classList.add("wr_list_menu");
    }
  };

  componentDidMount = () => {
    this.checkActiveMenu();
  };

  handleCheckActive = (name) => {
    this.checkActiveMenu();
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
                onClick={this.handleCheckActive}
              >
                <NavLink
                  to={value.link}
                  className={`d-block rounded-1 p-3 link_menu text-blue-0 text-decoration-none `}
                  activeClassName={`active`}
                  //exact
                >
                  <i>
                    <FontAwesomeIcon icon={value.icons} />
                  </i>
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
