import React from "react";
import { withTranslation } from "react-i18next";
import { Tab } from "react-bootstrap";

import WizardSteps from "../../components/WizardSteps";
import CreateProject from "../../components/CreateProject";
import ConnectChannel from "../../components/ConnectChannel";
import ButtonNormal from "../../components/ButtonNormal";

class WizardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
    };
  }

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;

    this.setState({
      currentStep: currentStep,
    });
  };

  previousButton() {
    let currentStep = this.state.currentStep;

    if (currentStep != 1) {
      return (
        <ButtonNormal
          className="btn btn-light w-40  m-auto border-success"
          onClick={this._prev}
          text="Back"
        />
      );
    }
  }

  nextButton() {
    let currentStep = this.state.currentStep;

    if (currentStep < 3) {
      return (
        <ButtonNormal
          className="btn btn-success w-40 m-auto"
          onClick={this._next}
          text="Next"
        />
      );
    }
  }

  render() {
    const { t, i18n } = this.props;
    return (
      <>
        <WizardSteps />
        <div className="bg-white m-4 bg-white d-flex flex-column p-4">
          <Tab.Content>
            <Tab.Pane id="1" active={(this.state.currentStep == "1") & true}>
              <CreateProject />
            </Tab.Pane>
            <Tab.Pane id="2" active={(this.state.currentStep == "2") & true}>
              <ConnectChannel />
            </Tab.Pane>

            <Tab.Pane id="3" active={(this.state.currentStep == "3") & true}>
              createcontent
            </Tab.Pane>
          </Tab.Content>

          {this.previousButton()}
          {this.nextButton()}
        </div>
      </>
    );
  }
}

export default withTranslation("common")(WizardPage);
