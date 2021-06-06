import React, { Component, lazy } from 'react';
import { withTranslation } from 'react-i18next';
import { Accordion, Button, Card, Tabs, Tab } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';

import '../../../../utils/canva';

import './index.scss';
import ComponentSwitch from '../../../../components/ComponentSwitch';
import Label from '../../../../components/Form/Label';

const FacebookSocial = lazy(() => import('./ContentFormDescriptionSocial/Facebook'));
const InstagramSocial = lazy(() => import('./ContentFormDescriptionSocial/Instagram'));
const LinkedInSocial = lazy(() => import('./ContentFormDescriptionSocial/LinkedIn'));
const TwitterSocial = lazy(() => import('./ContentFormDescriptionSocial/Twitter'));
const YoutubeSocial = lazy(() => import('./ContentFormDescriptionSocial/Youtube'));
const GoogleMyBusinessSocial = lazy(() => import('./ContentFormDescriptionSocial/GoogleMyBusiness'));
const TumblrSocial = lazy(() => import('./ContentFormDescriptionSocial/Tumblr'));
const MediumSocial = lazy(() => import('./ContentFormDescriptionSocial/Medium'));

const JoomlaSocial = lazy(() => import('./ContentFormDescriptionCMS/Joomla'));
const WordpressSocial = lazy(() => import('./ContentFormDescriptionCMS/Wordpress'));
const DrupalSocial = lazy(() => import('./ContentFormDescriptionCMS/Drupal'));

const MailchimpSocial = lazy(() => import('./ContentFormDescriptionMail/Mailchimp'));

const ContentFormDescriptionSingle = lazy(() => import('./ContentFormDescriptionSingle'));

class ContentFormDescription extends Component {
  constructor(props) {
    super(props);

    this.field = this.props.field;
    this.viewModel = this.field ? this.field.viewModel : null;

    this.handleChangedSignle = this.handleChangedSignle.bind(this);
    this.handleChangedSocial = this.handleChangedSocial.bind(this);
    this.handChangeAdvanceMode = this.handChangeAdvanceMode.bind(this);

    this.viewModel = props.field.viewModel ? props.field.viewModel : null;

    this.state = {
      socical: true,
      cms: false,
      email: false,
    };
  }

  handleChangedSignle = (value) => {
    this.field.handleChange(value);
  };

  handleChangedSocial = (value) => {
    this.field.handleChange(value);
  };

  handChangeAdvanceMode = () => {
    this.viewModel.handleAdvanceMode();
  };

