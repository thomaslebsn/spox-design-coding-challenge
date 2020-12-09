import React from "react";
import { withTranslation } from "react-i18next";
import { Tabs, Tab } from "react-bootstrap";
import WizardSteps from "../../components/WizardSteps";

class WizardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t, i18n } = this.props;
    return (
      <div className="">
        <WizardSteps />
        <Tabs defaultActiveKey="internal" id="noanim-tab-example">
          <Tab eventKey="internal" title={t("txt_internal")}></Tab>
          <Tab eventKey="client" title={t("txt_client")}></Tab>
        </Tabs>
      </div>
    );
  }
}

export default withTranslation("common")(WizardPage);
