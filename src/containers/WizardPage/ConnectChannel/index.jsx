import React, { Component } from "react";

import { Image, Tab, Tabs } from "react-bootstrap";
import { observer } from "mobx-react";

import Button from "../../../components/Button";
import ModalComponent from "../../../components/Modal";
import history from "../../../routes/history";

import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import ButtonNormal from "../../../components/ButtonNormal";
import ComponentConnectaChannel from "../../../components/ComponentConnectaChannel";
import { withWizardViewModel } from "../WizardViewModels/WizardViewModelContextProvider";
import Checkbox from "../../../components/Checkbox";
import ComponentItemFanpage from "../../../components/ComponentItemFanpage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

import WizardSteps from "../../../components/WizardSteps";
import styles from "./index.module.scss";
import { notify } from "../../../components/Toast";

const ConnectChannel = observer(
  class ConnectChannel extends Component {
    channelsListViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("viewModel - Debug View Model");
      console.log(viewModel);

      this.viewModel = viewModel ? viewModel : null;

      this.channelsListViewModel = viewModel
        ? viewModel.getChannelsListViewModel()
        : null;

      console.log("this.channelsListViewModel - Debug View Model");
      console.log(this.channelsListViewModel);

      this.loginCMSChannelFormModalViewModel = viewModel
        ? viewModel.getLoginCMSChannelFormModalViewModel()
        : null;

      this.state = {
        channels: [],
        showModal: true,
        getIDSFanpage: [],
        isWordpressConnected: false,
        organizationID: 1,
      };

      this.channelsListViewModel.checkConnectedChannels([
        "linkedin",
        "youtube",
        "twitter",
        "instagram",
        "facebook",
        "mailchimp",
        "wordpress",
        "tumblr",
      ]);
    }

    handleCheckbox = (id) => {
      let getIDSFanpage = this.state.getIDSFanpage;
      getIDSFanpage.push(id);

      this.setState({
        getIDFanpage: getIDSFanpage,
      });
    };

    handleCloseModal = () => {
      this.setState({
        showModal: false,
      });
    };

    handleSaveFanpage = () => {
      this.channelsListViewModel.saveChosseFacebookFanpages(
        this.state.getIDSFanpage
      );

      this.setState({
        showModal: false,
      });
    };

    handleModalCms = () => {
      this.loginCMSChannelFormModalViewModel.openModal();
    };

    next = () => {
      const {
        facebookConnected,
        youtubeConnected,
        twitterConnected,
        linkedinConnected,
        mailchimpConnected,
        instagramConnected,
        wordpressConnected,
        tumblrConnected,
      } = this.channelsListViewModel;

      if (
        facebookConnected == true ||
        youtubeConnected == true ||
        twitterConnected == true ||
        linkedinConnected == true ||
        mailchimpConnected == true ||
        instagramConnected == true ||
        wordpressConnected == true ||
        tumblrConnected == true
      ) {
        history.push(`${history.location.pathname}/content`);
      } else {
        notify("Please choose an connect channel");
      }
    };

    render() {
      let { showModal } = this.state;

      const {
        listFaceBookFanpage,
        listFaceBookFanpageView,
        facebookConnected,
        youtubeConnected,
        twitterConnected,
        linkedinConnected,
        mailchimpConnected,
        instagramConnected,
        wordpressConnected,
        tumblrConnected,
        mustUpgrade,
      } = this.channelsListViewModel;

      return (
        <div className="d-flex flex-column m-4 p-4">
          <div>
            <ComponentConnectaChannel
              channelsListViewModel={this.channelsListViewModel}
              listFaceBookFanpageView={
                listFaceBookFanpageView ? listFaceBookFanpageView : null
              }
              facebookConnected={facebookConnected}
              youtubeConnected={youtubeConnected}
              twitterConnected={twitterConnected}
              linkedinConnected={linkedinConnected}
              mailchimpConnected={mailchimpConnected}
              instagramConnected={instagramConnected}
              wordpressConnected={wordpressConnected}
              tumblrConnected={tumblrConnected}
              mustUpgrade={mustUpgrade}
              viewModel={this.viewModel}
              organizationID={this.state.organizationID}
              handleModalCms={this.handleModalCms}
              isModalCms={this.loginCMSChannelFormModalViewModel.show}
            />
          </div>
          {listFaceBookFanpage && (
            <ModalComponent
              header={"Facebook Fanpage"}
              body={
                <div>
                  <ul className="list-unstyled align-items-center">
                    {listFaceBookFanpage &&
                      listFaceBookFanpage.map((value, key) => {
                        return (
                          <ComponentItemFanpage
                            key={key}
                            name={value.name}
                            handleCheckbox={(e) => {
                              this.handleCheckbox(value.id);
                            }}
                          />
                        );
                      })}
                  </ul>
                </div>
              }
              show={showModal}
              onHide={this.handleCloseModal}
              footer={
                <button
                  onClick={this.handleSaveFanpage}
                  className="btn btn-success w-100"
                >
                  <span>Save</span>
                  <i className="ms-1">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </i>
                </button>
              }
            />
          )}
          <div className="d-flex justify-content-end">
            {/* <Button
              className="btn btn-light border-success"
              onClick={() => this.props.goToStep(1)}
              text="Back"
            /> */}

            <ButtonNormal
              className="btn btn-success"
              text="Next"
              onClick={(e) => this.next()}
            ></ButtonNormal>
          </div>
        </div>
      );
    }
  }
);

export default withWizardViewModel(ConnectChannel);
