import React from "react";
import { withTranslation } from 'react-i18next';
import Select from 'react-select';

import TitleAccount from "../../components/TitlePageAccount";
import './index.scss';
import Line from "../../components/Line";
import ButtonNormal from "../../components/ButtomNormal";
import BannerLeft from "../../components/BannerLeft";
import Social from "../../components/Social";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const dataSlider = [
    {
        text: "The most complete, easy-to-use, and comprehensive reporting suite available. We use Easii.io at our digital marketing agency for all of our client campaign reporting, and the results have been remarkable!",
        title: "William White - CMO at Walmart"
    },
    {
        text: "The most complete, easy-to-use, and comprehensive reporting suite available. We use Easii.io at our digital marketing agency for all of our client campaign reporting, and the results have been remarkable! 1",
        title: "William White - CMO at Walmart"
    },
    {
        text: "The most complete, easy-to-use, and comprehensive reporting suite available. We use Easii.io at our digital marketing agency for all of our client campaign reporting, and the results have been remarkable! 2",
        title: "William White - CMO at Walmart"
    }
]

class Signuppage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null                               
        }
    }

    handleChange = (selectedOption) => {
        this.setState({selectedOption})
    }

    render() {
        const { t, i18n } = this.props;
        let { selectedOption } = this.state;
        return (
            <div className="wrapper_page_account">
                <div className="row">
                    <div className="col-4">
                        <div className="content_page_account">
                            <BannerLeft 
                                dataSlider={dataSlider}
                            />
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="content_page_account content_page_account_right">
                            <div className="main_page_account">
                                <TitleAccount
                                    title={t('txt_welcome_to_our_easii')}
                                    title_below={t('txt_sign_up_to_getting_started')}
                                />
                                <Social />
                                <Line text={t('txt_or_register_with')}/>
                                <div className="wrapper_form">
                                    <form>
                                        <div className="form-group">
                                            <label className="text_form" htmlFor="username">{t('txt_username')} <span>*</span></label>
                                            <input type="text" className="form-control" id="username"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="text_form" htmlFor="email">{t('txt_email')} <span>*</span></label>
                                            <input type="email" className="form-control" id="email"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="text_form" htmlFor="password">{t('txt_password')} <span>*</span></label>
                                            <input type="password" className="form-control" id="password" />
                                        </div>
                                        <div className="form-group">
                                            <label className="text_form">{t('txt_what_is_the_main_thing_you_want_to_manage')}</label>
                                            <div className="wrapper_select">
                                                <Select
                                                    value={selectedOption}
                                                    onChange={this.handleChange}
                                                    options={options}
                                                />
                                            </div>
                                        </div>
                                        <div className="wrapper_text_link">
                                            <p className="text_link">{t('txt_you_agree_to_our')} <a href="#">{t('txt_terms_of_service')} </a> {t('txt_and')} <a href="#">{t('txt_privacy_policy')}</a>.</p>
                                        </div>
                                        <div className="wrapper_btn_normal">
                                            <ButtonNormal 
                                                text="Sign up"
                                            />
                                        </div>
                                        <div className="wrapper_text_link">
                                            <p className="text_link text_link_color">{t('txt_already_have_an_account')} <a href="/login">{t('txt_log_in')}</a></p>
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

export default withTranslation('common')(Signuppage);