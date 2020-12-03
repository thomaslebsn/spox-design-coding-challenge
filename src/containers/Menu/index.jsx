import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faMagic } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: "home",
      dataMenu: [
        {
          name: "home",
          text: "Home",
          link: "/",
          icons: faCoffee,
        },
        {
          name: "wizard",
          text: "Wizard",
          link: "/wizard",
          icons: faMagic,
        },
      ],
    };
  }

  render() {
    let { dataMenu, menuActive } = this.state;
    return (
      <nav>
        <ul className="list-unstyled mb-0 py-3 pt-md-1">
          {dataMenu.map((value, key) => {
            let pathName = window.location.pathname;
            return (
              <li key={key}>
                <Link
                  to={value.link}
                  className={`d-block rounded-1 p-3 mb-2 link-menu ${
                    pathName === value.link ? "active text-white" : "text-body"
                  }`}
                >
                  <i>
                    <FontAwesomeIcon icon={value.icons} />
                  </i>
                  <span className="ml-2">{value.text}</span>
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
