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

      this.state = {
        channels: [],
        showModal: true,
        getIDSFanpage: [],
        isWordpressConnected: false,
        organizationID: 777,
      };
    }

    checkConnectedCMS = (cmsName, isConnected) => {
      if (cmsName == "wordpress") {
        this.setState({
          isWordpressConnected: isConnected,
        });

        this.channelsListViewModel.wordpressConnected = isConnected;
      }
    };

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
        this.state.organizationID,
        this.state.getIDSFanpage
      );

      this.setState({
        showModal: false,
      });
    };

    render() {
      let { showModal } = this.state;

      const {
        listFaceBookFanpage,
        listFaceBookFanpageView,
        facebookConnected,
        twitterConnected,
        linkedinConnected,
        mailchimpConnected,
        instagramConnected,
        wordpressConnected,
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
              twitterConnected={twitterConnected}
              linkedinConnected={linkedinConnected}
              mailchimpConnected={mailchimpConnected}
              instagramConnected={instagramConnected}
              wordpressConnected={wordpressConnected}
              viewModel={this.viewModel}
              organizationID={this.state.organizationID}
              checkConnectedCMS={this.checkConnectedCMS}
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
