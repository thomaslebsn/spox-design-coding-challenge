import React, { Component, lazy } from "react";
import { observer } from "mobx-react";
import PAGE_STATUS from "../../../constants/PageStatus";
import { withChannelsViewModel } from "../ChannelsViewModels/ChannelsViewModelContextProvider";
import Spinner from "../../../components/Spinner";
import ComponentConnectaChannel from "../../../components/ComponentConnectaChannel";
import ModalComponent from "../../../components/Modal";
import ComponentItemFanpage from "../../../components/ComponentItemFanpage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

const ConnectChannels = observer(
  class ConnectChannels extends Component {
    channelsListViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel } = props;
      console.log("ChannelsList - Debug View Model");
      console.log(viewModel);

      this.viewModel = viewModel;

      this.channelsListViewModel = viewModel
        ? viewModel.getChannelsListViewModel()
        : null;

      console.log("this.channelsListViewModel - Debug View Model");
      console.log(this.channelsListViewModel);
      console.log("this.channelsListViewModel.mustUpgrade 1111");
      console.log(
        this.channelsListViewModel
          ? this.channelsListViewModel.mustUpgrade
          : false
      );

      this.loginCMSChannelFormModalViewModel = viewModel
        ? viewModel.getLoginCMSChannelFormModalViewModel()
        : null;

      this.state = {
        channels: [],
        showModal: true,
        getIDSFanpage: [],
        isWordpressConnected: false,
      };

      //call check connected channels

      this.channelsListViewModel.checkConnectedChannels([
        "linkedin",
        "youtube",
        "twitter",
        "instagram",
        "facebook",
        "mailchimp",
        "wordpress",
        "tumblr",
        "drupal",
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

    setChannelType = (type) => {
      this.loginCMSChannelFormModalViewModel.setChannelType(type);
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
        tumblrConnected,
        wordpressConnected,
        mustUpgrade,
        drupalConneted,
      } = this.channelsListViewModel;

      return (
        <div className="py-4 px-3">
          <h2 className="text-blue-0 mb-4">Connect a Channel</h2>
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
              tumblrConnected={tumblrConnected}
              wordpressConnected={wordpressConnected}
              mustUpgrade={mustUpgrade}
              drupalConneted={drupalConneted}
              viewModel={this.viewModel}
              handleModalCms={this.handleModalCms}
              isModalCms={this.loginCMSChannelFormModalViewModel.show}
              setChannelType={this.setChannelType}
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
        </div>
      );
    }
  }
);

export default withChannelsViewModel(ConnectChannels);
