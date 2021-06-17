import React, { Component, lazy } from 'react';
import { Tab, Tabs, Spinner } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';

import LoginChannelCMSFormModal from '../../containers/ChannelsPage/LoginChannelCMSForm/LoginChannelCMSFormModal';
import styles from './index.module.scss';
import './index.scss';
import Upgrade from '../Upgrade';
import ButtonConnect from '../ButtonConnect';
import ButtonUpgrade from '../ButtonUpgrade';
import ButtonConnectGoogle from '../ButtonConnectGoogle';
import ButtonConnectFacebook from '../ButtonConnectFacebook';
import {
  CHANNEL_ADS_GOOGLE,
  CHANNEL_CMS_DRUPAL,
  CHANNEL_CMS_JOOMLA,
  CHANNEL_CMS_MEDIUM,
  CHANNEL_CMS_WORDPRESS,
} from '../../constants/ChannelModule';
import { EASII_CONFIGS } from 'easii-io-web-service-library';
import ButtonConnectInstagram from '../ButtonConnectInstagram';

const ModalComponent = lazy(() => import('../../components/Modal'));
class ComponentConnectaChannel extends Component {
  formData = [];
  channelsListViewModel = null;
  constructor(props) {
    super(props);

    this.channelsListViewModel = this.props.channelsListViewModel;

    let { viewModel } = this.props;

    this.loginCMSChannelFormModalViewModel = viewModel
      ? viewModel.getLoginCMSChannelFormModalViewModel()
      : null;

    this.state = {
      panelIndex: '',
      isShowModalWordpress: false,
      showModalCms: false,
    };
  }

  closeModal = () => {
    this.setState({
      isShowModalWordpress: false,
    });
  };

  isAllowedConnectAdvertising = (channelType) => {
    console.log('isAllowedConnectAdvertising');
    const advertisingMasterData = this.props.advertisingFeaturesMasterData;

    if (!advertisingMasterData) {
      return false;
    }

    const featureChannel = this.getFeatureByChannelType(advertisingMasterData, channelType);

    return featureChannel.enable === 1;
  };

  isAllowedConnectChannel = (channelType, groupType) => {
    if (!EASII_CONFIGS.ENABLE_PRICING_PLAN) {
      return true;
    }

    switch (groupType) {
      case 'social_media':
        const { socialMediaFeaturesMasterData, countSocialMediaConnected } = this.props;
        return this.isAllowedConnectByChannelType(
          channelType,
          socialMediaFeaturesMasterData,
          countSocialMediaConnected
        );
      case 'cms':
        const { cmsFeaturesMasterData, countCMSConnected } = this.props;
        return this.isAllowedConnectByChannelType(
          channelType,
          cmsFeaturesMasterData,
          countCMSConnected
        );
      case 'advertising':
        const { advertisingFeaturesMasterData, countAdvertisingConnected } = this.props;
        console.log('advertisingFeaturesMasterData');
        console.log(advertisingFeaturesMasterData);
        return this.isAllowedConnectByChannelType(
          channelType,
          advertisingFeaturesMasterData,
          countAdvertisingConnected
        );
      case 'email_marketing':
        const { emailMarketingFeaturesMasterData, countEmailMarketingConnected } = this.props;
        console.log('emailMarketingFeaturesMasterData', emailMarketingFeaturesMasterData);
        return this.isAllowedConnectByChannelType(
          channelType,
          emailMarketingFeaturesMasterData,
          countEmailMarketingConnected
        );
      default:
        return true;
    }
  };

  getFeatureByChannelType = (featureMasterData, channelType) => {
    let result = featureMasterData.filter((obj) => {
      return obj.feature_slug === channelType;
    });

    if (result) {
      return result[0];
    }

    return false;
  };

  isAllowedConnectByChannelType = (
    channelType,
    featuresChannelMasterData,
    countConnectedChannel
  ) => {
    if (!featuresChannelMasterData) {
      return false;
    }

    console.log(featuresChannelMasterData);
    const featureChannel = this.getFeatureByChannelType(featuresChannelMasterData, channelType);

    return (
      featureChannel.enable === 1 &&
      (!featureChannel.option || featureChannel.option > countConnectedChannel)
    );
  };

