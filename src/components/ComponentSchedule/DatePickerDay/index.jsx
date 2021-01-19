import React, { useState, lazy } from "react";

const DatePicker = lazy(() => import("react-datepicker"));

const DatePickerDay = ({ field }) => {
  let { startField } = field;

  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      dateFormat={"MMM d, yyyy"}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    />
  );
};

export default DatePickerDay;
