import React, { Component, lazy, Suspense } from "react";
import ChannelsStore from "./ChannelsStore/ChannelsStore";
import ChannelsViewModel from "./ChannelsViewModels/ChannelsViewModel";
import { ChannelsViewModelContextProvider } from "./ChannelsViewModels/ChannelsViewModelContextProvider";
import ChannelsList from "./ChannelsList/ChannelsList";
import ConnectChannels from "./ConnectChannels";

const channelsStore = new ChannelsStore();
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
