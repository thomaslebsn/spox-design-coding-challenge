import React from "react";
import { Nav, Accordion, useAccordionToggle, Button } from "react-bootstrap";

import { Tab, Tabs } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import history from "../../routes/history";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faSync } from "@fortawesome/free-solid-svg-icons/faSync";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

import styles from "./index.module.scss";

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
          ],
        },
      ],
    };
  }

  handleConnectChannel = (name) => {
    let { projectListViewModel } = this.props;

    let getIdProject = history.location.pathname.match(/\d/g);
    getIdProject = getIdProject.join("");
    projectListViewModel.connectLoginUrl(getIdProject, name);
  };

  render() {
    let { channels } = this.state;

    const { listFaceBookFanpageView, connected } = this.props;

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
                <div className="mt-4">
                  {value.items.map((item, index) => {
                    return (
                      <div key={index} className="bg-white rounded-3 mb-4">
                        <div className="d-flex align-items-center justify-content-between p-3">
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
                          <button
                            className="cursor-pointer btn btn-success"
                            onClick={(e) => {
                              this.handleConnectChannel("facebook");
                            }}
                            disabled={connected ? true : false}
                          >
                            <i>
                              <FontAwesomeIcon icon={faPlus} />
                            </i>
                            <span className="ms-2">
                              {connected ? "Connected" : "Connect"}
                            </span>
                          </button>
                        </div>
                        {listFaceBookFanpageView && (
                          <div className="p-3">
                            <div className={`list_content`}>
                              <div className="py-2 px-3 bg-blue d-flex rounded-2">
                                <div className="col-4">Name</div>
                                <div className="col-6 text-end">Action</div>
                              </div>
                              <div className={`list_main `}>
                                {listFaceBookFanpageView.map((value, key) => {
                                  return (
                                    <div
                                      key={key}
                                      className={`item_accordion ${styles.item_accordion} p-3 border-bottom-1 d-flex align-items-center`}
                                    >
                                      <div className="col-4">
                                        <div className="d-flex align-items-center">
                                          <span className="ms-2">
                                            {value.name}
                                          </span>
                                        </div>
                                      </div>
                                      {/* <div className="col-6 text-end">
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
                                      </div> */}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Tab>
            );
          })}
        </Tabs>
      </div>
    );
  }
}

export default withTranslation("common")(ComponentConnectaChannel);
