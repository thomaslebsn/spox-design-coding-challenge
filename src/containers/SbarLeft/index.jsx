import React from "react";
import { withTranslation } from "react-i18next";

import "./index.scss";
import Menu from "../Menu";

class SbarLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                                  
        }
    }

    render() {
        return (
            <div className="wrapper_sbarLeft">
                <div className="wrapper_logo">
                    <a href="/" className="link_logo">
                        <img src="/assets/images/logo/logo.svg" alt="logo"/>
                    </a>
                </div>
                <Menu />
            </div>
        )
    }
}


export default withTranslation("common")(SbarLeft);