import React, { Component, lazy } from 'react';

class ComponentSetupGGAds extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { FORM_FIELD_TYPE, CONTENT_FIELD_KEY, formPropsData, nextStep2Ads } = this.props;
    return (
      <div>
        <div className="pt-3">
          {
            !nextStep2Ads ? (
              <div>aaaa</div>
            ) : (
              <div>bbbb</div>
            )
          }
        </div>
      </div>
    );
  }
}

export default ComponentSetupGGAds;
