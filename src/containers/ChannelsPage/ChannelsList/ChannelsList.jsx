import React, { Component, lazy } from "react";
import { observer } from "mobx-react";
import PAGE_STATUS from "../../../constants/PageStatus";
import { withChannelsViewModel } from "../ChannelsViewModels/ChannelsViewModelContextProvider";
import Spinner from "../../../components/Spinner";
import ComponentConnectaChannel from "../../../components/ComponentConnectaChannel";

const ChannelsList = observer(
  class ChannelsList extends Component {
    channelsListViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel } = props;
      console.log("ChannelsList - Debug View Model");
      console.log(viewModel);

      this.channelsListViewModel = viewModel
        ? viewModel.getChannelsListViewModel()
        : null;

      console.log("this.channelsListViewModel - Debug View Model");
      console.log(this.channelsListViewModel);
    }

    render() {
      const { tableStatus } = this.channelsListViewModel;

      return tableStatus === PAGE_STATUS.READY ? (
        <Spinner />
      ) : (
        <div className="py-4 px-3"></div>
      );
    }
  }
);

export default withChannelsViewModel(ChannelsList);
