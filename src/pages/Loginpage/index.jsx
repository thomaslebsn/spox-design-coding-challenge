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
        <div className="wrapper_page_account">
            <div className="row">
                <div className="col-4">
                    <div className="content_page_account">
                        <BannerLeft dataSlider={dataSlider} />
                    </div>
                </div>
                <div className="col-8">
                    <div className="content_page_account content_page_account_right">
                        <div className="main_page_account">
                            <TitleAccount
                                title={t("txt_welcome_to_easii")}
                                title_below={t("txt_sign_in_to_see_latest_updates")}
                            />
                            <Social />
                            <Line text={t("txt_or_sign_in_with")} />
                            <div className="wrapper_form">
                                <form>
                                    <div className="form-group">
                                        <label className="text_form" htmlFor="email">
                                            {t("txt_email")} <span>*</span>
                                        </label>
                                        <input type="email" className="form-control" id="email" />
                                    </div>
                                    <div className="form-group">
                                        <label className="text_form" htmlFor="password">
                                            {t("txt_password")} <span>*</span>
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                        />
                                    </div>
                                    <div className="form-group form_group_check">
                                        <Checkbox text={t("txt_remember_me")} />
                                        <p className="text_link text_link_color">
                                            <a href="/forgot-password">{t("txt_forgot_password")}</a>
                                        </p>
                                    </div>
                                    <div className="wrapper_btn_normal">
                                        <ButtonNormal text={t("txt_sign_in")} />
                                    </div>
                                    <div className="wrapper_text_link">
                                        <p className="text_link text_link_color">
                                            {t("txt_do_not_have_an_account")}{" "}
                                            <a href="/signup">{t("txt_sign_up")}</a>{" "}
                                        </p>
                                    </div>
                                    {/* <div>
                                        <button onClick={() => i18n.changeLanguage("en")}>
                                            en
                                        </button>
                                        <button onClick={() => i18n.changeLanguage("de")}>
                                            de
                                        </button>
                                    </div> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default withTranslation("common")(LoginPage);
