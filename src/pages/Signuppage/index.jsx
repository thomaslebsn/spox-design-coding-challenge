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

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

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
        let { selectedOption } = this.state;
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
                                    title="Welcome to our Easii."
                                    title_below="Sign Up to getting started."
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
                                <Line text="Or register with"/>
                                <div className="wrapper_form">
                                    <form>
                                        <div className="form-group">
                                            <label className="text_form" htmlFor="username">Username <span>*</span></label>
                                            <input type="text" className="form-control" id="username"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="text_form" htmlFor="email">Email <span>*</span></label>
                                            <input type="email" className="form-control" id="email"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="text_form" htmlFor="password">Password <span>*</span></label>
                                            <input type="password" className="form-control" id="password" />
                                        </div>
                                        <div className="form-group">
                                            <label className="text_form">What is the main thing you want to manage?</label>
                                            <div className="wrapper_select">
                                                <Select
                                                    value={selectedOption}
                                                    onChange={this.handleChange}
                                                    options={options}
                                                />
                                            </div>
                                        </div>
                                        <div className="wrapper_text_link">
                                            <p className="text_link">You agree to our <a href="#">terms of service </a> and <a href="#">privacy policy</a>.</p>
                                        </div>
                                        <div className="wrapper_btn_normal">
                                            <ButtonNormal 
                                                text="Sign up"
                                            />
                                        </div>
                                        <div className="wrapper_text_link">
                                            <p className="text_link text_link_color">Already have an account? <a href="/login">Log in </a> </p>
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

export default Signuppage;