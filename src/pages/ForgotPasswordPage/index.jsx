import React from "react";
import { withTranslation } from "react-i18next";

import "./index.scss";

import BannerLeft from "../../components/BannerLeft";
import TitleAccount from "../../components/TitlePageAccount";
import ButtonNormal from "../../components/ButtonNormal";
import Layout from "../../hoc/Layout";

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

class ForgotPasswordPage extends React.Component {
  render() {
    const { t, i18n } = this.props;

    return (
      <Layout fullPage={true}>
        <div className="row">
          <div className="col-4 bg-primary p-0">
            <BannerLeft dataSlider={dataSlider} />
          </div>
          <div className="col-8 d-flex flex-column justify-content-center align-items-center">
            <div className="d-block">
              <TitleAccount title={t("txt_forgot_your_password")} />

              <div className="description_reset">
                {t(
                  "txt_well_email_you_instructions_on_how_to_reset_your_password"
                )}
              </div>

              <form>
                <label className="form-label mb-3" htmlFor="email">
                  {t("txt_email")} <span>*</span>
                </label>
                <input type="email" className="form-control mb-4" id="email" />
                <ButtonNormal text={t("txt_reset_password")} />
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withTranslation("common")(ForgotPasswordPage);
