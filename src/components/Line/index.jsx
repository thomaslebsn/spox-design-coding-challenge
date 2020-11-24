import React from "react";

import './index.scss';

class Line extends React.Component {
    render() {
        let { text } = this.props;
        return (
            <div className="wrapper_line">
                <p className="text_line">{text}</p>
            </div>
        )
    }
}

export default Line;