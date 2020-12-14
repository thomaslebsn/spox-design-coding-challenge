import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Dropdown } from "react-bootstrap";
import moment from 'moment';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";

import "./index.scss";

const localizer = momentLocalizer(moment);

class BigCalendarFull extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderEvents: [
        {
          id: 0,
          title: "08:00 AM | Ladies Night Video",
          start: new Date(new Date().setHours(new Date().getHours() - 3)),
          end: new Date(new Date().setHours(new Date().getHours() + 3)),
          background: "blue"
        },
        {
          id: 1,
          title: "10:00 AM | Weekly Sports (19/10 - 25/10)",
          start: new Date(new Date().setHours(new Date().getHours() - 3)),
          end: new Date(new Date().setHours(new Date().getHours() + 4)),
          background: "red"
        },
        {
          id: 2,
          title: "Today",
          start: new Date(new Date().setHours(new Date().getHours() - 3)),
          end: new Date(new Date().setHours(new Date().getHours() + 5)),
          background: "purple"
        },
        {
          id: 3,
          title: "Today",
          start: new Date(new Date().setHours(new Date().getHours() - 3)),
          end: new Date(new Date().setHours(new Date().getHours() + 6)),
          background: "green"
        },
        {
          id: 4,
          title: "Multi-day Event",
          start: new Date(2020, 11, 20, 19, 30, 0),
          end: new Date(2020, 11, 22, 2, 0, 0),
          background: "orange"
        },
        {
          id: 5,
          title: "Multi-day Event",
          start: new Date(2020, 11, 24, 19, 30, 0),
          end: new Date(2020, 11, 25, 2, 0, 0),
          background: "gray"
        }
      ],
      textBtnGroup: 'Month'
    };
  }

  CustomToggleToolbar = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="d-flex align-items-center justify-content-center rounded-1 border-1 fs-12 text-green py-2 text-decoration-none text-green w-98"
    >
      <span className="fs-6 me-2 text-blue-0 opacity-75">{this.state.textBtnGroup}</span>
      <FontAwesomeIcon icon={faChevronDown} />
    </a>
  ));

  eventPropGetter = (event) => {
    console.log('event', event);
    let newStyle = {
      backgroundColor: 'rgba(25, 156, 227, 0.25)',
      color: '#199CE3',
      border: "none"
    };

    if (event.isMine){
      newStyle.backgroundColor = "lightgreen"
    }

    return {
      className: "",
      style: newStyle
    };
  }

  CustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.onNavigate('PREV');
    };
  
    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };
  
    const goToCurrent = () => {
      toolbar.onNavigate('TODAY');
    };

    const goToDayView = () => {
      toolbar.onView('day');
      this.setState({
        textBtnGroup: 'Day'
      })
    }

    const goToWeekView = () => {
      toolbar.onView('week');
      this.setState({
        textBtnGroup: 'Week'
      })
    }

    const goToMonthView = () => {
      toolbar.onView('month');
      this.setState({
        textBtnGroup: 'Month'
      })
    }
  
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
        <div className="back-next-buttons d-flex align-items-center">
          <button className="btn-today rounded-1 border-1 fs-12 text-green bg-transparent d-flex align-items-center py-2 px-3" onClick={goToCurrent}>
            <span className="fs-6 me-2 text-blue-0 opacity-75">Today</span>
            <FontAwesomeIcon icon={faChevronDown} /> 
          </button>
          <button className="btn-back fs-12 border-0 text-green bg-transparent" onClick={goToBack}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <label className="label-date fs-4 text-blue-0">{label()}</label>
          <button className="btn-next ms-2 fs-12 border-0 text-green bg-transparent" onClick={goToNext}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div>
        <div className="position-relative">
          <Dropdown>
            <Dropdown.Toggle
              as={this.CustomToggleToolbar}
              id="dropdown-custom-components"
            ></Dropdown.Toggle>
            <Dropdown.Menu className="shadow border-0 p-3">
              <div className="rbc-btn-group w-100 d-block">
                <Dropdown.Item onClick={goToDayView} className="border-0 bg-transparent d-block w-100 color-blue-0 p-0 text-start mb-1">Day</Dropdown.Item>
                <Dropdown.Item onClick={goToWeekView} className="border-0 bg-transparent d-block w-100 color-blue-0 p-0 text-start mb-1">Week</Dropdown.Item>
                <Dropdown.Item onClick={goToMonthView} className="border-0 bg-transparent d-block w-100 color-blue-0 p-0 text-start">Month</Dropdown.Item>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        </div>
      </div >
    );
  };

  render() {
    return (
      <Calendar
        localizer={localizer}
        events={this.state.renderEvents}
        style={{ height: '90%' }}
        showMultiDayTimes
        components = {
          {toolbar : this.CustomToolbar}
        }
        views={['month', 'day', 'agenda', 'week']}
        eventPropGetter={this.eventPropGetter}
      />
    );
  }
}

export default BigCalendarFull;


