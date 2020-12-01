import React from "react";
import { withTranslation } from "react-i18next";

import "./index.scss";

import BannerLeft from "../../components/BannerLeft";
import TitleAccount from "../../components/TitlePageAccount";
import ButtonNormal from "../../components/ButtomNormal";

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
                                    title={t("txt_forgot_your_password")}
                                />
                                <div className="wrapper_description_reset">
                                    <p className="description_reset">{t('txt_well_email_you_instructions_on_how_to_reset_your_password')}</p>
                                </div>
                                <div className="wrapper_form">
                                    <form>
                                        <div className="form-group">
                                            <label className="text_form" htmlFor="email">
                                                {t("txt_email")} <span>*</span>
                                            </label>
                                            <input type="email" className="form-control" id="email" />
                                        </div>
                                        <div className="wrapper_btn_normal">
                                            <ButtonNormal text={t("txt_reset_password")}/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation("common")(ForgotPasswordPage);