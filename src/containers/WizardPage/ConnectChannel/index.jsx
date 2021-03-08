import React, {Component} from "react";

import { Image, Tab, Tabs } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import { observer } from "mobx-react";

import Button from "../../../components/Button";
import ModalComponent from "../../../components/Modal";
import history from "../../../routes/history";

import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import ButtonNormal from "../../../components/ButtonNormal";
import ComponentConnectaChannel from "../../../components/ComponentConnectaChannel";
import { withWizardViewModel } from "../WizardViewModels/WizardViewModelContextProvider";
import ComponentItemFanpage from "../../../components/ComponentItemFanpage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

import WizardSteps from "../../../components/WizardSteps";
import styles from "./index.module.scss";
const ConnectChannel = observer(
  class ConnectChannel extends Component {
    projectListViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("ProjectList - Debug View Model 2222");
      console.log(viewModel);
      this.projectListViewModel = viewModel
        ? viewModel.getProjectListViewModel()
        : null;

      console.log("After binding class 22222");
      console.log(this.projectListViewModel);

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
        showModal: true,
      };
    }
  
    handleClick = () => {
      this.setState((state) => ({ showModal: true }));
    };
  
    handleModalShow = (s) => {
      this.setState((state) => ({ showModal: s }));
    };
  
    next = () => {
      history.push(`${history.location.pathname}/content`);
    };
  
    render() {
      let { channels, showModal } = this.state;
  
      return (
        <div className="d-flex flex-column m-4 p-4">
          {/* <div className="wrapper_tabs bg-white rounded-3 mb-4">
            <Tabs defaultActiveKey="1" id="connectContent-tab">
              {channels.map((value) => {
                return (
                  <Tab eventKey={value.id} title={value.title}>
                    {value.items.map((item) => {
                      {
                        return (
                          <div
                            className={`item_accordion ${styles.item_accordion} d-flex justify-content-between p-4 border-bottom-1`}
                          >
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
          </div> */}
          <ComponentConnectaChannel
            projectListViewModel={this.projectListViewModel}
            listFaceBookFanpage={this.projectListViewModel.listFaceBookFanpage}
            connected={this.projectListViewModel.connected}
          />
          <div className="d-flex justify-content-between">
            <Button
              className="btn btn-light border-success"
              onClick={() => this.props.goToStep(1)}
              text="Back"
            />
  
            <ButtonNormal
              className="btn btn-success"
              text="Next"
              onClick={this.next}
            ></ButtonNormal>
          </div>
          <ModalComponent
            header={"Facebook Fanpage"}
            body={<ComponentItemFanpage />}
            show={false}
            //onHide={this.projectListViewModel.closeModal()}
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
)


export default withWizardViewModel(ConnectChannel);
