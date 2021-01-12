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
      key: 3,
      text: "Connect channel",
    },
    {
      key: 4,
      text: "Create content",
    },
  ];

  const { currentStep } = props;
  let processW = 0;

  return (
    <div className="position-relative my-5 w-50 top-0 start-50 translate-middle-x">
      {steps.map(({ key, text }) => {
        let w = key;

        if (key > 1) {
          w = key - 1;
        }

        let isActive = currentStep >= key;

        if (isActive) {
          processW = (w - 1) * 50;
        }

        return (
          <div
            key={w}
            className={`position-absolute top-0 start-${
              (w - 1) * 50
            } translate-middle`}
          >
            <div
              className={`${
                isActive ? "bg-primary" : "bg-secondary"
              } text-white text-center rounded-circle ${styles.step}`}
            >
              {w}
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
