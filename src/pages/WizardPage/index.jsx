import React from "react";

import Header from "../../containers/Header";
import SbarLeft from "../../containers/SbarLeft";

class WizardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="row">
        <SbarLeft />
        <div className="col-6">
          <h2>Hello Wizard</h2>
          <Header />
        </div>
      </div>
    );
  }
}

export default WizardPage;
