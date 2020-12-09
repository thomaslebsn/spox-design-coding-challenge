import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import "./index.scss";

class WizardSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMenu: [
        {
          name: "step1",
          text: "Create project",
          link: "/",
        },
        {
          name: "step2",
          text: "Connect channel",
          link: "/",
        },
        {
          name: "step3",
          text: "Create content",
          link: "/",
        },
      ],
    };
  }

  render() {
    let { dataMenu } = this.state;
    return (
      <div className="">
        <div className="position-relative m-4 w-50 top-0 start-50 translate-middle-x">
          {dataMenu.map((value, key) => {
            return (
              <div
                className={`step position-absolute top-0 start-${
                  key * 50
                } translate-middle bg-primary text-white text-center rounded-circle`}
              >
                {key + 1}
              </div>
            );
          })}

          <div className="progress">
            <div className="progress-bar w-50"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(WizardSteps);
