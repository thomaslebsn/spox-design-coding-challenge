import React from "react";
import { withTranslation } from "react-i18next";
import history from "../../routes/history";

import "./index.scss";
import styles from "./index.module.scss";

const WizardSteps = (props) => {
  const steps = [
    {
      key: 1,
      text: "Create project",
    },
    {
      key: 2,
      text: "Connect channel",
    },
    {
      key: 3,
      text: "Create content",
    },
  ];

  let processW = 0;
  let currentStep = 1;

  if (history.location.pathname === `/wizard/project/1`) {
    currentStep = currentStep + 1;
  } else if (history.location.pathname === "/wizard/project/1/content") {
    currentStep = currentStep + 2;
  } else {
    currentStep = currentStep;
  }

  return (
    <div className="wr_wizard_step position-relative my-5 w-50 top-0 start-50 translate-middle-x">
      {steps.map(({ key, text }) => {
        let isActive = currentStep >= key;

        if (isActive) {
          processW = (key - 1) * 50;
        }

        console.log("processW processW", processW);

        return (
          <div
            key={key}
            className={`position-absolute top-0 start-${
              (key - 1) * 50
            } translate-middle`}
          >
            <div
              className={`${
                isActive ? "bg-primary" : "bg-secondary"
              } text-white text-center rounded-circle ${styles.step}`}
            >
              {key}
            </div>
            <div className="position-absolute text-nowrap start-50 translate-middle-x">
              {text}
            </div>
          </div>
        );
      })}

      <div className={`progress ${styles.progress}`}>
        <div className={`progress-bar w-${processW}`}></div>
      </div>
    </div>
  );
};

export default withTranslation("common")(WizardSteps);
