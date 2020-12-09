import React from "react";
import { withTranslation } from "react-i18next";

import TitleAccount from "../../components/TitlePageAccount";

import "./index.scss";
import Line from "../../components/Line";
import ButtonNormal from "../../components/ButtomNormal";
import Checkbox from "../../components/Checkbox";
import BannerLeft from "../../components/BannerLeft";
import Social from "../../components/Social";

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

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t, i18n } = this.props;
    return (
      <div className="row">
        <div className="col-4 bg-primary p-0">
          <BannerLeft dataSlider={dataSlider} />
        </div>
        <div className="col-8 d-flex flex-column justify-content-center align-items-center ">
          <div className="d-block">
            <TitleAccount
              title={t("txt_welcome_to_easii")}
              title_below={t("txt_sign_in_to_see_latest_updates")}
            />

            <Social />

            <Line text={t("txt_or_sign_in_with")} />

            <form>
              <label className="form-label mb-3" htmlFor="email">
                {t("txt_email")} <span>*</span>
              </label>
              <input type="email" className="form-control mb-4" id="email" />
              <label className="form-label mb-3" htmlFor="password">
                {t("txt_password")} <span>*</span>
              </label>
              <input
                type="password"
                className="form-control mb-4"
                id="password"
              />
              <div className="mb-3 d-flex justify-content-between">
                <Checkbox text={t("txt_remember_me")} />
                <a href="/forgot-password">{t("txt_forgot_password")}</a>
              </div>
              <ButtonNormal text={t("txt_sign_in")} />
              <a href="/signup" className="d-flex justify-content-center mt-4">
                {t("txt_do_not_have_an_account")}
              </a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(LoginPage);
