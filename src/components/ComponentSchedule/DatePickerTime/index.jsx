import React, { useState, lazy } from "react";

const DatePicker = lazy(() => import("react-datepicker"));

const DatePickerTime = ({ timeDate, handlChangeTime }) => {
  // let { timeField } = field;

  // const [timeDate, setTimeDate] = useState(new Date());

  return (
    <DatePicker
      selected={timeDate}
      onChange={(date) => handlChangeTime(date)}
      // onChange={(date) => setTimeDate(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
  );
};

export default DatePickerTime;
