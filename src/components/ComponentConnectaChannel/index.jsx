import React, { Component, lazy } from "react";
import {
  Tab,
  Tabs,
  Button,
  Nav,
  Accordion,
  useAccordionToggle,
} from "react-bootstrap";
import { withTranslation } from "react-i18next";
import history from "../../routes/history";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faSync } from "@fortawesome/free-solid-svg-icons/faSync";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import Wordpress from "./Wordpress";
import LoginChannelCMSFormModal from "../../containers/WizardPage/LoginChannelCMSForm/LoginChannelCMSFormModal";
import styles from "./index.module.scss";
const ModalComponent = lazy(() => import("../../components/Modal"));

class ComponentConnectaChannel extends Component {
  formData = [];
  projectListViewModel = null;
  constructor(props) {
    super(props);

    console.log("==============");
    console.log(this.props);

    this.projectListViewModel = this.props.projectListViewModel;

    let { viewModel } = this.props;

    this.loginCMSChannelFormModalViewModel = viewModel
      ? viewModel.getLoginCMSChannelFormModalViewModel()
      : null;

    this.state = {
      panelIndex: "",
      isShowModalWordpress: false,
    };
  }

  closeModal = () => {
    this.setState({
      isShowModalWordpress: false,
    });
  };

  handleConnectChannel = (name) => {
    let { projectListViewModel } = this.props;

    let getIdProject = history.location.pathname.match(/\d/g);
    getIdProject = getIdProject.join("");
    projectListViewModel.connectLoginUrl(getIdProject, name);
  };

  showModalConnectCMS = (name) => {
    this.loginCMSChannelFormModalViewModel.openModal();
  };

  render() {
    const {
      listFaceBookFanpageView,
      facebookConnected,
      twitterConnected,
      linkedinConnected,
    } = this.props;

    return (
      <div className="wrapper_tabs">
        <Tabs
          defaultActiveKey="1"
          id="connectContent-tab"
          className="bg-white border-0"
        >
          <Tab eventKey={1} title={"Social Media"}>
            <div className="mt-4">
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img
                      className="img-avatar"
                      src={"/assets/images/icon-pepsi.png"}
                      alt=""
                    />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">
                      Facebook
                    </span>
                  </div>
                  <button
                    className="cursor-pointer btn btn-success"
                    onClick={(e) => {
                      this.handleConnectChannel("facebook");
                    }}
                    disabled={facebookConnected ? true : false}
                  >
                    <i>
                      <FontAwesomeIcon icon={faPlus} />
                    </i>
                    <span className="ms-2">
                      {facebookConnected ? "Connected" : "Connect"}
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
                                  <span className="ms-2">{value.name}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img
                      className="img-avatar"
                      src={"/assets/images/icon-pepsi.png"}
                      alt=""
                    />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">
                      Twitter
                    </span>
                  </div>
                  <button
                    className="cursor-pointer btn btn-success"
                    onClick={(e) => {
                      this.handleConnectChannel("twitter");
                    }}
                    disabled={twitterConnected ? true : false}
                  >
                    <i>
                      <FontAwesomeIcon icon={faPlus} />
                    </i>
                    <span className="ms-2">
                      {twitterConnected ? "Connected" : "Connect"}
                    </span>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img
                      className="img-avatar"
                      src={"/assets/images/icon-pepsi.png"}
                      alt=""
                    />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">
                      Linkedin
                    </span>
                  </div>
                  <button
                    className="cursor-pointer btn btn-success"
                    onClick={(e) => {
                      this.handleConnectChannel("linkedin");
                    }}
                    disabled={linkedinConnected ? true : false}
                  >
                    <i>
                      <FontAwesomeIcon icon={faPlus} />
                    </i>
                    <span className="ms-2">
                      {linkedinConnected ? "Connected" : "Connect"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey={2} title={"CMS"}>
            <div className="mt-4">
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img
                      className="img-avatar"
                      src={"/assets/images/icon-pepsi.png"}
                      alt=""
                    />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">
                      Wordpress
                    </span>
                  </div>
                  <LoginChannelCMSFormModal
                    clicked={this.showModalConnectCMS}
                  />
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default withTranslation("common")(ComponentConnectaChannel);
