import React from "react";
import { withTranslation } from "react-i18next";
import { Tabs, Tab } from "react-bootstrap";

import WizardSteps from "../../components/WizardSteps";
import CreateProject from "../../components/CreateProject";

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
        <CreateProject />
      </div>
    );
  }
}

export default withTranslation("common")(WizardPage);
