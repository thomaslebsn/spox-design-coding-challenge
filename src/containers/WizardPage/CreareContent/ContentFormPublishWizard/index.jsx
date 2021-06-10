import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withWizardViewModel } from "../../WizardViewModels/WizardViewModelContextProvider";
import ComponentContentFormPublish from "../../../ContentPage/ContentForm/ComponentContentFormPublish";
import GlobalStore from "../../../../store/Store";
import FragmentStore from "../../../../fragments/Store/FragmentStore";
import PersonaTableSelectionModalViewModel from "../../../../fragments/PersonaTableSelectionModal/PersonaTableSelectionModalViewModel";
import CampaignTableSelectionModalViewModel from "../../../../fragments/CampaignTableSelectionModal/CampaignTableSelectionModalViewModel";

import { CHANNEL_ADS_GOOGLE } from '../../../../constants/ChannelModule';

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}
const globalStore = window.globalStore;

const fragmentStore = new FragmentStore({
  globalStore: globalStore,
});

const personaTableSelectionModalViewModel = new PersonaTableSelectionModalViewModel(
  fragmentStore
);

const campaignTableSelectionModalViewModel = new CampaignTableSelectionModalViewModel(
  fragmentStore
);

const ContentFormPublishWizard = observer(
  class ContentFormPublishWizard extends Component {
    contentFormViewModel = null;
    contentConnectedChannelsByOrganisationViewModel = null;
    channelsListViewModel = null;

    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("ContentFormPublishWizard - Debug View Model");
      console.log(viewModel);
      this.contentFormViewModel = viewModel
        ? viewModel.getContentFormViewModel()
        : null;

      console.log("After binding class");
      console.log(this.contentFormViewModel);

      this.contentConnectedChannelsByOrganisationViewModel = viewModel
        ? viewModel.getContentConnectedChannelsViewModel()
        : null;

      console.log('contentConnectedChannelsByOrganisationViewModel - After binding class');
      console.log(this.contentConnectedChannelsByOrganisationViewModel);

      this.channelsListViewModel = viewModel ? viewModel.getChannelsListViewModel() : null;

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

    render() {
      console.log("[ContentFormPublishWizard] - re-render .........");
      console.log(this.contentFormViewModel);

      return (
        <ComponentContentFormPublish
          {...this.props}
          viewModel={this.contentFormViewModel}
          formStatus={this.contentFormViewModel.formStatus}
          personaTableSelectionModalViewModel={
            personaTableSelectionModalViewModel
          }
          campaignTableSelectionModalViewModel={
            campaignTableSelectionModalViewModel
          }
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
        />
      );
    }
  }
);

export default withWizardViewModel(ContentFormPublishWizard);
