import React, { useState, lazy } from "react";

const DatePicker = lazy(() => import("react-datepicker"));

const DatePickerDay = ({ startDateTime, handlChangeDay }) => {
  // let { startField } = field;

  // const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      dateFormat={"MMM d, yyyy"}
      selected={startDateTime}
      onChange={(date) => handlChangeDay(date)}
      // onChange={(date) => setStartDate(date)}
    />
  );
};

export default DatePickerDay;
