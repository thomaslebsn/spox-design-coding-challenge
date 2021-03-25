import ChannelsListViewModel from "./ChannelsListViewModel";
import LoginCMSChannelFormModalViewModel from "./LoginCMSChannelFormModalViewModel";

class ChannelsViewModel {
  ChannelsListViewModel = null;
  loginCMSChannelFormModalViewModel = null;

  constructor(channelsStore) {
    if (channelsStore) {
      console.log("ChannelsViewModel - Abstract");
      this.ChannelsListViewModel = new ChannelsListViewModel(channelsStore);

      this.loginCMSChannelFormModalViewModel = new LoginCMSChannelFormModalViewModel(
        channelsStore
      );
    }
  }

  getChannelsListViewModel = () => this.ChannelsListViewModel;
  getLoginCMSChannelFormModalViewModel = () =>
    this.loginCMSChannelFormModalViewModel;
}

export default ChannelsViewModel;
