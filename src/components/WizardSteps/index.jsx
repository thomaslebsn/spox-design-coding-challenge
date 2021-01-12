import React from "react";
import { withTranslation } from "react-i18next";

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

  const { currentStep } = props;
  let isActive = 0;

  return (
    <div className="position-relative my-5 w-50 top-0 start-50 translate-middle-x">
      {steps.map(({ key, text }) => {
        isActive = currentStep === key;
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
        <div className={`progress-bar w-${isActive * 50}`}></div>
      </div>
    </div>
  );
};

export default withTranslation("common")(WizardSteps);
