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

      this.state = {
        getArrayPageFacebook: [],
        getArrayPageLinkedin: []
      }

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

    handleDeselectAllSocial = () => {
      this.contentConnectedChannelsByOrganisationViewModel.isDeselectAllSocial = true;
    };

    handleSelectAllSocial = () => {
      this.contentConnectedChannelsByOrganisationViewModel.isDeselectAllSocial = false;
    }

    handleDeSelectConnectSomePage = (name, id) => {
      let { getArrayPageFacebook, getArrayPageLinkedin } = this.state;

      switch (name) {
        case 'facebook':
          const indexFB = getArrayPageFacebook.includes(id);

          if(indexFB) {
            const getIdFB = getArrayPageFacebook.indexOf(id)
            getArrayPageFacebook.splice(getIdFB, 1)
          } else {
            getArrayPageFacebook.push(id)
          }

          this.setState({
            getArrayPageFacebook: getArrayPageFacebook
          })
        break;
        case 'linkedin':
          const indexLI = getArrayPageLinkedin.includes(id);

          if(indexLI) {
            const getIdLI = getArrayPageLinkedin.indexOf(id)
            getArrayPageLinkedin.splice(getIdLI, 1)
          } else {
            getArrayPageLinkedin.push(id)
          }

          this.setState({
            getArrayPageLinkedin: getArrayPageLinkedin
          })
        break;
      } 

      this.contentConnectedChannelsByOrganisationViewModel.disableConnectSoMePage(name, id);
    }

    render() {
      let { getArrayPageFacebook, getArrayPageLinkedin } = this.state;

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
          listLinkedinFanpageConnected={this.channelsListViewModel ? this.channelsListViewModel.listLinkedinFanpageConnected : null}
          handleDeselectAllSocial={this.handleDeselectAllSocial}
          handleSelectAllSocial={this.handleSelectAllSocial}
          isAdvanceMode={this.contentConnectedChannelsByOrganisationViewModel.isAdvanceMode}
          contentConnectedChannelsByOrganisationViewModel={this.contentConnectedChannelsByOrganisationViewModel}
          isDeselectAllSocial={this.contentConnectedChannelsByOrganisationViewModel ? this.contentConnectedChannelsByOrganisationViewModel.isDeselectAllSocial : null}
          handleDeSelectConnectSomePage={(name, i) => this.handleDeSelectConnectSomePage(name, i)}
          getArrayPageFacebook={getArrayPageFacebook}
          getArrayPageLinkedin={getArrayPageLinkedin}
          getListConnectFacebookPagePublisd={this.channelsListViewModel.getListConnectFacebookPagePublisd}
          getListConnectLinkedinPagePublisd={this.channelsListViewModel.getListConnectLinkedinPagePublisd }
        />
      );
    }
  }
);

export default withContentViewModel(ContentFormPublish);
