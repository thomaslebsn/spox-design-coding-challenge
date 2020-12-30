import React, { useState, lazy } from "react";

import { Form } from "react-bootstrap";

import { FORMAT_DATE } from "../../../constants/FormFieldType";
import Label from "../Label";

import "react-datepicker/dist/react-datepicker.css";
import "../../ComponentDatepicker/index.scss";
import "./index.scss";

const DatePicker = lazy(() => import("react-datepicker"));

const FormDateRangePicker = ({ field }) => {
  let { startField, endField } = field;

  console.log(startField);

  const [startDate, setStartDate] = useState(
    startField.value && new Date(startField.value)
  );
  const [endDate, setEndDate] = useState(
    endField.value && new Date(endField.value)
  );

  return (
    <>
      <Form.Group key={Math.random(40, 200)} className="mb-4">
        <Label text={startField.label} required={field.required ?? false} />
        <DatePicker
          dateFormat={FORMAT_DATE}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="form-control"
        />
      </Form.Group>
      <Form.Group key={Math.random(40, 200)} className="mb-4">
        <Label text={endField.label} required={field.required ?? false} />
        <DatePicker
          dateFormat={FORMAT_DATE}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="form-control"
        />
      </Form.Group>
    </>
  );
};

export default FormDateRangePicker;
