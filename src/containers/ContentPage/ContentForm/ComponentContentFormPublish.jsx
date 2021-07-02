import React, { Component, lazy } from 'react';
import { Button, Accordion, Image } from 'react-bootstrap';

import { PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';
import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { CONTENT_FIELD_KEY } from '../../../constants/ContentModule';

import ButtonNormal from '../../../components/ButtonNormal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';

import SimpleReactValidator from 'simple-react-validator';

import PAGE_STATUS from '../../../constants/PageStatus';
import Spinner from '../../../components/Spinner';
import ComponentPublishListChannels from '../../../components/ComponentPublishListChannels';
import SocialMedia from './ContentFormWhenPublishThis/SocialMedia';
import ManagementSystem from './ContentFormWhenPublishThis/ManagementSystem';
import EmailMarketing from './ContentFormWhenPublishThis/EmailMarketing';
import ComponentPublishListChannelsCms from '../../../components/ComponentPublishListChannelsCms';
import ComponentPublishListChannelsEmail from '../../../components/ComponentPublishListChannelsEmail';

const ContentSetupAds = lazy(() => import('./ContentSetupAds/ContentSetupAds'));

class ComponentContentFormPublish extends Component {
  formPropsData = {};
  validator = null;
  contentConnectedChannelsViewModel = null;

  constructor(props) {
    super(props);
    this.state = {
      social: true,
      cms: true,
      email: true,
      schedule: false,
      nextStep2Ads: false,
    };

    this.validator = new SimpleReactValidator();
    this.viewModel = this.props.viewModel;

    this.handleBackGeneral = this.handleBackGeneral.bind(this);
  }

  schedule = () => {
    if (this.isFormValid()) {
      this.props.nextStep();
    }

    this.setState({
      schedule: true,
    });
  };

  post = (postType) => {
    if (this.isFormValid()) {
      console.log('this.viewModel.contentEditdata123');
      console.log(this.viewModel.contentEditdata);
      this.viewModel.post(this.viewModel.contentEditdata, postType, this.props.arrayConnectedChannelsFinal);
    }
  }

  isFormValid = () => {
    console.log('isFormValid');
    console.log(this.formPropsData);
    if (this.validator.allValid()) {
      console.log('[is Form Valid]');

      return true;
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
      return false;
    }
  };

  handleDeselect = (name) => {
    this.handleCheck(name);
  };

  handleItemCheck = (name) => {
    this.handleCheck(name);
  };

  handleNextStep2Ads = () => {
    this.setState({
      nextStep2Ads: true,
    });
  };

  handleBackGeneral = () => {
    this.props.previousStep();
    this.props.contentConnectedChannelsByOrganisationViewModel.handleBackSaveData();
    //this.props.contentConnectedChannelsByOrganisationViewModel.isBackSaveData = true;
  }

  render() {

    let { formStatus, arrayConnectedChannelsFinal, contentConnectedChannelsByOrganisationViewModel } = this.props;
    let { schedule, nextStep2Ads } = this.state;

    let labelsConnectedChannels = arrayConnectedChannelsFinal && arrayConnectedChannelsFinal.map((e) => e.des);

    let checkSetupAds =
      labelsConnectedChannels &&
      (labelsConnectedChannels.indexOf('fbad') > -1 ||
        labelsConnectedChannels.indexOf('google_ads') > -1) &&
      !schedule;

    let checkConnectSome = 
      labelsConnectedChannels.includes("facebook") ||
      labelsConnectedChannels.includes("linkedin") || 
      labelsConnectedChannels.includes("instagram") ||
      labelsConnectedChannels.includes("twitter") ||
      labelsConnectedChannels.includes("youtube") ||
      labelsConnectedChannels.includes("google_my_business") ||
      labelsConnectedChannels.includes("tumblr") || 
      labelsConnectedChannels.includes("medium")

    let checkConnectCms = 
      labelsConnectedChannels.includes("wordpress") ||
      labelsConnectedChannels.includes("drupal") || 
      labelsConnectedChannels.includes("joomla")

    return formStatus === PAGE_STATUS.LOADING ? (
      <Spinner />
    ) : (
      <div className="pe-80">
        {checkSetupAds ? (
          <div>
            <h3 className="mb-4">Setup Ads</h3>
            <div className="bg-white p-4">
              <ContentSetupAds
                labelsConnectedChannels={labelsConnectedChannels}
                FORM_FIELD_TYPE={FORM_FIELD_TYPE}
                CONTENT_FIELD_KEY={CONTENT_FIELD_KEY}
                formPropsData={this.formPropsData}
                nextStep2Ads={nextStep2Ads}
              />
            </div>
          </div>
        ) : (
          <div>
            <h3 className="mb-4">Publish</h3>
            <div className="bg-white p-4">
              <div className="row">
                <div className="col-5"></div>
                <div className="col-5">
                  <h6 className="text-blue mb-0 mb-3">When to publish this?</h6>
                </div>
              </div>
              {
                checkConnectSome && (
                  <div className="row">
                    <div className="col-5">
                      <div>
                        <ComponentPublishListChannels
                          handleDeselectAllSocial={this.props.handleDeselectAllSocial}
                          isAdvanceMode={this.props.isAdvanceMode}
                          listFacebookFanpageConnected={this.props.listFacebookFanpageConnected}
                          listLinkedinFanpageConnected={this.props.listLinkedinFanpageConnected}
                          contentConnectedChannelsByOrganisationViewModel={this.props.contentConnectedChannelsByOrganisationViewModel}
                          isDeselectAllSocial={this.props.isDeselectAllSocial}
                          handleSelectAllSocial={this.props.handleSelectAllSocial}
                          handleDeSelectConnectSomePage={this.props.handleDeSelectConnectSomePage}
                          getArrayPageFacebook={this.props.getArrayPageFacebook}
                          getArrayPageLinkedin={this.props.getArrayPageLinkedin}
                          getListConnectFacebookPagePublisd={this.props.getListConnectFacebookPagePublisd}
                          getListConnectLinkedinPagePublisd={this.props.getListConnectLinkedinPagePublisd}
                          labelsConnectedChannels={labelsConnectedChannels}
                        />
                      </div>
                    </div>
                    <div className="col-5">
                      <Accordion defaultActiveKey="0" className="mb-3">
                        <div>
                          <Accordion.Toggle
                            as={Button}
                            className="w-100 bg-blue-3 text-body text-start d-flex justify-content-between align-items-center"
                            eventKey="0"
                            onClick={() => this.setState({ social: !this.state.social })}
                          >
                            Social Media
                            <FontAwesomeIcon
                              icon={this.state.social ? faMinus : faPlus}
                              color="#16b979"
                            />
                          </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse eventKey="0">
                          <div className="p-3 border-1">
                            <SocialMedia 
                              isAdvanceMode={this.props.isAdvanceMode}
                              contentConnectedChannelsByOrganisationViewModel={this.props.contentConnectedChannelsByOrganisationViewModel}
                            />
                          </div>
                        </Accordion.Collapse>
                      </Accordion>
                    </div>
                  </div>
                )
              }
              
              {
                checkConnectCms && (
                  <div className="row">
                    <div className="col-5">
                      <div>
                        <ComponentPublishListChannelsCms labelsConnectedChannels={labelsConnectedChannels}/>
                      </div>
                    </div>
                    <div className="col-5">
                      <Accordion defaultActiveKey="0" className="mb-3">
                        <div>
                          <Accordion.Toggle
                            as={Button}
                            className="w-100 bg-blue-3 text-body text-start d-flex justify-content-between align-items-center"
                            eventKey="0"
                            onClick={() => this.setState({ cms: !this.state.cms })}
                          >
                            Content Management System (CMS)
                            <FontAwesomeIcon icon={this.state.cms ? faMinus : faPlus} color="#16b979" />
                          </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse eventKey="0">
                          <div className="p-3 border-1">
                            <ManagementSystem 
                              isAdvanceMode={this.props.isAdvanceMode}
                              contentConnectedChannelsByOrganisationViewModel={this.props.contentConnectedChannelsByOrganisationViewModel}
                            />
                          </div>
                        </Accordion.Collapse>
                      </Accordion>
                    </div>
                  </div>
                )
              }
              
              {
                labelsConnectedChannels.includes("mailchimp") && (
                  <div className="row">
                    <div className="col-5">
                      <div>
                        <ComponentPublishListChannelsEmail labelsConnectedChannels={labelsConnectedChannels}/>
                      </div>
                    </div>
                    <div className="col-5">
                      <Accordion defaultActiveKey="0">
                        <div>
                          <Accordion.Toggle
                            as={Button}
                            className="w-100 bg-blue-3 text-body text-start d-flex justify-content-between align-items-center"
                            eventKey="0"
                            onClick={() => this.setState({ email: !this.state.email })}
                          >
                            Email Marketing
                            <FontAwesomeIcon
                              icon={this.state.email ? faMinus : faPlus}
                              color="#16b979"
                            />
                          </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse eventKey="0">
                          <div className="p-3 border-1">
                            <EmailMarketing 
                              isAdvanceMode={this.props.isAdvanceMode}
                              contentConnectedChannelsByOrganisationViewModel={this.props.contentConnectedChannelsByOrganisationViewModel}
                            />
                          </div>
                        </Accordion.Collapse>
                      </Accordion>
                    </div>
                  </div>
                )
              }
              
            </div>
          </div>
        )}

        <div className="px-3 bg-white pb-3">
          <div className="border-top-1 pt-3 d-flex justify-content-between">
            {/* <Button className="btn btn-light border-success" onClick={this.props.previousStep}> */}
            <Button className="btn btn-light border-success" onClick={this.handleBackGeneral}>
              Back
            </Button>
            <div>
              {checkSetupAds ? (
                <>
                  {!schedule && (
                    <>
                      {!nextStep2Ads ? (
                        <ButtonNormal
                          className="btn btn-success"
                          text="Next"
                          onClick={this.handleNextStep2Ads}
                        ></ButtonNormal>
                      ) : (
                        <ButtonNormal
                          className="btn btn-success"
                          text="Next"
                          onClick={this.schedule}
                        ></ButtonNormal>
                      )}
                    </>
                  )}
                </>
              ) : (
                <div>
                  <ButtonNormal
                    className="btn btn-secondary me-3"
                    text="Save as draft"
                    onClick={() => this.post('save_as_draft')}
                  ></ButtonNormal>
                  <ButtonNormal
                    className="btn btn-success"
                    text="Post"
                    onClick={() => this.post('post')}
                  ></ButtonNormal>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ComponentContentFormPublish;
