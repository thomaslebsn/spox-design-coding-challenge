import React from "react";
import { withTranslation } from "react-i18next";

import CreateContent from "../../components/CreateContent";

class CreateContentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <CreateContent />;
  }
}

export default withTranslation("common")(CreateContentPage);
