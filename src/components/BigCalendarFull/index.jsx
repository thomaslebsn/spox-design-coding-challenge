import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Dropdown, Tooltip, OverlayTrigger, Overlay, Popover, Button  } from "react-bootstrap";
import moment from 'moment';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

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
          background: "blue",
          text: "Maryland Day is a legal holiday in the U.S. state of Maryland.[1] It is observed on the anniversary of the March 25, 1634, landing of the first European settlers in the Province of Maryland, the third English colony to be settled in British North ..."
        },
        {
          id: 1,
          title: "10:00 AM | Weekly Sports (19/10 - 25/10)",
          start: new Date(new Date().setHours(new Date().getHours() - 3)),
          end: new Date(new Date().setHours(new Date().getHours() + 4)),
          background: "red",
          text: "Maryland Day is a legal holiday in the U.S. state of Maryland.[1] It is observed on the anniversary of the March 25, 1634, landing of the first European settlers in the Province of Maryland, the third English colony to be settled in British North ..."
        },
        {
          id: 2,
          title: "08:00 AM | Beer Pong",
          start: new Date(new Date().setHours(new Date().getHours() - 3)),
          end: new Date(new Date().setHours(new Date().getHours() + 5)),
          background: "purple",
          text: "Maryland Day is a legal holiday in the U.S. state of Maryland.[1] It is observed on the anniversary of the March 25, 1634, landing of the first European settlers in the Province of Maryland, the third English colony to be settled in British North ..."
        },
        {
          id: 3,
          title: "08:00 PM | Ads Sundaze Burgers",
          start: new Date(new Date().setHours(new Date().getHours() - 3)),
          end: new Date(new Date().setHours(new Date().getHours() + 6)),
          background: "green",
          text: "Maryland Day is a legal holiday in the U.S. state of Maryland.[1] It is observed on the anniversary of the March 25, 1634, landing of the first European settlers in the Province of Maryland, the third English colony to be settled in British North ..."
        },
        {
          id: 4,
          title: "08:00 PM | New Visual Dakao DIPA Promotion",
          start: new Date(new Date().setHours(new Date().getHours() - 4)),
          end: new Date(new Date().setHours(new Date().getHours() + 7)),
          background: "green",
          text: "Maryland Day is a legal holiday in the U.S. state of Maryland.[1] It is observed on the anniversary of the March 25, 1634, landing of the first European settlers in the Province of Maryland, the third English colony to be settled in British North ..."
        },
        {
          id: 5,
          title: "05:00 AM | Beer Pong (18/10)",
          start: new Date(2020, 11, 20, 19, 30, 0),
          end: new Date(2020, 11, 22, 2, 0, 0),
          background: "orange",
          text: "Maryland Day is a legal holiday in the U.S. state of Maryland.[1] It is observed on the anniversary of the March 25, 1634, landing of the first European settlers in the Province of Maryland, the third English colony to be settled in British North ..."
        },
        {
          id: 6,
          title: "10:00 AM | Post 3 - Event happen",
          start: new Date(2020, 11, 24, 19, 30, 0),
          end: new Date(2020, 11, 25, 2, 0, 0),
          background: "gray",
          text: "Maryland Day is a legal holiday in the U.S. state of Maryland.[1] It is observed on the anniversary of the March 25, 1634, landing of the first European settlers in the Province of Maryland, the third English colony to be settled in British North ..."
        },
        {
          id: 7,
          title: "10:00 AM | Post 3 - Event happen",
          start: new Date(2020, 11, 20, 19, 30, 0),
          end: new Date(2020, 11, 23, 2, 0, 0),
          background: "pink",
          text: "Maryland Day is a legal holiday in the U.S. state of Maryland.[1] It is observed on the anniversary of the March 25, 1634, landing of the first European settlers in the Province of Maryland, the third English colony to be settled in British North ..."
        },
        {
          id: 8,
          title: "08:00 PM | New Visual Dakao DIPA Promotion",
          start: new Date(new Date().setHours(new Date().getHours() - 4)),
          end: new Date(new Date().setHours(new Date().getHours() + 18)),
          background: "green",
          text: "Maryland Day is a legal holiday in the U.S. state of Maryland.[1] It is observed on the anniversary of the March 25, 1634, landing of the first European settlers in the Province of Maryland, the third English colony to be settled in British North ..."
        },
        {
          id: 9,
          title: "08:00 PM | New Visual Dakao DIPA Promotion",
          start: new Date(new Date().setHours(new Date().getHours() + 15)),
          end: new Date(new Date().setHours(new Date().getHours() + 25)),
          background: "red",
          text: "Maryland Day is a legal holiday in the U.S. state of Maryland.[1] It is observed on the anniversary of the March 25, 1634, landing of the first European settlers in the Province of Maryland, the third English colony to be settled in British North ..."
        },
        {
          id: 10,
          title: "08:00 PM | New Visual Dakao DIPA Promotion",
          start: new Date(new Date().setHours(new Date().getHours() + 60)),
          end: new Date(new Date().setHours(new Date().getHours() + 80)),
          background: "red",
          text: "Maryland Day is a legal holiday in the U.S. state of Maryland.[1] It is observed on the anniversary of the March 25, 1634, landing of the first European settlers in the Province of Maryland, the third English colony to be settled in British North ..."
        },
        {
          id: 11,
          title: "08:00 AM | Ladies Night Video",
          start: new Date(new Date().setHours(new Date().getHours() + 80)),
          end: new Date(new Date().setHours(new Date().getHours() + 100)),
          background: "blue",
          text: "Maryland Day is a legal holiday in the U.S. state of Maryland.[1] It is observed on the anniversary of the March 25, 1634, landing of the first European settlers in the Province of Maryland, the third English colony to be settled in British North ..."
        }
      ],
      textBtnGroup: 'Month',
      textDayGroup: 'Today'
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

  CustomToggleToday = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="d-flex align-items-center justify-content-center rounded-1 border-1 fs-12 text-green py-2 px-3 text-decoration-none text-green"
    >
      <span className="fs-6 me-2 text-blue-0 opacity-75">{this.state.textDayGroup}</span>
      <FontAwesomeIcon icon={faChevronDown} />
    </a>
  ))

  eventPropGetter = (event) => {
    let newClassName;

    switch(event.background) {
      case "blue":
        newClassName = "event-blue";
        break;
      case "red":
        newClassName = "event-red";
        break;
      case "pink":
        newClassName = "event-pink";
        break;
      case "green":
        newClassName = "event-green";
        break;
      case "orange":
        newClassName = "event-orange";
        break;
      case "gray":
        newClassName = "event-gray";
        break;
      case "purple":
        newClassName = "event-purple";
        break;
      default:
        newClassName = "event-blue";
    }

    return {
      className: newClassName
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

      this.setState({
        textDayGroup: "Today"
      })
    };

    const goToSpecialDay = () => {
      this.setState({
        textDayGroup: 'Special days'
      })
    }

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
          <Dropdown>
            <Dropdown.Toggle
              as={this.CustomToggleToday}
              id="dropdown-custom-components"
            ></Dropdown.Toggle>
            <Dropdown.Menu className="shadow border-0 p-3">
                <Dropdown.Item onClick={goToCurrent} className="border-0 bg-transparent d-block w-100 color-blue-0 p-0 text-start mb-1">Today</Dropdown.Item>
                <Dropdown.Item onClick={goToSpecialDay} className="border-0 bg-transparent d-block w-100 color-blue-0 p-0 text-start mb-1">Special days</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <button className="btn-back fs-12 border-0 text-green bg-transparent" onClick={goToBack}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <label className="label-date fs-4 text-blue-0">{label()}</label>
          <button className="btn-next ms-2 fs-12 border-0 text-green bg-transparent" onClick={goToNext}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div>
        <div className="position-relative d-flex align-items-center">
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
          <div className="ms-2">
            <a 
              href={void(0)} 
              className="cursor-pointer border-1 py-2 w-98 text-blue-0 opacity-75 d-flex rounded-1 align-items-center justify-content-center text-decoration-none"
            >
              <i>
                <FontAwesomeIcon icon={faFilter} /> 
              </i>
              <span className="ms-2">Filter</span>
            </a>
          </div>
        </div>
        </div>
      </div >
    );
  };


  Event({ event }) {
    const popover = (
      <Popover id="popover-basic" className="bg-white z-index-100 rounded-2">
        <Popover.Title className="bg-blue-3 py-2 px-3 rounded-top d-flex justify-content-between align-items-center">
          <span className="text-blue-0 opacity-75 fw-bold">{event.title}</span>
          <a href={void(0)} className="cursor-pointer d-flex text-blue-3 text-decoration-none fs-4 align-items-center">...</a>
        </Popover.Title>
        <Popover.Content className="py-2 px-3">
          <p className="mb-0 mb-3">
            {event.text}
          </p>
          <div >
            <a href={void(0)} className="btn btn-success w-100">
              <i>
                <FontAwesomeIcon icon={faPlus} />
              </i>
              <span className="ms-2">Make a plan</span>
            </a>
          </div>
        </Popover.Content>
      </Popover>
    );
    
    return (
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <div className={`wrapper_des_event d-inline-block w-100`}>
          <a href={void(0)} className="w-100 text-decoration-none d-inline-block">
            <span>{event.title}</span>
          </a>
        </div>
      </OverlayTrigger>
    )
  }

  render() {
    return (
      <Calendar
        popup
        localizer={localizer}
        events={this.state.renderEvents}
        style={{ height: '90%' }}
        showMultiDayTimes
        components = {
          {
            toolbar : this.CustomToolbar,
            event: this.Event
          }
        }
        views={['month', 'day', 'agenda', 'week']}
        eventPropGetter={this.eventPropGetter}
      />
    );
  }
}

export default BigCalendarFull;


