import React from "react";
import { withTranslation } from "react-i18next";

import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons/faFacebookSquare";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons/faTwitterSquare";

import "./index.scss";
import Button from "../Button";

class Social extends React.Component {
    render() {
        return (
            <div className="row wrapper_btn_account">
                <div className="col item_btn_account">
                    <Button
                        link="#"
                        icon={faFacebookSquare}
                        text="Facebook"
                        className="btn-facebook"
                    />
                </div>
                <div className="col item_btn_account">
                    <Button
                        link="#"
                        icon={faTwitterSquare}
                        text="Twitter"
                        className="btn-twitter"
                    />
                </div>
                <div className="col item_btn_account">
                    <Button
                        link="#"
                        icon={faGoogle}
                        text="Google"
                        className="btn-google"
                    />
                </div>
            </div>
        )
    }
}

export default withTranslation("common")(Social);
