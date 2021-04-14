import React from "react";

class ComponentLinkChannels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { viewModel } = this.props;
    let channelsLogo = viewModel ? viewModel.connectedChannelMasterData : null;

    return (
      <ul className="list-unstyled d-flex align-items-center">
        {channelsLogo.map((value, key) => {
          return (
            <li key={key} className="me-2">
              <img
                src={`/assets/images/${value.label}.png`}
                alt=""
                className="img-avatar"
              />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ComponentLinkChannels;
