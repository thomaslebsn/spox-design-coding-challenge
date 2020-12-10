import React from "react";
import { withTranslation } from "react-i18next";

import "./index.scss";

class WizardSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataStep: [
        {
          name: "step1",
          text: "Create project",
          link: "/wizard",
        },
        {
          name: "step2",
          text: "Connect channel",
          link: "/connectchannel",
        },
        {
          name: "step3",
          text: "Create content",
          link: "/createcontent",
        },
      ],
    };
  }

  render() {
    let { dataStep } = this.state;
    return (
      <div className="position-relative mt-5 mb-5 w-50 top-0 start-50 translate-middle-x">
        {dataStep.map((value, key) => {
          return (
            <div
              className={`position-absolute top-0 start-${
                key * 50
              } translate-middle `}
            >
              <div className="bg-primary text-white text-center rounded-circle step">
                {key + 1}
              </div>
              <div className="position-absolute text-nowrap start-50 translate-middle-x">
                {value.text}
              </div>
            </div>
          );
        })}

        <div className="progress">
          <div className="progress-bar w-50"></div>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(WizardSteps);
