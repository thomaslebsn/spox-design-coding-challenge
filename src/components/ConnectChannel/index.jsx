import React from "react";

import { Image, Tab, Tabs } from "react-bootstrap";
import { withTranslation } from "react-i18next";

import Button from "../Button";
import ModalComponent from "../Modal";

import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

import styles from "./index.module.scss";

class ConnectChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [
        {
          id: 1,
          name: "social",
          title: "Social Media",
          items: [
            { name: "Facebook", image: "/assets/images/icon-pepsi.png" },
            { name: "Twitter", image: "/assets/images/icon-nikon.png" },
          ],
        },
        {
          id: 2,
          name: "advertising",
          title: "Advertising",
          items: [
            { name: "Advertising 1", image: "/assets/images/icon-adidas.png" },
            { name: "Advertising 2", image: "/assets/images/icon-nikon.png" },
          ],
        },
      ],
      showModal: false,
    };
  }

  handleClick = () => {
    this.setState((state) => ({ showModal: true }));
  };

  handleModalShow = (s) => {
    this.setState((state) => ({ showModal: s }));
  };

  render() {
    let { channels, showModal } = this.state;

    return (
      <>
        <div className="wrapper_tabs">
          <Tabs defaultActiveKey="1" id="connectContent-tab">
            {channels.map((value) => {
              return (
                <Tab eventKey={value.id} title={value.title}>
                  {value.items.map((item) => {
                    {
                      return (
                        <div className="d-flex justify-content-between py-3">
                          <div className="align-self-center">
                            <Image
                              src={item.image}
                              className="pe-2"
                              height="40"
                            />
                            <span className="ps-2 fs-5">{item.name}</span>
                          </div>
                          <div className="align-self-center">
                            <Button
                              link="#"
                              icon={faPlus}
                              text="Connect"
                              className="btn-success"
                              onClick={this.handleClick}
                            />
                          </div>
                        </div>
                      );
                    }
                  })}
                </Tab>
              );
            })}
          </Tabs>
        </div>
        <ModalComponent
          body="test"
          show={showModal}
          onHide={() => this.handleModalShow(false)}
        />
      </>
    );
  }
}

export default withTranslation("common")(ConnectChannel);
