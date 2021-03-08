import React from "react";
import { Nav, Accordion, useAccordionToggle, Button } from "react-bootstrap";

import { Tab, Tabs } from "react-bootstrap";
import { withTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faSync } from "@fortawesome/free-solid-svg-icons/faSync";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

import ModalComponent from "../../components/Modal";

import styles from "./index.module.scss";
import { isThisSecond } from "date-fns/esm";
import ComponentItemFanpage from "../ComponentItemFanpage";

class ComponentConnectaChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panelIndex: "",
      showModal: true,
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

  handleModalShow = (s) => {
    this.setState((state) => ({ showModal: s }));
  };

  handleConnectChannel = (name) => {
    let { projectListViewModel } = this.props;
    projectListViewModel.connectLoginUrl(989, name);
  };

  render() {
    let { panelIndex, channels, showModal } = this.state;

    let { projectListViewModel } = this.props;

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
                            onClick={(e) => {
                              this.handleConnectChannel("facebook");
                            }}
                          >
                            <i>
                              <FontAwesomeIcon icon={faPlus} />
                            </i>
                            <span className="ms-2">
                              {projectListViewModel.connected
                                ? "Connected"
                                : "Connect"}
                            </span>
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
        <ModalComponent
          header={"Facebook Fanpage"}
          body={<ComponentItemFanpage />}
          show={showModal}
          onHide={() => this.handleModalShow(false)}
          footer={
            <Button
              //onClick={this.saveCampaignsHandler}
              className="btn btn-success w-100"
            >
              <span>Save</span>
              <i className="ms-1">
                <FontAwesomeIcon icon={faChevronRight} />
              </i>
            </Button>
          }
        />
      </div>
    );
  }
}

export default withTranslation("common")(ComponentConnectaChannel);
