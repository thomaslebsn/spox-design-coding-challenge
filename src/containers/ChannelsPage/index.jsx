import React, { Component, lazy, Suspense } from 'react';
import ChannelsStore from './ChannelsStore/ChannelsStore';
import ChannelsViewModel from './ChannelsViewModels/ChannelsViewModel';
import { ChannelsViewModelContextProvider } from './ChannelsViewModels/ChannelsViewModelContextProvider';
import ChannelsList from './ChannelsList/ChannelsList';
import ConnectChannels from './ConnectChannels';
import GlobalStore from '../../store/Store';

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}

const globalStore = window.globalStore;

const channelsStore = new ChannelsStore({
  globalStore: globalStore,
});
const channelsViewModel = new ChannelsViewModel(channelsStore);

class channelsPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ChannelsViewModelContextProvider viewModel={channelsViewModel}>
        <ConnectChannels />
      </ChannelsViewModelContextProvider>
    );
  }
}

export default channelsPage;
