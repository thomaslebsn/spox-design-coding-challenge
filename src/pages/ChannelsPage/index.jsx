import React from "react";
import { withTranslation } from "react-i18next";

import ComponentHeaderPageAction from "../../components/ComponentHeaderPageAction";
import ChannelAccordion from "../../components/ChannelAccordion";
import ComponentConnectaChannel from "../../components/ComponentConnectaChannel";

class ChannelsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreate: false
    };
  }

  handleCreate = () => {
    let { isCreate } = this.state;

    this.setState({
      isCreate: !isCreate
    })
  }

  render() {
    const { t, i18n } = this.props;
    let { isCreate } = this.state;

    return (
      <div className="py-4 px-3">
        <div className="mb-3">
          <ComponentHeaderPageAction
            title={isCreate ? "Connect a Channel" : "Channel Statistics"}
            textBtn={isCreate ? "Close" : "Add channels"}
            handleCreate={this.handleCreate}
            isCreate={isCreate}
          />
        </div>
        <div>
          {
            !isCreate ? (
              <ChannelAccordion/>
            ) : (
              <ComponentConnectaChannel />
            )
          }
          
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(ChannelsPage);