  render() {
    const { t } = this.props;
    const arrayConnectedChannelsFinal = this.viewModel ? this.viewModel.arrayConnectedChannelsFinal : null;

    let labelsConnectedChannels =
    arrayConnectedChannelsFinal && arrayConnectedChannelsFinal.map((e) => e.des);

    console.log('labelsConnectedChannelslabelsConnectedChannels123');
    console.log(labelsConnectedChannels);

    let checkConnectFacebook = labelsConnectedChannels && (labelsConnectedChannels.indexOf("facebook") > -1)
    let checkConnectInstagram = labelsConnectedChannels && (labelsConnectedChannels.indexOf("instagram") > -1)
    let checkConnectTwitter = labelsConnectedChannels && (labelsConnectedChannels.indexOf("twitter") > -1)
    let checkConnectLinkedin = labelsConnectedChannels && (labelsConnectedChannels.indexOf("linkedin") > -1)
    let checkConnectTumblr = labelsConnectedChannels && (labelsConnectedChannels.indexOf("tumblr") > -1)
    let checkConnectMedium = labelsConnectedChannels && (labelsConnectedChannels.indexOf("medium") > -1)
    let checkConnectYoutube = labelsConnectedChannels && (labelsConnectedChannels.indexOf("youtube") > -1)
    let checkConnectGoogleMyBusiness = labelsConnectedChannels && (labelsConnectedChannels.indexOf("google_my_business") > -1)
    let checkConnectWordpress = labelsConnectedChannels && (labelsConnectedChannels.indexOf("wordpress") > -1)
    let checkConnectDrupal = labelsConnectedChannels && (labelsConnectedChannels.indexOf("drupal") > -1)
    let checkConnectJoomla = labelsConnectedChannels && (labelsConnectedChannels.indexOf("joomla") > -1)
    let checkConnectMailchimp = labelsConnectedChannels && (labelsConnectedChannels.indexOf("mailchimp") > -1)

    let { socical, cms, email } = this.state;
    return (
      <>
        <div className="wr_advance d-flex align-items-center justify-content-between mb-3">
          <Label text={this.field.label} required={this.field.required ?? false} />
          <ComponentSwitch
            textLeft={'Advance mode'}
            handleChange={this.handChangeAdvanceMode}
            checked={this.field.isAdvanceMode}
          />
        </div>
        {!this.field.isAdvanceMode ? (
          <div>
            <ContentFormDescriptionSingle field={this.field} changed={this.handleChangedSignle} checkConnectYoutube={checkConnectYoutube} />
          </div>
        ) : (
          <div>
            {/* Social */}
            {
              (checkConnectFacebook || 
                checkConnectInstagram || 
                checkConnectLinkedin || 
                checkConnectTwitter || 
                checkConnectYoutube ||
                checkConnectGoogleMyBusiness || 
                checkConnectTumblr ||
                checkConnectMedium
              ) && (
                <Accordion defaultActiveKey="0" className="mb-3">
                  <Accordion.Toggle
                    as={Button}
                    className="w-100 text-start d-flex justify-content-between align-items-center bg-blue-3 border-0 text-blue-0 wr_header_toogle_social"
                    eventKey="0"
                    onClick={() => this.setState({ socical: !socical })}
                  >
                    <span>Social Media</span>
                    <span className="wr_toggle_icon">
                      {!socical ? (
                        <i className="icons_toggle text-green icon_faPlus">
                          <FontAwesomeIcon icon={faPlus} />
                        </i>
                      ) : (
                        <i className="icons_toggle text-green icon_faMinus">
                          <FontAwesomeIcon icon={faMinus} />
                        </i>
                      )}
                    </span>
                  </Accordion.Toggle>
                  <Accordion.Collapse
                    eventKey="0"
                    className="border-1 border-top-0 position-relative wr_accordion_collapse"
                  >
                    <div className="p-3">
                      <Tabs
                        defaultActiveKey="1"
                        id="social-tab"
                        className="bg-white border-0 wrapper_tabs wrapper_tabs_3"
                      >
                        {
                          checkConnectFacebook && (
                            <Tab eventKey={1} title={'Facebook'}>
                              <FacebookSocial field={this.field} changed={this.handleChangedSocial} />
                            </Tab>
                          )
                        }
                        {
                          checkConnectInstagram && (
                            <Tab eventKey={2} title={'Instagram'}>
                              <InstagramSocial field={this.field} changed={this.handleChangedSocial} />
                            </Tab>
                          )
                        }
                        {
                          checkConnectLinkedin && (
                            <Tab eventKey={3} title={'LinkedIn'}>
                              <LinkedInSocial field={this.field} changed={this.handleChangedSocial} />
                            </Tab>
                          )
                        }
                        {
                          checkConnectTwitter && (
                            <Tab eventKey={4} title={'Twitter'}>
                              <TwitterSocial field={this.field} changed={this.handleChangedSocial} />
                            </Tab>
                          )
                        }
                        {
                          checkConnectYoutube && (
                            <Tab eventKey={5} title={'Youtube'}>
                              <YoutubeSocial field={this.field} changed={this.handleChangedSocial} />
                            </Tab>
                          )
                        }
                        {
                          checkConnectGoogleMyBusiness && (
                            <Tab eventKey={6} title={'GoogleMyBusiness'}>
                              <GoogleMyBusinessSocial field={this.field} changed={this.handleChangedSocial} />
                            </Tab>
                          )
                        }
                        {
                          checkConnectTumblr && (
                            <Tab eventKey={7} title={'Tumblr'}>
                              <TumblrSocial field={this.field} changed={this.handleChangedSocial} />
                            </Tab>
                          )
                        }
                        {
                          checkConnectMedium && (
                            <Tab eventKey={8} title={'Medium'}>
                              <MediumSocial field={this.field} changed={this.handleChangedSocial} />
                            </Tab>
                          )
                        }
                        
                      </Tabs>
                    </div>
                  </Accordion.Collapse>
                </Accordion>
              )
            }
            
            {/* CMS */}
            {
              (checkConnectJoomla || checkConnectWordpress || checkConnectDrupal) && (
                <Accordion className="mb-3">
                  <Accordion.Toggle
                    as={Button}
                    className="w-100 text-start d-flex justify-content-between align-items-center bg-blue-3 border-0 text-blue-0 wr_header_toogle_social"
                    eventKey="0"
                    onClick={() => this.setState({ cms: !cms })}
                  >
                    <span>Content Management System (CMS)</span>
                    <span className="wr_toggle_icon">
                      {!cms ? (
                        <i className="icons_toggle text-green icon_faPlus">
                          <FontAwesomeIcon icon={faPlus} />
                        </i>
                      ) : (
                        <i className="icons_toggle text-green icon_faMinus">
                          <FontAwesomeIcon icon={faMinus} />
                        </i>
                      )}
                    </span>
                  </Accordion.Toggle>
                  <Accordion.Collapse
                    eventKey="0"
                    className="border-1 border-top-0 position-relative wr_accordion_collapse"
                  >
                    <div className="p-3">
                      <Tabs
                        defaultActiveKey="1"
                        id="social-tab"
                        className="bg-white border-0 wrapper_tabs wrapper_tabs_3"
                      >
                        {
                          checkConnectJoomla && (
                            <Tab eventKey={1} title={'Joomla'}>
                              <JoomlaSocial field={this.field} changed={this.handleChangedSocial} />
                            </Tab>
                          )
                        }
                        {
                          checkConnectWordpress && (
                            <Tab eventKey={2} title={'Wordpress'}>
                              <WordpressSocial field={this.field} changed={this.handleChangedSocial} />
                            </Tab>
                          )
                        }
                        {
                          checkConnectDrupal && (
                            <Tab eventKey={3} title={'Drupal'}>
                              <DrupalSocial field={this.field} changed={this.handleChangedSocial} />
                            </Tab>
                          )
                        }
                        
                      </Tabs>
                    </div>
                  </Accordion.Collapse>
                </Accordion>
              )
            }
            
            {/* Email Marketing */}
            {
              checkConnectMailchimp && (
                <Accordion>
                  <Accordion.Toggle
                    as={Button}
                    className="w-100 text-start d-flex justify-content-between align-items-center bg-blue-3 border-0 text-blue-0 wr_header_toogle_social"
                    eventKey="0"
                    onClick={() => this.setState({ email: !this.state.email })}
                  >
                    <span>Email Marketing</span>
                    <span className="wr_toggle_icon">
                      {!email ? (
                        <i className="icons_toggle text-green icon_faPlus">
                          <FontAwesomeIcon icon={faPlus} />
                        </i>
                      ) : (
                        <i className="icons_toggle text-green icon_faMinus">
                          <FontAwesomeIcon icon={faMinus} />
                        </i>
                      )}
                    </span>
                  </Accordion.Toggle>
                  <Accordion.Collapse
                    eventKey="0"
                    className="border-1 border-top-0 position-relative wr_accordion_collapse"
                  >
                    <div className="p-3">
                      <Tabs
                        defaultActiveKey="1"
                        id="social-tab"
                        className="bg-white border-0 wrapper_tabs wrapper_tabs_3"
                      >
                        {
                          checkConnectMailchimp && (
                            <Tab eventKey={1} title={'Mailchimp'}>
                              <MailchimpSocial field={this.field} changed={this.handleChangedSocial} />
                            </Tab>
                          )
                        }
                        
                      </Tabs>
                    </div>
                  </Accordion.Collapse>
                </Accordion>
                )
              }
          </div>
        )}
      </>
    );
  }
}
export default withTranslation('common')(ContentFormDescription);
