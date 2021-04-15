import React, { Component, lazy } from "react";

import { observer } from "mobx-react";

import ModalComponent from "../../../components/Modal";
import SelectComponent from "../../../components/Select";

import { PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR } from "../../../constants/PersonaModule";

const FormSelectionPersona = observer(
  class FormSelectionPersona extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isFilterPersona: null,
      };

      this.field = this.props.field;

      this.viewModel = this.field.viewModel;

      console.log("FormSelection - viewModel");
      console.log(this.field);
      console.log(this.viewModel);

      this.viewModel.setMulti(this.field.multi);
    }

    render() {
      const { multi } = this.viewModel;

      let getDataSelectOptions = this.viewModel.getDataSelectOptions;

      return (
        <SelectComponent
          value={this.field.value}
          options={getDataSelectOptions}
          className="mb-3 text-green"
          isBorder={true}
          plColor="rgba(8, 18, 64, 0.8)"
          //onFocus={this.field.changed}
          onBlur={this.field.blurred}
          isMulti={multi}
          onChange={this.field.handleOnChange}
        />
      );
    }
  }
);

export default FormSelectionPersona;