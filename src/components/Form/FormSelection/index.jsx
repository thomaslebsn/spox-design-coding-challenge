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
      this.viewModel.setMulti(this.field.multi);
    }

    handleOnMenuOpen = () => {
      this.viewModel.openModal();
    };

    handleHideModal = () => {
      this.viewModel.closeModal();
    };

    render() {
      const { show, multi } = this.viewModel;

      const data = this.viewModel.getSectionsValue();

      return (
        <>
          <SelectComponent
            value={data}
            className="mb-3 text-green"
            isBorder={true}
            plColor="rgba(8, 18, 64, 0.8)"
            menuIsOpen={false}
            onMenuOpen={this.handleOnMenuOpen}
            isMulti={multi}
          />
          <ModalComponent
            show={show}
            header="Choose"
            body={this.field.component}
            key={Math.random(40, 200)}
            onHide={this.handleHideModal}
          />
        </>
      );
    }
  }
);

export default FormSelection;
