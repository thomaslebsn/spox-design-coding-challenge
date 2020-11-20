import React from "react";
import Select from 'react-select';

import Button from "../../components/Button";
import TitleAccount from "../../components/TitlePageAccount";

import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare';

import './index.scss';
import Line from "../../components/Line";
import ButtonNormal from "../../components/ButtomNormal";
import Checkbox from "../../components/Checkbox";
import BannerLeft from "../../components/BannerLeft";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {                         
        }
    }


    render() {
        return (
            <div className="wrapper_page_account">
                <div className="row">
                    <div className="col-4">
                        <div className="content_page_account">
                            <BannerLeft />
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="content_page_account content_page_account_right">
                            <div className="main_page_account">
                                <TitleAccount
                                    title="Welcome to Easii."
                                    title_below="Sign In to see latest updates."
                                />
                                <div className="wrapper_btn_account">
                                    <div className="item_btn_account">
                                        <Button 
                                            link="#"
                                            icon={faFacebookSquare}
                                            text="Facebook"
                                            className="link_btn_fb"
                                        />
                                    </div>
                                    <div className="item_btn_account">
                                        <Button 
                                            link="#"
                                            icon={faTwitterSquare}
                                            text="Twitter"
                                            className="link_btn_tt"
                                        />
                                    </div>
                                    <div className="item_btn_account">
                                        <Button 
                                            link="#"
                                            icon={faGoogle}
                                            text="Google"
                                        />
                                    </div>
                                </div>
                                <Line text="Or Sign In with"/>
                                <div className="wrapper_form">
                                    <form>
                                        <div className="form-group">
                                            <label className="text_form" htmlFor="email">Email <span>*</span></label>
                                            <input type="email" className="form-control" id="email"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="text_form" htmlFor="password">Password <span>*</span></label>
                                            <input type="password" className="form-control" id="password" />
                                        </div>
                                        <div className="form-group form_group_check">
                                            <Checkbox
                                                text="Remember me"
                                            />
                                            <p className="text_link text_link_color">
                                                <a href="/signup">Forgot password?</a>
                                            </p>
                                        </div>
                                        <div className="wrapper_btn_normal">
                                            <ButtonNormal 
                                                text="Sign In"
                                            />
                                        </div>
                                        <div className="wrapper_text_link">
                                            <p className="text_link text_link_color">Don’t have an account? <a href="/signup">Sign Up</a> </p>
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

export default LoginPage;