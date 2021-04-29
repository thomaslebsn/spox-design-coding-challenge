import React, { Component } from 'react';
import 'emoji-mart/css/emoji-mart.css';

import ContentFormDescriptionSocial from '.';

class Facebook extends Component {
  render() {
    return <ContentFormDescriptionSocial canva={true} {...this.props} />;
  }
}

export default Facebook;
