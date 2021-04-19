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
        showModalFbad: true,
        getIDSFanpage: [],
        getIDSAdAccount: [],
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
        "medium",
        "joomla",
        "fbad"
      ]);
    }

    handleCheckbox = (id) => {
      let getIDSFanpage = this.state.getIDSFanpage;
      getIDSFanpage.push(id);

      this.setState({
        getIDFanpage: getIDSFanpage,
      });
    };

      handleCheckboxAdAccounts = (id) => {
          let getIDSAdAccount = this.state.getIDSAdAccount;
          getIDSAdAccount.push(id);

          this.setState({
              getIDSAdAccount: getIDSAdAccount,
          });
      };

    handleCloseModal = () => {
      this.setState({
        showModal: false,
      });
    };

      handleCloseModalFbad = () => {
          this.setState({
              showModalFbad: false,
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

    handleSaveAdsAccount = () => {
        this.channelsListViewModel.saveChosseFacebookAdAccount(
            this.state.getIDSAdAccount
        );

        this.setState({
            showModalFbad: false,
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
        listFacebookAdsAcount,
        listFaceBookAdsAccountView,
        facebookAdsConnected,
        youtubeConnected,
        twitterConnected,
        linkedinConnected,
        mailchimpConnected,
        instagramConnected,
        tumblrConnected,
        wordpressConnected,
        mustUpgrade,
        drupalConneted,
        mediumConnected,
        joomlaConnected,
      } = this.channelsListViewModel;

      console.log('this.channelsListViewModel', this.channelsListViewModel)

      return (
        <div className="py-4 px-3">
          <h2 className="text-blue-0 mb-4">Connect a Channel</h2>
          <div>
            <ComponentConnectaChannel
              channelsListViewModel={this.channelsListViewModel}
              listFaceBookFanpageView={
                listFaceBookFanpageView ? listFaceBookFanpageView : null
              }
              listFaceBookAdsAccountView={
                  listFaceBookAdsAccountView ? listFaceBookAdsAccountView : null
              }
              facebookConnected={facebookConnected}
              facebookAdsConnected={facebookAdsConnected}
              youtubeConnected={youtubeConnected}
              twitterConnected={twitterConnected}
              linkedinConnected={linkedinConnected}
              mailchimpConnected={mailchimpConnected}
              instagramConnected={instagramConnected}
              tumblrConnected={tumblrConnected}
              wordpressConnected={wordpressConnected}
              mustUpgrade={mustUpgrade}
              drupalConneted={drupalConneted}
              mediumConnected={mediumConnected}
              joomlaConnected={joomlaConnected}
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
            {console.log('Debug listFaceBookAdsAccountView', listFaceBookAdsAccountView)}
            {listFacebookAdsAcount && (
                <ModalComponent
                    header={"Facebook Ad Accounts"}
                    body={
                        <div>
                            <ul className="list-unstyled align-items-center">
                                {listFacebookAdsAcount &&
                                listFacebookAdsAcount.map((value, key) => {
                                    return (
                                        <ComponentItemFanpage
                                            key={key}
                                            name={value.name}
                                            handleCheckbox={(e) => {
                                                this.handleCheckboxAdAccounts(value.id);
                                            }}
                                        />
                                    );
                                })}
                            </ul>
                        </div>
                    }
                    show={this.state.showModalFbad}
                    onHide={this.handleCloseModalFbad}
                    footer={
                        <button
                            onClick={this.handleSaveAdsAccount}
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
