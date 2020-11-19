import React from "react";
import Button from "../../components/Button";
import TitleAccount from "../../components/TitlePageAccount";

import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare';

import './index.scss';
import Line from "../../components/Line";

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
                        <div className="main_page_account"></div>
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
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default LoginPage;