  handleConnectChannel = (name, isConnected = true) => {
    let { channelsListViewModel } = this.props;

    if (isConnected) {
      channelsListViewModel.connectLoginUrl(name);
    } else {
      channelsListViewModel.disConnectChannel(name);
    }
  };

  closeModalUpgrade = () => {
    this.props.channelsListViewModel.mustUpgrade = false;
  };

  render() {
    console.log('============ Before Render ================');
    console.log(this.props);
    const {
      channelsListViewModel,
      listFaceBookFanpageView,
      facebookConnected,
      listFacebookAdsAccountView,
      facebookAdsConnected,
      youtubeConnected,
      twitterConnected,
      linkedinConnected,
      mailchimpConnected,
      instagramConnected,
      tumblrConnected,
      mediumConnected,
      joomlaConnected,
      handleModalCms,
      isModalCms,
      googleadsConnected,
      drupalConnected,
      wordpressConnected,
      listFacebookFanpageConnected,
      getIdActionFacebookFange,
      ConnectStatusFanpage,
      PAGE_STATUS,
      onSuccessFacebookConnect,
      onSuccessYoutubeConnect,
      onSuccessInstagramConnect,
      onFailureConnectChannels,
      onSuccessGoogleMyBusinessConnect,
      googleMyBusinessConnected,
      listLinkedinFanpageView,
      listLinkedinFanpageConnected,
    } = this.props;

    let converListLinkedinFanpageConnected = '';

    // if(listLinkedinFanpageConnected) {
    //   if(typeof listLinkedinFanpageConnected  == 'object') {
    //     converListLinkedinFanpageConnected = Object.values(listLinkedinFanpageConnected)
    //   } else {
    //     converListLinkedinFanpageConnected = listLinkedinFanpageConnected
    //   }
    // }

    return (
      <div className="wrapper_tabs">
        <Tabs defaultActiveKey="1" id="connectContent-tab" className="bg-white border-0">
          <Tab eventKey={1} title={'Social Media'}>
            <div className="mt-4">
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/facebook.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Facebook</span>
                  </div>
                  {/* <ButtonConnectFacebook
                    scope="public_profile,pages_show_list,pages_manage_posts,pages_read_engagement,read_insights"
                    onFacebookSuccess={onSuccessFacebookConnect}
                    onFacebookFailure={onFailureConnectChannels}
                    buttonText={facebookConnected ? 'Connected' : 'Connect'}
                    isDisable={facebookConnected ? true : false}
                    appId="831779357771114"
                  /> */}
                  <button
                    className="cursor-pointer btn btn-success"
                    onClick={(e) => {
                      this.handleConnectChannel('facebook', !facebookConnected);
                    }}
                  >
                    <span className="ms-2">{facebookConnected ? 'Disconnect' : 'Connect'}</span>
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
                          console.log('valuevaluevaluefacebook');
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
                              <div className="col-6 text-end">
                                <button
                                  type="button"
                                  className="cursor-pointer btn btn-success ct_btn_connect"
                                  onClick={(e) => {
                                    this.props.handleConnectedFanpage('facebook', value.id);
                                  }}
                                >
                                  <span>
                                    {listFacebookFanpageConnected &&
                                    listFacebookFanpageConnected.indexOf(value.id) > -1
                                      ? 'Disconnect'
                                      : 'Connect'}
                                  </span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/instagram.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Instagram</span>
                  </div>
                  {instagramConnected ||
                  this.isAllowedConnectChannel('instagram', 'social_media') ? (
                    <ButtonConnectInstagram
                      scope="public_profile,email"
                      onInstagramSuccess={onSuccessInstagramConnect}
                      onInstagramFailure={onFailureConnectChannels}
                      buttonText={instagramConnected ? 'Connected' : 'Connect'}
                      isDisable={instagramConnected ? true : false}
                    />
                  ) : (
                    <ButtonUpgrade />
                  )}
                </div>
              </div> */}
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/youtube.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Youtube</span>
                  </div>
                  {/* {youtubeConnected || this.isAllowedConnectChannel('youtube', 'social_media') ? (
                    <ButtonConnectGoogle
                      scope="https://www.googleapis.com/auth/youtube.upload"
                      clientId="854265047007-t7a1g164i7qga65751b0c2fronquf77u.apps.googleusercontent.com"
                      onSuccess={onSuccessYoutubeConnect}
                      onFailure={onFailureConnectChannels}
                      isDisabled={youtubeConnected ? true : false}
                      buttonText={youtubeConnected ? 'Connected' : 'Connect'}
                      className="cursor-pointer btn btn-success"
                    />
                  ) : (
                    <ButtonUpgrade />
                  )} */}

                  {youtubeConnected || this.isAllowedConnectChannel('youtube', 'social_media') ? (
                    <button
                      className="cursor-pointer btn btn-success"
                      onClick={(e) => {
                        this.handleConnectChannel('youtube', !youtubeConnected);
                      }}
                    >
                      <span className="ms-2">{youtubeConnected ? 'Disconnect' : 'Connect'}</span>
                    </button>
                  ) : (
                    <ButtonUpgrade />
                  )}
                </div>
              </div>
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/twitter.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Twitter</span>
                  </div>
                  {twitterConnected || this.isAllowedConnectChannel('twitter', 'social_media') ? (
                    <button
                      className="cursor-pointer btn btn-success"
                      onClick={(e) => {
                        this.handleConnectChannel('twitter', !twitterConnected);
                      }}
                    >
                      <span className="ms-2">{twitterConnected ? 'Disconnect' : 'Connect'}</span>
                    </button>
                  ) : (
                    <ButtonUpgrade />
                  )}
                </div>
              </div>
              {/* <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img
                      className="img-avatar"
                      src={'/assets/images/google_my_business.png'}
                      alt=""
                    />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">
                      Google My Business
                    </span>
                  </div>
                  {googleMyBusinessConnected ||
                  this.isAllowedConnectChannel('google_my_business', 'social_media') ? (
                    <ButtonConnectGoogle
                      scope="https://www.googleapis.com/auth/business"
                      clientId="151929621109-q2l0ik8hm63mrov7l1ccrkhht2ae2i96.apps.googleusercontent.com"
                      onSuccess={onSuccessGoogleMyBusinessConnect}
                      onFailure={onFailureConnectChannels}
                      isDisabled={googleMyBusinessConnected}
                      buttonText={googleMyBusinessConnected ? 'Connected' : 'Connect'}
                      className="cursor-pointer btn btn-success"
                    />
                  ) : (
                    <ButtonUpgrade />
                  )}
                </div>
              </div> */}
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/linkedin.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Linkedin</span>
                  </div>
                  {linkedinConnected || this.isAllowedConnectChannel('linkedIn', 'social_media') ? (
                    <button
                      className="cursor-pointer btn btn-success"
                      onClick={(e) => {
                        this.handleConnectChannel('linkedin', !linkedinConnected);
                      }}
                    >
                      <span className="ms-2">{linkedinConnected ? 'Disconnect' : 'Connect'}</span>
                    </button>
                  ) : (
                    <ButtonUpgrade />
                  )}
                </div>
                {listLinkedinFanpageView && (
                  <div className="p-3">
                    <div className={`list_content`}>
                      <div className="py-2 px-3 bg-blue d-flex rounded-2">
                        <div className="col-4">Name</div>
                        <div className="col-6 text-end">Action</div>
                      </div>
                      <div className={`list_main `}>
                        {Object.values(listLinkedinFanpageView).map((value, key) => {
                          console.log('valuevaluevaluelinkedin');
                          console.log(value.id);
                          return (
                            <div
                              key={key}
                              className={`item_accordion ${styles.item_accordion} p-3 border-bottom-1 d-flex align-items-center`}
                            >
                              <div className="col-4">
                                <div className="d-flex align-items-center">
                                  <span className="ms-2">{value.localizedName}</span>
                                </div>
                              </div>
                              <div className="col-6 text-end">
                                <button
                                  type="button"
                                  className="cursor-pointer btn btn-success ct_btn_connect"
                                  onClick={(e) => {
                                    this.props.handleConnectedFanpage(
                                      'linkedin',
                                      value.id.toString()
                                    );
                                  }}
                                >
                                  <span>
                                    {listLinkedinFanpageConnected &&
                                    listLinkedinFanpageConnected.indexOf(value.id.toString()) > -1
                                      ? 'Disconnect'
                                      : 'Connect'}
                                  </span>
                                </button>
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
                    <img className="img-avatar" src={'/assets/images/tumblr.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Tumblr</span>
                  </div>
                  {tumblrConnected || this.isAllowedConnectChannel('tumblr', 'social_media') ? (
                    <button
                      className="cursor-pointer btn btn-success"
                      onClick={(e) => {
                        this.handleConnectChannel('tumblr', !tumblrConnected);
                      }}
                    >
                      <span className="ms-2">{tumblrConnected ? 'Disconnect' : 'Connect'}</span>
                    </button>
                  ) : (
                    <ButtonUpgrade />
                  )}
                </div>
              </div>
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/medium.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Medium</span>
                  </div>

                  {mediumConnected ||
                  this.isAllowedConnectChannel(CHANNEL_CMS_MEDIUM, 'social_media') ? (
                    <ButtonConnect
                      onClick={(e) => {
                        this.props.handleModalCms(CHANNEL_CMS_MEDIUM, !mediumConnected);
                      }}
                      isConnected={mediumConnected}
                    />
                  ) : (
                    <ButtonUpgrade />
                  )}
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey={2} title={'Advertising'}>
            <div className="mt-4">
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/fbad.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Facebook Ads</span>
                  </div>
                  {facebookAdsConnected ||
                  this.isAllowedConnectChannel('fb_instagram_ads', 'advertising') ? (
                    <button
                      className="cursor-pointer btn btn-success"
                      onClick={(e) => {
                        this.handleConnectChannel('fbad', !facebookAdsConnected);
                      }}
                    >
                      <span className="ms-2">
                        {facebookAdsConnected ? 'Disconnect' : 'Connect'}
                      </span>
                    </button>
                  ) : (
                    <ButtonUpgrade />
                  )}
                </div>
                {listFacebookAdsAccountView && (
                  <div className="p-3">
                    <div className={`list_content`}>
                      <div className="py-2 px-3 bg-blue d-flex rounded-2">
                        <div className="col-4">Name</div>
                        <div className="col-6 text-end">Action</div>
                      </div>
                      <div className={`list_main `}>
                        {listFacebookAdsAccountView.map((value, key) => {
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
            </div>
            <div className="mt-4">
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/google_ads.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Google Adwords</span>
                  </div>
                  {/* {googleadsConnected || this.isAllowedConnectChannel('gg_ads', 'advertising') ? (
                    <ButtonConnectGoogle
                      scope="https://www.googleapis.com/auth/adwords"
                      clientId="591849916879-8gc5gct9fsgbh76hqd5lonig8c1n1666.apps.googleusercontent.com"
                      onSuccess={this.props.onSuccessGoogleConnect}
                      onFailure={onFailureConnectChannels}
                      onRequest={this.props.onRequestGoogleConnect}
                      isDisabled={googleadsConnected}
                      buttonText={googleadsConnected ? 'Connected' : 'Connect'}
                      className="cursor-pointer btn btn-success"
                    />
                  ) : (
                    <ButtonUpgrade />
                  )} */}
                  {googleadsConnected || this.isAllowedConnectChannel('gg_ads', 'advertising') ? (
                    <button
                      className="cursor-pointer btn btn-success"
                      onClick={(e) => {
                        this.handleConnectChannel(CHANNEL_ADS_GOOGLE, !googleadsConnected);
                      }}
                    >
                      <span className="ms-2">{googleadsConnected ? 'Disconnect' : 'Connect'}</span>
                    </button>
                  ) : (
                    <ButtonUpgrade />
                  )}
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey={3} title={'CMS'}>
            <div className="mt-4">
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/wordpress.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Wordpress</span>
                  </div>
                  {/* {wordpressConnected || this.isAllowedConnectChannel(CHANNEL_CMS_WORDPRESS, 'cms') ? () : (<ButtonUpgrade/>)} */}
                  {wordpressConnected ||
                  this.isAllowedConnectChannel(CHANNEL_CMS_WORDPRESS, 'cms') ? (
                    <ButtonConnect
                      onClick={(e) => {
                        this.props.handleModalCms(CHANNEL_CMS_WORDPRESS, !wordpressConnected);
                      }}
                      isConnected={wordpressConnected}
                    />
                  ) : (
                    <ButtonUpgrade />
                  )}
                </div>
                {/* <div className="text-end d-flex justify-content-end w-100 pb-3 pe-3 mt-3">
                  <a
                    href="https://wordpress.org/latest.zip"
                    download
                    className="py-1 px-3 bg-green d-flex"
                  >
                    <i className="text-white">
                      <FontAwesomeIcon icon={faDownload} />
                    </i>
                    <span className="text-white ps-2">Download Wordpress</span>
                  </a>
                </div> */}
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/drupal.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Drupal</span>
                  </div>
                  {drupalConnected || this.isAllowedConnectChannel(CHANNEL_CMS_DRUPAL, 'cms') ? (
                    <ButtonConnect
                      onClick={(e) => {
                        this.props.handleModalCms(CHANNEL_CMS_DRUPAL, !drupalConnected);
                      }}
                      isConnected={drupalConnected}
                    />
                  ) : (
                    <ButtonUpgrade />
                  )}
                </div>
                {/* <div className="text-end d-flex justify-content-end w-100 pb-3 pe-3 mt-3">
                  <a
                    href="https://www.drupal.org/download-latest/zip"
                    download
                    className="py-1 px-3 bg-green d-flex"
                  >
                    <i className="text-white">
                      <FontAwesomeIcon icon={faDownload} />
                    </i>
                    <span className="text-white ps-2">Download Drupal</span>
                  </a>
                </div> */}
              </div>
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/joomla.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Joomla</span>
                  </div>
                  {joomlaConnected || this.isAllowedConnectChannel(CHANNEL_CMS_JOOMLA, 'cms') ? (
                    <ButtonConnect
                      onClick={(e) => {
                        this.props.handleModalCms(CHANNEL_CMS_JOOMLA, !joomlaConnected);
                      }}
                      isConnected={joomlaConnected}
                    />
                  ) : (
                    <ButtonUpgrade />
                  )}
                </div>
                {/* <div className="text-end d-flex justify-content-end w-100 pb-3 pe-3 mt-3">
                  <a
                    href="https://downloads.joomla.org/cms/joomla3/3-9-27/Joomla_3-9-27-Stable-Full_Package.zip?format=zip"
                    download
                    className="py-1 px-3 bg-green d-flex"
                  >
                    <i className="text-white">
                      <FontAwesomeIcon icon={faDownload} />
                    </i>
                    <span className="text-white ps-2">Download Joomla</span>
                  </a>
                </div> */}
              </div>
            </div>
          </Tab>
          <Tab eventKey={4} title={'Email Marketing'}>
            <div className="mt-4">
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/mailchimp.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Mailchimp</span>
                  </div>
                  {mailchimpConnected ||
                  this.isAllowedConnectChannel('mailchimp', 'email_marketing') ? (
                    <button
                      className="cursor-pointer btn btn-success"
                      onClick={(e) => {
                        this.handleConnectChannel('mailchimp', !mailchimpConnected);
                      }}
                    >
                      <span className="ms-2">{mailchimpConnected ? 'Disconnect' : 'Connect'}</span>
                    </button>
                  ) : (
                    <ButtonUpgrade />
                  )}
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
        <LoginChannelCMSFormModal
          handleModalCms={handleModalCms}
          loginCMSChannelFormModalViewModel={this.loginCMSChannelFormModalViewModel}
          isModalCms={isModalCms}
        />
        <ModalComponent
          show={this.props.mustUpgrade}
          onHide={this.closeModalUpgrade}
          header={'Please upgrade account'}
          body={<Upgrade></Upgrade>}
          key={Math.random(40, 200)}
        />
      </div>
    );
  }
}

export default ComponentConnectaChannel;
