import React, { Component, lazy } from "react";

import SelectComponent from "../../../components/Select";
import "./index.scss";

class FormSelection extends Component {
  constructor(props) {
    super(props);

    this.field = this.props.field;

    this.viewModel = this.field ? this.field.viewModel : null;

    this.viewModel.setMulti(this.field.multi);
  }

  handleChange = (e) => {
    this.viewModel.getValueSelected = e;
  };

  render() {
    const { multi } = this.viewModel;

    return (
      <SelectComponent
        value={this.field.getValueSelected}
        options={this.field.getDataSelectOptions}
        className="mb-3 text-green"
        isBorder={true}
        plColor="rgba(8, 18, 64, 0.8)"
        //onFocus={this.field.changed}
        onBlur={this.field.blurred}
        isMulti={multi}
        onChange={this.field.handleChange}
      />
    );
  }
}

export default FormSelection;
