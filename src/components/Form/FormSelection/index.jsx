import React, { Component, lazy } from "react";

import { observer } from "mobx-react";

import ModalComponent from "../../../components/Modal";
import SelectComponent from "../../../components/Select";

import { PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR } from "../../../constants/PersonaModule";

import "./index.scss";

const FormSelection = observer(
  class FormSelection extends Component {
    getPersonalRemoved = [];
    constructor(props) {
      super(props);

      this.state = {
        isFilterPersona: null,
      };

      this.field = this.props.field;

      this.viewModel = this.field.viewModel;

      console.log("FormSelection - viewModel");
      console.log(this.viewModel);

      this.viewModel.setMulti(this.field.multi);
    }

    handleOnMenuOpen = () => {
      this.viewModel.openModal();
      this.viewModel.isFilter = false;
      if (this.viewModel.isFilter) {
        this.viewModel.aabb = this.viewModel.getPersonaFilter;
      }
    };

    handleOnChange = (value) => {
      this.viewModel.isFilter = true;

      this.viewModel.getPersonaFilter = value;
    };

    render() {
      const { multi } = this.viewModel;
      let getPersonaFilter = this.viewModel.getPersonaFilter;
      let aabb = this.viewModel.aabb;

      let { personasSelectionData } = this.viewModel;

      if (personasSelectionData) {
        aabb = personasSelectionData
          .map((item) => {
            return {
              value: item[PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.ID],
              label: item[PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.NAME],
            };
          })
          .reduce((arr, el) => {
            const i = arr.findIndex((e) => e.value === el.value);

            if (i === -1) {
              arr.push(el);
            } else {
              arr[i] = el;
            }
            return arr;
          }, []);
      }

      let value = this.viewModel.isFilter ? getPersonaFilter : aabb;

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
          onChange={this.handleOnChange}
        />
      );
    }
  }
);

export default FormSelection;
