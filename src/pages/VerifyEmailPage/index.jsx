import React from "react";
import { withTranslation } from "react-i18next";

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

class VerifyEmail extends React.Component {
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
                                    title={t("txt_verify_your_email_address")}
                                />
                                <div className="wrapper_description_reset">
                                    <p className="description_reset">
                                        {t('txt_a_verification_email_has_been_sent_to_your_email')}
                                        <a className="text_account">your_account@gmail.com</a>
                                    </p>
                                    <p className="description_reset">{t('txt_please_check_your_email')}</p>
                                    <p className="description_reset">{t('txt_if_you_do_not_receive_the_email')}</p>
                                </div>
                                <div className="wrapper_btn_normal">
                                    <ButtonNormal text={t("txt_resend_email")}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation("common")(VerifyEmail);