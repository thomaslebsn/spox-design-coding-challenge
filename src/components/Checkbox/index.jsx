import React from "react";

import './index.scss';

class Checkbox extends React.Component {
    render() {
        let { text } = this.props;
        return (
            <label className="form_check">{text}
                <input type="checkbox"  />
                <span className="checkmark"></span>
            </label>
        )
    }
}

export default Checkbox;