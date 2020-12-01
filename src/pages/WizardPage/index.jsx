import React from "react";

import Header from "../../containers/Header";
import SbarLeft from "../../containers/SbarLeft";

class WizardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                                  
        }
    }

    render() {
        return (
            <div className="padding_page_top wrapper_page d-flex">
                <SbarLeft />
                <div className="content_page">
                    <h2>Hello Wizard</h2>
                    <Header />
                </div>
            </div>
        )
    }
}

export default WizardPage;