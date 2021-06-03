import React, { Component, lazy } from 'react';

import { observer } from 'mobx-react';

import { withContentViewModel } from '../../ContentViewModels/ContentViewModelContextProvider';
import ComponentContentFormPublish from '../ComponentContentFormPublish';

import { CHANNEL_ADS_GOOGLE } from '../../../../constants/ChannelModule';

const ContentFormPublish = observer(
  class ContentFormPublish extends Component {
    contentFormViewModel = null;
    contentConnectedChannelsByOrganisationViewModel = null;
    channelsListViewModel = null;

    constructor(props) {
      super(props);

      const channelViewModel = props.viewModel
      console.log('viewModel - Debug View Model123');
      console.log(channelViewModel);

      const { viewModel } = this.props;
      console.log('ContentFormPublish - Debug View Model');
      console.log(viewModel);

      this.contentFormViewModel = viewModel ? viewModel.getContentFormViewModel() : null;

      console.log('ContentFormPublish - After binding class');
      console.log(this.contentFormViewModel);

      this.contentConnectedChannelsByOrganisationViewModel = viewModel
        ? viewModel.getContentConnectedChannelsViewModel()
        : null;

      console.log('contentConnectedChannelsByOrganisationViewModel - After binding class');
      console.log(this.contentConnectedChannelsByOrganisationViewModel);

      this.channelsListViewModel = channelViewModel ? channelViewModel.getChannelsListViewModel() : null;

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
        'google_my_business',
      ]);

      console.log('this.channelsListViewModel - After binding class123');
      console.log(this.channelsListViewModel);
    }

    // handleDeselectAll = (value, key) => {
    //   console.log('dsfsdfsdfdsfsdfdsfsdf');
    //   if(this.contentConnectedChannelsByOrganisationViewModel.isAdvanceMode === true) {
    //     this.contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels.social.facebook.publishedPlan.selectedPage = [];
    //   } else {
    //     this.contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels.facebook.publishedPlan.selectedPage = [];
    //   }
    // };

    render() {
      console.log('listFacebookFanpageConnected - After binding class123');
      console.log(this.channelsListViewModel ? this.channelsListViewModel.listFacebookFanpageConnected : null);

      return (
        <ComponentContentFormPublish
          {...this.props}
          viewModel={this.contentFormViewModel}
          formStatus={this.contentFormViewModel.formStatus}
          arrayConnectedChannelsFinal={
            this.contentConnectedChannelsByOrganisationViewModel.arrayConnectedChannelsFinal
          }
          listFaceBookFanpageView={this.channelsListViewModel ? this.channelsListViewModel.listFaceBookFanpageView : null}
          listFacebookFanpageConnected={this.channelsListViewModel ? this.channelsListViewModel.listFacebookFanpageConnected : null}
          // handleDeselectAll={this.handleDeselectAll}
          isAdvanceMode={this.contentConnectedChannelsByOrganisationViewModel.isAdvanceMode}
          contentConnectedChannelsByOrganisationViewModel={this.contentConnectedChannelsByOrganisationViewModel}
        />
      );
    }
  }
);

export default withContentViewModel(ContentFormPublish);
