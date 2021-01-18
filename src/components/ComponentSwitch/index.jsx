import React, { Component } from "react";

class ComponentSwitch extends Component {
  constructor() {
    super();
  }

  render() {
    let { handleChange, checked, text, id } = this.props;
    return (
      <div className="form-check form-switch">
        <input
          className="form-check-input w-98"
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor={id}>
          {text}
        </label>
      </div>
    );
  }
}

export default ComponentSwitch;
