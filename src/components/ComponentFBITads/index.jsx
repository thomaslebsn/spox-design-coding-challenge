import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import SelectComponentAds from './SelectComponentAds';

class ComponentFBITads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('getDataValueSelected 1111');
    console.log(this.props.getDataValueSelected);
    return (
      <div className="wrapper_tabs wrapper_tabs_2">
        <Tabs defaultActiveKey="1" id="fbit-tab" className="bg-white border-0">
          <Tab eventKey={1} title={'Facebook/Instagram Ads'}>
            <SelectComponentAds
              title={'Demographics'}
              getDataSelectOptions={this.props.getDataSelectOptionsFBITDemographics}
            />
            <SelectComponentAds
              title={'Interests'}
              getDataSelectOptions={this.props.getDataSelectOptionsFBITInterests}
            />
            <SelectComponentAds
              title={'Behaviours'}
              getDataSelectOptions={this.props.getDataSelectOptionsFBITBehaviours}
            />
          </Tab>
          <Tab eventKey={2} title={'Google Ads'}>
            <SelectComponentAds
              title={'Demographics'}
              getDataSelectOptions={this.props.getDataSelectOptionsGGemographics}
            />
            <SelectComponentAds
              title={'Interests'}
              getDataSelectOptions={this.props.getDataSelectOptionsGGInterests}
            />
            <SelectComponentAds
              title={'Behaviours'}
              getDataSelectOptions={this.props.getDataSelectOptionsGGBehaviours}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default ComponentFBITads;
