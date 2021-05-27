import React, { Component } from 'react';

import { Image, Tab, Tabs } from 'react-bootstrap';
import { observer } from 'mobx-react';

import Button from '../../../components/Button';
import ModalComponent from '../../../components/Modal';
import history from '../../../routes/history';

import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import ButtonNormal from '../../../components/ButtonNormal';
import ComponentConnectaChannel from '../../../components/ComponentConnectaChannel';
import { withWizardViewModel } from '../WizardViewModels/WizardViewModelContextProvider';
import Checkbox from '../../../components/Checkbox';
import ComponentItemFanpage from '../../../components/ComponentItemFanpage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

import WizardSteps from '../../../components/WizardSteps';
import styles from './index.module.scss';
import { notify } from '../../../components/Toast';
import PAGE_STATUS from '../../../constants/PageStatus';
import { CHANNEL_ADS_GOOGLE } from '../../../constants/ChannelModule';

const ConnectChannel = observer(
  class ConnectChannel extends Component {
    channelsListViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log('viewModel - Debug View Model');
      console.log(viewModel);

      this.viewModel = viewModel ? viewModel : null;

      this.channelsListViewModel = viewModel ? viewModel.getChannelsListViewModel() : null;

      console.log('this.channelsListViewModel - Debug View Model');

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

      this.channelsListViewModel.checkConnectedChannels([
        'linkedin',
        'youtube',
        'twitter',
        'instagram',
        'facebook',
        'mailchimp',
        'wordpress',
        'tumblr',
        'drupal',
        'medium',
        'joomla',
        'fbad',
        CHANNEL_ADS_GOOGLE,
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

    handleSaveFanpage = () => {
      this.channelsListViewModel.saveChosseFacebookFanpages(this.state.getIDSFanpage);

      this.setState({
        showModal: false,
      });
    };

    handleSaveAdsAccount = () => {
      this.channelsListViewModel.saveChosseFacebookAdAccount(this.state.getIDSAdAccount);

      this.setState({
        showModal: false,
      });
    };

    handleModalCms = () => {
      this.loginCMSChannelFormModalViewModel.openModal();
    };

    handleConnectedFanpage = (channelType, id) => {
      if (this.channelsListViewModel.listFacebookFanpageConnected.indexOf(id) > -1) {
        this.channelsListViewModel.disconnectAFacebookPage(channelType, id);
      } else {
        this.channelsListViewModel.connectAFacebookPage(channelType, id);
      }
    };

    onSuccessGoogleConnect = (res) => {
      let dataAccessToken = {
        profileObject: res.profileObj,
        tokenObject: res.tokenObj,
        status: 'connected',
      };

      this.channelsListViewModel.onSuccessConnect(JSON.stringify(dataAccessToken), 'google_ads');
    };

    onRequestGoogleConnect = (req, res) => {};

    onSuccessFacebookConnect = (response) => {
      console.log('onSuccessFacebookConnect');

      window.FB.api('me/accounts', (response) => {
        if (response) {
          const connected = response.data.map((item) => item.id);
          const dataAccessToken = {
            pages: response.data,
            connected: connected,
            status: 'connected',
          };

          this.channelsListViewModel.onSuccessConnect(JSON.stringify(dataAccessToken), 'facebook');
        }
      });
    };

    onSuccessYoutubeConnect = (res) => {
      let dataAccessToken = {
        profileObject: res.profileObj,
        tokenObject: res.tokenObj,
        status: 'connected',
      };

      this.channelsListViewModel.onSuccessConnect(JSON.stringify(dataAccessToken), 'youtube');
    };

    onSuccessInstagramConnect = () => {
      window.FB.api('me/accounts', (response) => {
        if (response) {
          const connected = response.data.map((item) => item.id);
          const dataAccessToken = {
            pages: response.data,
            connected: connected,
            status: 'connected',
          };

          this.channelsListViewModel.onSuccessConnect(JSON.stringify(dataAccessToken), 'instagram');
        }
      });
    };

    onFailureConnectChannels = (err) => {
      console.log('hung test');
    };

    next = () => {
      const {
        facebookConnected,
        facebookAdsConnected,
        youtubeConnected,
        twitterConnected,
        linkedinConnected,
        mailchimpConnected,
        instagramConnected,
        wordpressConnected,
        tumblrConnected,
        drupalConnected,
        joomlaConnected,
        mediumConnected,
        googleadsConnected,
      } = this.channelsListViewModel;

      if (
        facebookConnected == true ||
        facebookAdsConnected == true ||
        youtubeConnected == true ||
        twitterConnected == true ||
        linkedinConnected == true ||
        mailchimpConnected == true ||
        instagramConnected == true ||
        wordpressConnected == true ||
        tumblrConnected == true ||
        drupalConnected == true ||
        joomlaConnected == true ||
        mediumConnected == true ||
        googleadsConnected == true
      ) {
        history.push(`${history.location.pathname}/content`);
      } else {
        notify('Please choose an connect channel');
      }
    };

    render() {
      let { showModal } = this.state;

      const {
        listFaceBookFanpage,
        listFaceBookFanpageView,
        listFacebookFanpageConnected,
        facebookConnected,
        listFacebookAdsAccount,
        listFacebookAdsAccountView,
        facebookAdsConnected,
        youtubeConnected,
        twitterConnected,
        linkedinConnected,
        mailchimpConnected,
        instagramConnected,
        tumblrConnected,
        wordpressConnected,
        mustUpgrade,
        drupalConnected,
        mediumConnected,
        joomlaConnected,
        googleadsConnected,
        advertisingFeaturesMasterData,
        cmsFeaturesMasterData,
        socialMediaFeaturesMasterData,
        emailMarketingFeaturesMasterData,
        countCMSConnected,
        countAdvertisingConnected,
        countEmailMarketingConnected,
        countSocialMediaConnected,
        getIdActionFacebookFange,

        ConnectStatusFanpage,
      } = this.channelsListViewModel;

      return (
        <div className="d-flex flex-column m-4 p-4">
          <div>
            <ComponentConnectaChannel
              channelsListViewModel={this.channelsListViewModel}
              listFaceBookFanpageView={listFaceBookFanpageView ? listFaceBookFanpageView : null}
              listFacebookFanpageConnected={
                listFacebookFanpageConnected ? listFacebookFanpageConnected : null
              }
              facebookConnected={facebookConnected}
              listFacebookAdsAccountView={
                listFacebookAdsAccountView ? listFacebookAdsAccountView : null
              }
              facebookAdsConnected={facebookAdsConnected}
              youtubeConnected={youtubeConnected}
              twitterConnected={twitterConnected}
              linkedinConnected={linkedinConnected}
              mailchimpConnected={mailchimpConnected}
              instagramConnected={instagramConnected}
              wordpressConnected={wordpressConnected}
              tumblrConnected={tumblrConnected}
              mustUpgrade={mustUpgrade}
              drupalConnected={drupalConnected}
              mediumConnected={mediumConnected}
              joomlaConnected={joomlaConnected}
              advertisingFeaturesMasterData={advertisingFeaturesMasterData}
              googleadsConnected={googleadsConnected}
              cmsFeaturesMasterData={cmsFeaturesMasterData}
              socialMediaFeaturesMasterData={socialMediaFeaturesMasterData}
              emailMarketingFeaturesMasterData={emailMarketingFeaturesMasterData}
              countCMSConnected={countCMSConnected}
              countAdvertisingConnected={countAdvertisingConnected}
              countEmailMarketingConnected={countEmailMarketingConnected}
              countSocialMediaConnected={countSocialMediaConnected}
              getIdActionFacebookFange={getIdActionFacebookFange ? getIdActionFacebookFange : null}
              viewModel={this.viewModel}
              handleModalCms={this.handleModalCms}
              isModalCms={this.loginCMSChannelFormModalViewModel.show}
              ConnectStatusFanpage={ConnectStatusFanpage}
              handleConnectedFanpage={this.handleConnectedFanpage}
              PAGE_STATUS={PAGE_STATUS}
              onSuccessGoogleConnect={this.onSuccessGoogleConnect}
              onRequestGoogleConnect={this.onRequestGoogleConnect}
              onSuccessFacebookConnect={this.onSuccessFacebookConnect}
              onSuccessYoutubeConnect={this.onSuccessYoutubeConnect}
              onSuccessInstagramConnect={this.onSuccessInstagramConnect}
              onFailureConnectChannels={this.onFailureConnectChannels}
            />
          </div>
          {/* {listFaceBookFanpage && (
            <ModalComponent
              header={'Facebook Fanpage'}
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
                <button onClick={this.handleSaveFanpage} className="btn btn-success w-100">
                  <span>Save</span>
                  <i className="ms-1">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </i>
                </button>
              }
            />
          )} */}
          {listFacebookAdsAccount && (
            <ModalComponent
              header={'Facebook Ads'}
              body={
                <div>
                  <ul className="list-unstyled align-items-center">
                    {listFacebookAdsAccount &&
                      listFacebookAdsAccount.map((value, key) => {
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
              show={showModal}
              onHide={this.handleCloseModal}
              footer={
                <button onClick={this.handleSaveAdsAccount} className="btn btn-success w-100">
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
