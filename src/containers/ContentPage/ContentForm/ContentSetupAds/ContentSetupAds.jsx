import React, { Component, lazy } from 'react';

import { Tab, Tabs } from 'react-bootstrap';
import ComponentSetupFBIAds from './ComponentSetupFBIAds';
import ComponentSetupGGAds from './ComponentSetupGGAds';

class ContentSetupAds extends Component {
  contentFormViewModel = null;
  constructor(props) {
    super(props);

    const { viewModel } = this.props;
    console.log('ContentFormPublish - Debug View Model');
    console.log(viewModel);

    this.contentFormViewModel = viewModel ? viewModel.getContentFormViewModel() : null;

    console.log('ContentFormPublish - After binding class');
    console.log(this.contentFormViewModel);
  }

  render() {
    let {
      labelsConnectedChannels,
      FORM_FIELD_TYPE,
      CONTENT_FIELD_KEY,
      formPropsData,
      nextStep2Ads,
    } = this.props;

    return (
      <div className="wrapper_tabs wrapper_tabs_2">
        <Tabs
          defaultActiveKey={
            labelsConnectedChannels && labelsConnectedChannels.indexOf('fbad') > -1 ? '1' : '2'
          }
          id="fbit-tab"
          className={`${
            labelsConnectedChannels &&
            (labelsConnectedChannels.indexOf('fbad') > -1 ||
              labelsConnectedChannels.indexOf('youtube') > -1)
              ? 'border-bottom-1 border-color'
              : ''
          }`}
        >
          {labelsConnectedChannels && labelsConnectedChannels.indexOf('fbad') > -1 && (
            <Tab eventKey={1} title={'Facebook/Instagram Ads'}>
              <ComponentSetupFBIAds
                FORM_FIELD_TYPE={FORM_FIELD_TYPE}
                CONTENT_FIELD_KEY={CONTENT_FIELD_KEY}
                formPropsData={formPropsData}
                nextStep2Ads={nextStep2Ads}
              />
            </Tab>
          )}
          {labelsConnectedChannels && labelsConnectedChannels.indexOf('google_ads') > -1 && (
            <Tab eventKey={2} title={'Google Ads'}>
              <ComponentSetupGGAds
                FORM_FIELD_TYPE={FORM_FIELD_TYPE}
                CONTENT_FIELD_KEY={CONTENT_FIELD_KEY}
                formPropsData={formPropsData}
                nextStep2Ads={nextStep2Ads}
              />
            </Tab>
          )}
        </Tabs>
      </div>
    );
  }
}

export default ContentSetupAds;
