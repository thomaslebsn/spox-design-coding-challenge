import React, { Component, lazy } from 'react';

import { observer } from 'mobx-react';

import { withContentViewModel } from '../../ContentViewModels/ContentViewModelContextProvider';
import ComponentContentFormGeneral from '../ComponentContentFormGeneral';

const ContentFormGeneral = observer(
  class ContentFormGeneral extends Component {
    contentFormViewModel = null;
    projectTableSelectionModalViewModel = null;
    personaTableSelectionModalViewModel = null;
    campaignTableSelectionModalViewModel = null;
    contentConnectedChannelsByOrganisationViewModel = null;
    contentDisplayProjectNameInWizardStep3ViewModel = null;
    channelsListViewModel = null;

    constructor(props) {
      super(props);

      const {
        viewModel,
        projectTableSelectionModalViewModel,
        personaTableSelectionModalViewModel,
        campaignTableSelectionModalViewModel,
      } = this.props;
      console.log('ContentFormGeneral - Debug View Model');
      console.log(viewModel);

      this.projectTableSelectionModalViewModel = projectTableSelectionModalViewModel
        ? projectTableSelectionModalViewModel
        : null;

      console.log('ContentFormGeneral - Debug projectTableSelectionModalViewModel');
      console.log(this.projectTableSelectionModalViewModel);

      this.personaTableSelectionModalViewModel = personaTableSelectionModalViewModel
        ? personaTableSelectionModalViewModel
        : null;

      console.log('ContentFormGeneral - Debug personaTableSelectionModalViewModel');
      console.log(this.personaTableSelectionModalViewModel);

      this.campaignTableSelectionModalViewModel = campaignTableSelectionModalViewModel
        ? campaignTableSelectionModalViewModel
        : null;

      console.log('ContentFormGeneral - Debug campaignTableSelectionModalViewModel');
      console.log(this.campaignTableSelectionModalViewModel);

      this.contentFormViewModel = viewModel ? viewModel.getContentFormViewModel() : null;

      console.log('After binding class');
      console.log(this.contentFormViewModel);

      this.contentConnectedChannelsByOrganisationViewModel = this.contentFormViewModel.getContentConnectedChannelsViewModel();
      this.contentDisplayProjectNameInWizardStep3ViewModel = this.contentFormViewModel.getContentDisplayProjectNameInWizardStep3ViewModel();
    }

    render() {

      return (
        <ComponentContentFormGeneral
          {...this.props}
          viewModel={this.contentFormViewModel}
          projectTableSelectionModalViewModel={this.projectTableSelectionModalViewModel}
          personaTableSelectionModalViewModel={this.personaTableSelectionModalViewModel}
          campaignTableSelectionModalViewModel={this.campaignTableSelectionModalViewModel}
          addConnectChannlesBtn={true}
          getDataSelectOptionsProject={
            this.projectTableSelectionModalViewModel
              ? this.projectTableSelectionModalViewModel.getDataSelectOptions
              : []
          }
          getValueSelectedProject={
            this.projectTableSelectionModalViewModel
              ? this.projectTableSelectionModalViewModel.getValueSelected
              : []
          }
          getDataSelectOptionsCampaign={
            this.campaignTableSelectionModalViewModel
              ? this.campaignTableSelectionModalViewModel.getDataSelectOptions
              : []
          }
          getValueSelectedCampaign={
            this.campaignTableSelectionModalViewModel
              ? this.campaignTableSelectionModalViewModel.getValueSelected
              : []
          }
          getDataSelectOptionsPersona={
            this.personaTableSelectionModalViewModel
              ? this.personaTableSelectionModalViewModel.getDataSelectOptions
              : []
          }
          getValueSelectedPersona={
            this.personaTableSelectionModalViewModel
              ? this.personaTableSelectionModalViewModel.getValueSelected
              : []
          }
          contentConnectedChannelsByOrganisationViewModel={
            this.contentConnectedChannelsByOrganisationViewModel
          }
          contentDisplayProjectNameInWizardStep3ViewModel={
            this.contentDisplayProjectNameInWizardStep3ViewModel
          }
          showModalChannels={this.contentConnectedChannelsByOrganisationViewModel.show}
          arrayConnectedChannelsFinal={this.contentConnectedChannelsByOrganisationViewModel.arrayConnectedChannelsFinal}
          dataContentDescriptionSingle={
            this.contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle
          }
          dataContentDescriptionSocial={
            this.contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial
          }
          isAdvanceMode={this.contentConnectedChannelsByOrganisationViewModel.isAdvanceMode}
        />
      );
    }
  }
);

export default withContentViewModel(ContentFormGeneral);
