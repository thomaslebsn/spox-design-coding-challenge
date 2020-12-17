import React from "react";

import "./index.scss";

class Checkbox extends React.Component {
  render() {
    let { text, checked, onCheckBoxChange } = this.props;
    return (
      <div className="form-check">
        <input className="form-check-input" type="checkbox" checked={checked} onChange={onCheckBoxChange}/>
        <label className="form-check-label" htmlFor="flexCheckChecked">
          {text}
        </label>
      </div>
    );
  }
}

export default Checkbox;
