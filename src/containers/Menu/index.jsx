import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faMagic } from "@fortawesome/free-solid-svg-icons/faMagic";

import "./index.scss";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: "",
      dataMenu: [
        {
          name: "home",
          text: "Dashboard",
          link: "/",
          icons: faCoffee,
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
          icons: faMagic,
        },
        {
          name: "campaigns",
          text: "Campaigns",
          link: "/campaigns",
          icons: faMagic,
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
          icons: faMagic,
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
        }
      ],
    };
  }

  handleActionMenu = (name) => {
    this.setState({
      activeMenu: name
    })
  }

  render() {
    let { dataMenu, activeMenu } = this.state;
    return (
      <nav>
        <ul className="list-unstyled mb-0 py-3 pt-md-1">
          {dataMenu.map((value, key) => {
            let pathName = window.location.pathname;
            return (
              <li 
                key={key} 
                onClick={() => this.handleActionMenu(value.link)}
                className={`item_menu ${(activeMenu == value.link || pathName === value.link) ? 'active' : ''}`}
              >
                <Link
                  to={value.link}
                  className={`d-block rounded-1 p-3 mb-2 link_menu text-blue-0 text-decoration-none`}>
                  <i>
                    <FontAwesomeIcon icon={value.icons} />
                  </i>
                  <span className="ml-3">{value.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Menu;
