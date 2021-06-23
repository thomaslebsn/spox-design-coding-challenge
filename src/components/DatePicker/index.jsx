import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const CustomizedDatePicker = ({ handleOnChange, defaultDate }) => {
  const [startDate, setStartDate] = useState(defaultDate ? new Date(defaultDate) : null);
  return (
    <DatePicker
      dateFormat={'MMM d, yyyy'}
      selected={startDate}
      showYearDropdown
      onChange={(date) => {
        handleOnChange(date);
        setStartDate(date);
      }}
      className='border-0 outline-none'
    />
  );
};

export default CustomizedDatePicker;
