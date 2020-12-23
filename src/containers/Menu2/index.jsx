import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faMagic } from "@fortawesome/free-solid-svg-icons/faMagic";

class Menu2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: "",
      dataMenu: [
        {
          title: "ACCOUNT SETTINGS",
          listMenu: [
            {
              name: "profile",
              text: "Profile",
              link: "/profile",
              icons: faHome,
            },
            {
              name: "billingplan",
              text: "Billing & Plan",
              link: "/billing-plan",
              icons: faMagic,
            }
          ]
        },
        {
          title: "Members",
          listMenu: [
            {
              name: "organisations",
              text: "Organisations",
              link: "/organisations",
              icons: faHome,
            },
            {
              name: "teammembers",
              text: "Team Members",
              link: "/team-members",
              icons: faMagic,
            },
            {
              name: "roles",
              text: "Roles",
              link: "/roles",
              icons: faMagic,
            }
          ]
        },
        {
          title: "WORKFLOW",
          listMenu: [
            {
              name: "workflowschemes",
              text: "Workflow Schemes",
              link: "/workflow-schemes",
              icons: faHome
            }
          ]
        },
        {
          title: "Connect a Channel",
          listMenu: [
            {
              name: "socialmedia",
              text: "Social Media",
              link: "/social-media",
              icons: faHome
            },
            {
              name: "advertising",
              text: "Advertising",
              link: "/advertising",
              icons: faHome
            },
            {
              name: "cms",
              text: "CMS",
              link: "/cms",
              icons: faHome
            },
            {
              name: "emailmarketing",
              text: "Email Marketing",
              link: "/emailmarketing",
              icons: faHome
            }
          ]
        }
      ]
    }
  }

  handleActionMenu = (name) => {
    this.setState({
      activeMenu: name,
    });
  };

  render() {
    let { dataMenu, activeMenu } = this.state;
    return (
      <nav>
        <div className="py-1 px-3 item_menu">
          <a href="/" className="d-flex align-items-center text-blue-0 p-3 link_menu rounded-2 text-decoration-none">
            <i>
              <FontAwesomeIcon icon={faHome} />
            </i>
            <span className="ms-3">Back to Dashboard</span>
          </a>
        </div>
        {
          dataMenu.map((item, index) => {
            return (
              <div key={index}>
                <p className="fs-12 text-uppercase border-top-1 border-bottom-1 py-2 px-3 mb-0">{item.title}</p>
                <ul className="list-unstyled mb-0 py-1 px-3">
                  {item.listMenu.map((value, key) => {
                    let pathName = window.location.pathname;
                    return (
                      <li
                        key={key}
                        onClick={() => this.handleActionMenu(value.link)}
                        className={`item_menu ${
                          activeMenu == value.link || pathName === value.link
                            ? "active"
                            : ""
                        }`}
                      >
                        <Link
                          to={value.link}
                          className={`d-block rounded-1 p-3 link_menu text-blue-0 text-decoration-none`}
                        >
                          <i>
                            <FontAwesomeIcon icon={value.icons} />
                          </i>
                          <span className="ms-3">{value.text}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )
          })
        }
      </nav>
    );
  }
}

export default Menu2;
