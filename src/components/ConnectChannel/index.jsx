import React from "react";

import { Tab, Tabs } from "react-bootstrap";
import { withTranslation } from "react-i18next";

import "./index.scss";

class ConnectChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          name: "social",
          title: "Social Media",
        },
        {
          name: "advertising",
          title: "Advertising",
        },
      ],
    };
  }

  render() {
    let { tabs } = this.state;
    return (
      <Tabs defaultActiveKey="social" id="connectContent-tab">
        {tabs.map((value, key) => {
          return (
            <Tab eventKey={value.name} title={value.title}>
              {value.title}
            </Tab>
          );
        })}
      </Tabs>
    );
  }
}

export default withTranslation("common")(ConnectChannel);
