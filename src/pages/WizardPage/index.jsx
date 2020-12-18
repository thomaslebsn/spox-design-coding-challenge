import React from "react";
import { withTranslation } from "react-i18next";
import { Tab } from "react-bootstrap";

import WizardSteps from "../../components/WizardSteps";
import CreateProject from "../../components/CreateProject";
import ConnectChannel from "../../components/ConnectChannel";
import CreateContent from "../../components/CreateContent";
import Publish from "../../components/Publish";

import ButtonNormal from "../../components/ButtonNormal";

class WizardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: props.location.step != undefined ? props.location.step : 4,
    };
  }

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 3 ? 4 : currentStep + 1;
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
    let className = "btn btn-light border-success";

    if (currentStep != 1 && currentStep != 4) {
      return (
        <ButtonNormal className={className} onClick={this._prev} text="Back" />
      );
    }
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    let className = "btn btn-success";

    if (currentStep == 1) {
      className += " m-auto w-40";
    }

    if (currentStep != 4) {
      return (
        <ButtonNormal className={className} onClick={this._next} text="Next" />
      );
    }
  }

  render() {
    const { t, i18n } = this.props;
    return (
      <>
        <WizardSteps />
        <div className="d-flex flex-column m-4">
          <Tab.Content>
            <Tab.Pane id="1" active={(this.state.currentStep == "1") & true}>
              <CreateProject isTitle={true}/>
            </Tab.Pane>
            <Tab.Pane id="2" active={(this.state.currentStep == "2") & true}>
              <ConnectChannel />
            </Tab.Pane>

            <Tab.Pane id="3" active={(this.state.currentStep == "3") & true}>
              <CreateContent />
            </Tab.Pane>

            <Tab.Pane id="4" active={(this.state.currentStep == "4") & true}>
              <Publish />
            </Tab.Pane>
          </Tab.Content>
        </div>
        <div className="d-flex justify-content-between mx-4 mb-4">
          {this.previousButton()}
          {this.nextButton()}
        </div>
      </>
    );
  }
}

export default withTranslation("common")(WizardPage);
