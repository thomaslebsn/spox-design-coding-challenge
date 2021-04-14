import React, { Component, lazy } from "react";
import {
  Tab,
  Tabs,
  Button,
  Nav,
  Accordion,
  useAccordionToggle,
} from "react-bootstrap";
import history from "../../routes/history";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faSync } from "@fortawesome/free-solid-svg-icons/faSync";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import Wordpress from "./Wordpress";
import LoginChannelCMSFormModal from "../../containers/ChannelsPage/LoginChannelCMSForm/LoginChannelCMSFormModal";
import styles from "./index.module.scss";
import Upgrade from "../Upgrade";
import ButtonConnect from "../ButtonConnect";
import {
  CHANNEL_CMS_DRUPAL,
  CHANNEL_CMS_MEDIUM,
  CHANNEL_CMS_WORDPRESS,
} from "../../constants/ChannelModule";
const ModalComponent = lazy(() => import("../../components/Modal"));
class ComponentConnectaChannel extends Component {
  formData = [];
  channelsListViewModel = null;
  constructor(props) {
    super(props);

    console.log(this.props);

    this.channelsListViewModel = this.props.channelsListViewModel;

    let { viewModel } = this.props;

    this.loginCMSChannelFormModalViewModel = viewModel
      ? viewModel.getLoginCMSChannelFormModalViewModel()
      : null;

    this.state = {
      panelIndex: "",
      isShowModalWordpress: false,
      showModalCms: false,
    };
  }

  closeModal = () => {
    this.setState({
      isShowModalWordpress: false,
    });
  };

  handleConnectChannel = (name) => {
    let { channelsListViewModel } = this.props;
    channelsListViewModel.connectLoginUrl(name);
  };

  closeModalUpgrade = () => {
    this.props.channelsListViewModel.mustUpgrade = false;
  };

  render() {
    const {
      channelsListViewModel,
      listFaceBookFanpageView,
      facebookConnected,
      youtubeConnected,
      twitterConnected,
      linkedinConnected,
      mailchimpConnected,
      instagramConnected,
      tumblrConnected,
      mediumConnected,
      handleModalCms,
      isModalCms,
    } = this.props;

    const { drupalConnected, wordpressConnected } = channelsListViewModel;

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
                      src={"/assets/images/facebook.png"}
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
                      src={"/assets/images/instagram.png"}
                      alt=""
                    />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">
                      Instagram
                    </span>
                  </div>
                  <button
                    className="cursor-pointer btn btn-success"
                    onClick={(e) => {
                      this.handleConnectChannel("instagram");
                    }}
                    disabled={instagramConnected ? true : false}
                  >
                    <span className="ms-2">
                      {instagramConnected ? "Connected" : "Connect"}
                    </span>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img
                      className="img-avatar"
                      src={"/assets/images/youtube.png"}
                      alt=""
                    />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">
                      Youtube
                    </span>
                  </div>
                  <button
                    className="cursor-pointer btn btn-success"
                    onClick={(e) => {
                      this.handleConnectChannel("youtube");
                    }}
                    disabled={youtubeConnected ? true : false}
                  >
                    <span className="ms-2">
                      {youtubeConnected ? "Connected" : "Connect"}
                    </span>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img
                      className="img-avatar"
                      src={"/assets/images/twitter.png"}
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
                      src={"/assets/images/linkedin.png"}
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
                    <span className="ms-2">
                      {linkedinConnected ? "Connected" : "Connect"}
                    </span>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img
                      className="img-avatar"
                      src={"/assets/images/tumblr.png"}
                      alt=""
                    />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">
                      Tumblr
                    </span>
                  </div>
                  <button
                    className="cursor-pointer btn btn-success"
                    onClick={(e) => {
                      this.handleConnectChannel("tumblr");
                    }}
                    disabled={tumblrConnected ? true : false}
                  >
                    <span className="ms-2">
                      {tumblrConnected ? "Connected" : "Connect"}
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
                      src={"/assets/images/wordpress.png"}
                      alt=""
                    />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">
                      Wordpress
                    </span>
                  </div>
                  <ButtonConnect
                    onClick={(e) => {
                      this.props.setChannelType(CHANNEL_CMS_WORDPRESS);
                      this.props.handleModalCms("wordpress");
                    }}
                    isDisabled={wordpressConnected}
                    isConnected={wordpressConnected}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img
                      className="img-avatar"
                      src={"/assets/images/drupal.png"}
                      alt=""
                    />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">
                      Drupal
                    </span>
                  </div>
                  <ButtonConnect
                    onClick={(e) => {
                      this.props.setChannelType(CHANNEL_CMS_DRUPAL);
                      this.props.handleModalCms("drupal");
                    }}
                    isDisabled={drupalConnected}
                    isConnected={drupalConnected}
                  />
                </div>
              </div>
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img
                      className="img-avatar"
                      src={"/assets/images/medium.png"}
                      alt=""
                    />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">
                      Medium
                    </span>
                  </div>
                  <ButtonConnect
                    onClick={(e) => {
                      this.props.setChannelType(CHANNEL_CMS_MEDIUM);
                      this.props.handleModalCms("medium");
                    }}
                    isDisabled={mediumConnected}
                    isConnected={mediumConnected}
                  />
                </div>
              </div>
              <LoginChannelCMSFormModal
                handleModalCms={handleModalCms}
                loginCMSChannelFormModalViewModel={
                  this.loginCMSChannelFormModalViewModel
                }
                isModalCms={isModalCms}
              />
            </div>
          </Tab>
          <Tab eventKey={3} title={"Email Marketing"}>
            <div className="mt-4">
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img
                      className="img-avatar"
                      src={"/assets/images/mailchimp.png"}
                      alt=""
                    />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">
                      Mailchimp
                    </span>
                  </div>
                  <button
                    className="cursor-pointer btn btn-success"
                    onClick={(e) => {
                      this.handleConnectChannel("mailchimp");
                    }}
                    disabled={mailchimpConnected ? true : false}
                  >
                    <span className="ms-2">
                      {mailchimpConnected ? "Connected" : "Connect"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>

        <ModalComponent
          show={this.props.mustUpgrade}
          onHide={this.closeModalUpgrade}
          header={"Please upgrade account"}
          body={<Upgrade></Upgrade>}
          key={Math.random(40, 200)}
        />
      </div>
    );
  }
}

export default ComponentConnectaChannel;
