import React, { Component, lazy } from "react";

import { observer } from "mobx-react";

import ModalComponent from "../../../components/Modal";
import SelectComponent from "../../../components/Select";

import "./index.scss";

const FormSelection = observer(
  class FormSelection extends Component {
    constructor(props) {
      super(props);

      this.field = this.props.field;

      this.viewModel = this.field.viewModel;

      console.log("FormSelection - viewModel");
      console.log(this.viewModel);

      this.viewModel.setMulti(this.field.multi);
    }

    handleOnMenuOpen = () => {
      this.viewModel.openModal();
    };

    render() {
      const { multi } = this.viewModel;

      console.log("this.field this.field", this.field);

      const value = this.field.value
        ? this.field.value
        : this.viewModel.getSectionsValue();

      return (
        <SelectComponent
          value={value}
          className="mb-3 text-green"
          isBorder={true}
          plColor="rgba(8, 18, 64, 0.8)"
          menuIsOpen={false}
          onMenuOpen={this.handleOnMenuOpen}
          onFocus={this.field.changed}
          onBlur={this.field.blurred}
          isMulti={multi}
        />
      );
    }
  }
);

export default FormSelection;
