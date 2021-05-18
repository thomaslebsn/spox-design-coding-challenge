import React, { Component, lazy } from 'react';

import StepWizard from 'react-step-wizard';

import { ContentPreviewPersona } from './ContentPreviewPersona';
import GlobalStore from '../../../store/Store';
import FragmentStore from '../../../fragments/Store/FragmentStore';
//PROJECT
import ProjectTableSelectionModalViewModel from '../../../fragments/ProjectTableSelectionModal/ProjectTableSelectionModalViewModel';
import { ProjectTableSelectionModalViewModelContextProvider } from '../../../fragments/ProjectTableSelectionModal/ProjectTableSelectionModalViewModelContextProvider';
//PERSONA
import PersonaTableSelectionModalViewModel from '../../../fragments/PersonaTableSelectionModal/PersonaTableSelectionModalViewModel';
import { PersonaTableSelectionModalViewModelContextProvider } from '../../../fragments/PersonaTableSelectionModal/PersonaTableSelectionModalViewModelContextProvider';
//CAMPAIGN
import CampaignTableSelectionModalViewModel from '../../../fragments/CampaignTableSelectionModal/CampaignTableSelectionModalViewModel';
import { CampaignTableSelectionModalViewModelContextProvider } from '../../../fragments/CampaignTableSelectionModal/CampaignTableSelectionModalViewModelContextProvider';

const ContentFormGeneral = lazy(() => import('./ContentFormGeneral/ContentFormGeneral'));
const ContentFormPublish = lazy(() => import('./ContentFormPublish/ContentFormPublish'));

const ProjectTableSelectionModal = lazy(() =>
  import('../../../fragments/ProjectTableSelectionModal/ProjectTableSelectionModal')
);

const PersonaTableSelectionModal = lazy(() =>
  import('../../../fragments/PersonaTableSelectionModal/PersonaTableSelectionModal')
);

const CampaignTableSelectionModal = lazy(() =>
  import('../../../fragments/CampaignTableSelectionModal/CampaignTableSelectionModal')
);

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}
const globalStore = window.globalStore;

const fragmentStore = new FragmentStore({
  globalStore: globalStore,
});

const projectTableSelectionModalViewModel = new ProjectTableSelectionModalViewModel(fragmentStore);

const personaTableSelectionModalViewModel = new PersonaTableSelectionModalViewModel(fragmentStore);

const campaignTableSelectionModalViewModel = new CampaignTableSelectionModalViewModel(
  fragmentStore
);

class ContentFormPage extends Component {
  render() {
    console.log('[ContentFormPage] - re-render .........');

    let custom = {
      enterRight: '',
      enterLeft: '',
      exitRight: '',
      exitLeft: '',
    };

    return (
      <>
        <StepWizard isLazyMount={true} transitions={custom}>
          <ContentFormGeneral
            hashKey={'general'}
            match={this.props.match}
            projectTableSelectionModalViewModel={projectTableSelectionModalViewModel}
            personaTableSelectionModalViewModel={personaTableSelectionModalViewModel}
            campaignTableSelectionModalViewModel={campaignTableSelectionModalViewModel}
          />
          <ContentFormPublish
            hashKey={'publish'}
            personaTableSelectionModalViewModel={personaTableSelectionModalViewModel}
            campaignTableSelectionModalViewModel={campaignTableSelectionModalViewModel}
          />
        </StepWizard>

        <ContentPreviewPersona
          personaTableSelectionModalViewModel={personaTableSelectionModalViewModel}
        />

        <ProjectTableSelectionModalViewModelContextProvider
          viewModel={projectTableSelectionModalViewModel}
        >
          <ProjectTableSelectionModal />
        </ProjectTableSelectionModalViewModelContextProvider>

        <PersonaTableSelectionModalViewModelContextProvider
          viewModel={personaTableSelectionModalViewModel}
        >
          <PersonaTableSelectionModal />
        </PersonaTableSelectionModalViewModelContextProvider>

        <CampaignTableSelectionModalViewModelContextProvider
          viewModel={campaignTableSelectionModalViewModel}
        >
          <CampaignTableSelectionModal />
        </CampaignTableSelectionModalViewModelContextProvider>
      </>
    );
  }
}

export default ContentFormPage;
