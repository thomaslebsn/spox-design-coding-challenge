import React from "react";
import { Nav, Accordion, useAccordionToggle } from "react-bootstrap";

import { Tab, Tabs } from "react-bootstrap";
import { withTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faSync } from "@fortawesome/free-solid-svg-icons/faSync";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

import styles from "./index.module.scss";
import { isThisSecond } from "date-fns/esm";

class ComponentConnectaChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panelIndex: "",
      channels: [
        {
          id: 1,
          name: "social",
          title: "Social Media",
          items: [
            {
              id: 1,
              name: "Facebook",
              image: "/assets/images/icon-pepsi.png",
              list: [
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "Food Network",
                  type: "Fanpage",
                },
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "BuzzFeed Food",
                  type: "Fanpage",
                },
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "12 Tomatoes",
                  type: "Fanpage",
                },
              ],
            },
            // {
            //   id: 2,
            //   name: "Twitter",
            //   image: "/assets/images/icon-nikon.png",
            //   list: [
            //     {
            //       image: "/assets/images/icon-pepsi.png",
            //       name: "Food Network",
            //       type: "Fanpage",
            //     },
            //     {
            //       image: "/assets/images/icon-pepsi.png",
            //       name: "BuzzFeed Food",
            //       type: "Fanpage",
            //     },
            //     {
            //       image: "/assets/images/icon-pepsi.png",
            //       name: "12 Tomatoes",
            //       type: "Fanpage",
            //     },
            //   ],
            // },
            // {
            //   id: 3,
            //   name: "Google My Business",
            //   image: "/assets/images/icon-nikon.png",
            //   list: [
            //     {
            //       image: "/assets/images/icon-pepsi.png",
            //       name: "Food Network",
            //       type: "Fanpage",
            //     },
            //     {
            //       image: "/assets/images/icon-pepsi.png",
            //       name: "BuzzFeed Food",
            //       type: "Fanpage",
            //     },
            //     {
            //       image: "/assets/images/icon-pepsi.png",
            //       name: "12 Tomatoes",
            //       type: "Fanpage",
            //     },
            //   ],
            // },
            // {
            //   id: 4,
            //   name: "Instagram",
            //   image: "/assets/images/icon-nikon.png",
            //   list: [
            //     {
            //       image: "/assets/images/icon-pepsi.png",
            //       name: "Food Network",
            //       type: "Fanpage",
            //     },
            //     {
            //       image: "/assets/images/icon-pepsi.png",
            //       name: "BuzzFeed Food",
            //       type: "Fanpage",
            //     },
            //     {
            //       image: "/assets/images/icon-pepsi.png",
            //       name: "12 Tomatoes",
            //       type: "Fanpage",
            //     },
            //   ],
            // },
          ],
        },
        {
          id: 2,
          name: "advertising",
          title: "Advertising",
          items: [
            {
              id: 1,
              name: "Facebook Ads",
              image: "/assets/images/icon-adidas.png",
              list: [
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "Food Network",
                  type: "Fanpage",
                },
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "BuzzFeed Food",
                  type: "Fanpage",
                },
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "12 Tomatoes",
                  type: "Fanpage",
                },
              ],
            },
            {
              id: 2,
              name: "Google Adwords Channel",
              image: "/assets/images/icon-nikon.png",
              list: [
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "Food Network",
                  type: "Fanpage",
                },
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "BuzzFeed Food",
                  type: "Fanpage",
                },
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "12 Tomatoes",
                  type: "Fanpage",
                },
              ],
            },
            {
              id: 3,
              name: "Bing / Microsoft Ads",
              image: "/assets/images/icon-nikon.png",
              list: [
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "Food Network",
                  type: "Fanpage",
                },
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "BuzzFeed Food",
                  type: "Fanpage",
                },
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "12 Tomatoes",
                  type: "Fanpage",
                },
              ],
            },
          ],
        },
        {
          id: 3,
          name: "cms",
          title: "CMS",
          items: [
            {
              id: 1,
              name: "Joomla",
              image: "/assets/images/icon-adidas.png",
              list: [
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "triax.dk",
                  type: "Website",
                },
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "redWEB",
                  type: "Website",
                },
              ],
            },
            {
              id: 2,
              name: "Wordpress",
              image: "/assets/images/icon-nikon.png",
              list: [
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "Food Network",
                  type: "Website",
                },
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "BuzzFeed Food",
                  type: "Website",
                },
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "12 Tomatoes",
                  type: "Website",
                },
              ],
            },
            {
              id: 3,
              name: "Durpal",
              image: "/assets/images/icon-nikon.png",
              list: [
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "Food Network",
                  type: "Website",
                },
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "BuzzFeed Food",
                  type: "Website",
                },
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "12 Tomatoes",
                  type: "Website",
                },
              ],
            },
            {
              id: 4,
              name: "Umbraco",
              image: "/assets/images/icon-nikon.png",
              list: [
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "Food Network",
                  type: "Website",
                },
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "BuzzFeed Food",
                  type: "Website",
                },
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "12 Tomatoes",
                  type: "Website",
                },
              ],
            },
          ],
        },
        {
          id: 4,
          name: "email-marketing",
          title: "Email Marketing",
          items: [
            {
              id: 1,
              name: "Mailchimp",
              image: "/assets/images/icon-adidas.png",
              list: [
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "triax.dk mail",
                  type: "Email marketing",
                },
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "redWEB mail",
                  type: "Email marketing",
                },
              ],
            },
            {
              id: 2,
              name: "GetResponse",
              image: "/assets/images/icon-nikon.png",
              list: [
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "triax.dk mail",
                  type: "Email marketing",
                },
                {
                  image: "/assets/images/icon-pepsi.png",
                  name: "redWEB mail",
                  type: "Email marketing",
                },
              ],
            },
          ],
        },
      ],
    };
  }

  handleConnectChannel = (name) => {
    console.log('namenamename', name);
    let { projectListViewModel } = this.props;

    console.log('projectListViewModel 222444');
    console.log(projectListViewModel)

    projectListViewModel.connectLoginUrl(0, name);
  }

  render() {
    let { panelIndex, channels } = this.state;

    const CustomToggle = ({ children, eventKey }) => {
      const customOnClick = useAccordionToggle(eventKey, () => {
        this.setState({
          panelIndex: eventKey === panelIndex ? null : eventKey,
        });
      });

      return (
        <Nav.Link
          onClick={customOnClick}
          className={`d-flex align-items-center justify-content-between p-3 ${
            eventKey === panelIndex ? "border-bottom-1" : ""
          }`}
        >
          {children}
        </Nav.Link>
      );
    };

    return (
      <div className="wrapper_tabs">
        <Tabs
          defaultActiveKey="1"
          id="connectContent-tab"
          className="bg-white border-0"
        >
          {channels.map((value, key) => {
            return (
              <Tab key={key} eventKey={value.id} title={value.title}>
                <Accordion className="mt-4">
                  {value.items.map((item, index) => {
                    return (
                      <div key={index} className="bg-white rounded-3 mb-4">
                        <CustomToggle eventKey={item.id}>
                          <div className="d-flex align-items-center">
                            <img
                              className="img-avatar"
                              src={item.image}
                              alt=""
                            />
                            <span className="ms-2 fs-4 text-blue-0">
                              {item.name}
                            </span>
                          </div>
                          <a
                            href={void 0}
                            className="cursor-pointer btn btn-success"
                            onClick={(e) => {this.handleConnectChannel('facebook')}}
                          >
                            <i>
                              <FontAwesomeIcon icon={faPlus} />
                            </i>
                            <span className="ms-2">Connect</span>
                          </a>
                        </CustomToggle>
                        {/* <Accordion.Collapse eventKey={item.id}>
                          <div className="p-3">
                            <div className={`list_content`}>
                              <div className="py-2 px-3 bg-blue d-flex rounded-2">
                                <div className="col-4">Name</div>
                                <div className="col-2">Type</div>
                                <div className="col-6 text-end">Action</div>
                              </div>
                              <div className={`list_main `}>
                                {item.list.map((itemList, keyList) => {
                                  return (
                                    <div
                                      key={keyList}
                                      className={`item_accordion ${styles.item_accordion} p-3 border-bottom-1 d-flex align-items-center`}
                                    >
                                      <div className="col-4">
                                        <div className="d-flex align-items-center">
                                          <img
                                            className="img-avatar"
                                            src={itemList.image}
                                            alt=""
                                          />
                                          <span className="ms-2">
                                            {itemList.name}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col-2">
                                        {itemList.type}
                                      </div>
                                      <div className="col-6 text-end">
                                        <div className="d-flex align-items-center justify-content-end">
                                          <a
                                            href="/social-media"
                                            className="btn -btn-light"
                                          >
                                            <i>
                                              <FontAwesomeIcon icon={faSync} />
                                            </i>
                                            <span className="ms-2">
                                              Reconnect
                                            </span>
                                          </a>
                                          <a
                                            href={void 0}
                                            className="btn -btn-light"
                                          >
                                            <i>
                                              <FontAwesomeIcon icon={faTrash} />
                                            </i>
                                            <span className="ms-2">Remove</span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </Accordion.Collapse> */}
                      </div>
                    );
                  })}
                </Accordion>
              </Tab>
            );
          })}
        </Tabs>
      </div>
    );
  }
}

export default withTranslation("common")(ComponentConnectaChannel);
