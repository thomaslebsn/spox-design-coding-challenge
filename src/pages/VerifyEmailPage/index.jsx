import React from "react";
import { withTranslation } from "react-i18next";

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

class VerifyEmail extends React.Component {
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
              <TitleAccount title={t("txt_verify_your_email_address")} />

              <div className="mb-4">
                {t("txt_a_verification_email_has_been_sent_to_your_email")}
                <a className="d-block">your_account@gmail.com</a>
              </div>

              <div className="mb-4">{t("txt_please_check_your_email")}</div>

              <div className="mb-4">
                {t("txt_if_you_do_not_receive_the_email")}
              </div>

              <ButtonNormal text={t("txt_resend_email")} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withTranslation("common")(VerifyEmail);
