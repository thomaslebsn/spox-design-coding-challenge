import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

import "./index.scss";

const localizer = momentLocalizer(moment)

class BigCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderEvents: []
    };
  }

  CustomToolbar = (toolbar) => {

    const goToBack = () => {
      let mDate = toolbar.date;
      let newDate = new Date(
        mDate.getFullYear(),
        mDate.getMonth() - 1,
        1);
      toolbar.onNavigate('prev', newDate);
    };
  
    const goToNext = () => {
      let mDate = toolbar.date;
      let newDate = new Date(
        mDate.getFullYear(),
        mDate.getMonth() + 1,
        1);
      toolbar.onNavigate('next', newDate);
    };
  
  
    const label = () => {
      const date = moment(toolbar.date);
      return (
        <p className="mb-0">
          <span> {date.format('MMMM')}, {date.format('YYYY')}</span>
        </p>
      );
    };
  
    return (
      <div className="toolbar-container d-flex justify-content-between align-items-center mb-3">
        <label className="label-date fs-4 text-blue-0 fw-bold">{label()}</label>
        <div className="back-next-buttons d-flex">
          <button className="btn-back rounded-1 border-1 fs-12 text-green bg-transparent" onClick={goToBack}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="btn-next ms-2 rounded-1 border-1 fs-12 text-green bg-transparent" onClick={goToNext}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div >
    );
  };

  render() {
    return (
      <div className="wrapper_calendar sbar_calendar p-4 border-bottom-1">
        <Calendar
          localizer={localizer}
          events={this.state.renderEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 320 }}
          components = {{toolbar : this.CustomToolbar}}
          views={['month']}
        />
      </div>
    );
  }
}

export default BigCalendar;


