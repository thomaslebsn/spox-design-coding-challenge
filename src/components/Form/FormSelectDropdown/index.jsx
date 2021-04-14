import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { components } from "react-select";
import SelectComponent from "../../../components/Select";

// import "./index.scss";

const Option = (props) => {
  let { text, type } = props.data;
  return (
    <OverlayTrigger placement="right" overlay={popover(props.data)}>
      <div>
        <components.Option
          {...props}
          className="d-flex align-items-center justify-content-between w-100"
        >
          <p className="mb-0">{text}</p>
          <p className="mb-0 text-black-50">{type}</p>
        </components.Option>
      </div>
    </OverlayTrigger>
  );
};

const popover = (props) => {
  let { size, interest, description } = props;
  return (
    <Popover id="popover-basic">
      <div id="popover-basic" className="bg-white py-3 px-4 popover shadow">
        <p className="fs-14 row">
          <span className="col-4 d-flex">Size:</span>
          <span className="col-8 d-flex">{size}</span>
        </p>
        <p className="fs-14 row">
          <span className="col-4 d-flex">Interest:</span>
          <span className="col-8 d-flex">{interest}</span>
        </p>
        <p className="mb-0 fs-14 row">
          <span className="col-4 d-flex">Description:</span>
          <span className="col-8 d-flex">{description}</span>
        </p>
      </div>
    </Popover>
  );
};

const FormSelectDropdown = observer(
  class FormSelectDropdown extends Component {
    constructor(props) {
      super(props);

      this.field = this.props.field;
    }

    render() {
      console.log("[FormSelectDropdown] render", this.field);
      console.log("[FormSelectDropdown] Options ", this.field.option);
      let selectedObject = null;
      if (this.field.option && Array.isArray(this.field.option)) {
        selectedObject = this.field.option.filter(
          (item) => parseInt(item.value) === parseInt(this.field.value)
        );
      }
      return (
        <SelectComponent
          defaultValue={selectedObject}
          onChange={this.field.changed}
          options={this.field.option}
          className="mb-3 text-green"
          isBorder={true}
          plColor="rgba(8, 18, 64, 0.8)"
          isMulti={this.field.isMulti}
          components={this.field.isComponents ? { Option } : null}
        />
      );
    }
  }
);

export default FormSelectDropdown;
