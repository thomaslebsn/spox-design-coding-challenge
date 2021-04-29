import React, { Component } from 'react';
import 'emoji-mart/css/emoji-mart.css';

import ContentFormDescriptionSocial from '.';

class Youtube extends Component {
  render() {
    return <ContentFormDescriptionSocial video={true} {...this.props} />;
  }
}

export default Youtube;
