import React from "react";

import './index.scss';

class TitleAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {                 
        }
    }

    render() {
        let { title, title_below } = this.props;
        return (
            <div className="wrapper_title_account">
                <h3 className="title">{title}</h3>
                {
                    (title_below != undefined && title_below != "") && (
                        <h3 className="title">{title_below}</h3>
                    )
                }
                
            </div>
        )
    }
}

export default TitleAccount;