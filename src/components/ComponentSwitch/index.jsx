import React, { Component } from "react";
import Switch from "react-switch";

class ComponentSwitch extends Component {
  constructor() {
    super();
  }

  render() {
    let { handleChange, checked, text } = this.props;
    return (
      <label className="d-flex align-items-center">
        <span className="text-black opacity-75 pe-2">{text}</span>
        <Switch
          onChange={handleChange}
          checked={checked}
          onColor="#16b979"
          onHandleColor="#fff"
          uncheckedIcon={false}
          checkedIcon={false}
          height={22}
          width={40}
        />
      </label>
    );
  }
}

export default ComponentSwitch;
