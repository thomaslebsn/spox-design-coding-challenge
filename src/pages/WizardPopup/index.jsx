import React from "react";
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

// import "./index.scss";

import BannerLeft from "../../components/BannerLeft";
import TitleAccount from "../../components/TitlePageAccount";
import ButtonNormal from "../../components/ButtonNormal";

const dataSlider = [
  {
    text:
      "The most complete, easy-to-use, and comprehensive reporting suite available. We use Easii.io at our digital marketing agency for all of our client campaign reporting, and the results have been remarkable!",
    title: "William White - CMO at Walmart",
  },
  {
    text:
      "The most complete, easy-to-use, and comprehensive reporting suite available. We use Easii.io at our digital marketing agency for all of our client campaign reporting, and the results have been remarkable! 1",
    title: "William White - CMO at Walmart",
  },
  {
    text:
      "The most complete, easy-to-use, and comprehensive reporting suite available. We use Easii.io at our digital marketing agency for all of our client campaign reporting, and the results have been remarkable! 2",
    title: "William White - CMO at Walmart",
  },
];

class WizardPopup extends React.Component {
  render() {
    const { t, i18n } = this.props;

    return (
      <div className="row">
        <div className="col-4 bg-primary p-0">
          <BannerLeft dataSlider={dataSlider} />
        </div>
        <div className="col-8 d-flex flex-column justify-content-center align-items-center">
          <div className="d-block text-center">
            <TitleAccount 
              title={t("txt_welcome_to_easii")}
              title_below={t("txt_marketing_automation_made_easy")}
            />

            <p>
              {t(
                "txt_we_have_created_a_step_by_step_process"
              )}
            </p>

            <div className="d-flex align-items-center justify-content-center">
              <a href="#" className="btn btn-light w-25 me-3">Skip</a>
              <a href="#" className="btn btn-success w-25">
                <span className="me-2">Wizard</span>
                <i><FontAwesomeIcon icon={faChevronRight} /></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(WizardPopup);
