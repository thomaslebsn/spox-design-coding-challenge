import React, { useState, lazy } from 'react';

const DatePicker = lazy(() => import('react-datepicker'));

const DatePickerDay = ({ type, handleOnChange, defaultDate }) => {
  const [startDate, setStartDate] = useState(defaultDate ? new Date(defaultDate) : null);
  return (
    type === 'select-birthday' ? <DatePicker
        dateFormat={'MMM d, yyyy'}
        selected={startDate}
        showYearDropdown
        onChange={(date) => {
          handleOnChange(date);
          setStartDate(date);
        }}
        className='border-0 outline-none'
      /> :
      <DatePicker
        dateFormat={'MMM d, yyyy'}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
  );
};

export default DatePickerDay;
