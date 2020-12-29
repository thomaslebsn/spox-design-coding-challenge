import React from "react";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons/faCalendarDay";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";

import "./index.scss";

class ComponentDatepicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      isOpen: false,
      selectDate: "Last 0 days"
    };
  }

  handleShowPicker = () => {
    this.setState({
      isOpen: true
    })
  }

  onChange = (dates) => {
    const [start, end] = dates;

    this.setState({
      startDate: start,
      endDate: end,
    })
  }

  handleApply = (e) => {
    e.stopPropagation();

    let { startDate, endDate } = this.state;

    const ONE_DAY = 1000 * 60 * 60 * 24;
    const differenceMs = Math.abs(startDate - endDate);
    let dayCount =  Math.round((differenceMs / ONE_DAY) + 1);

    this.setState({
      selectDate: "Last " + dayCount + " days",
      isOpen: false
    })

  }

  MyContainer = ({ className, children}) => {
    let { startDate, endDate } = this.state;

    return (
      <div className="p-3 bg-white rounded-3 shadow">
        <div className={className}>
          <div className="position-relative border-0">{children}</div>
        </div>
        {
          startDate && (
            <div className="d-flex align-items-center justify-content-end border-top-1 pt-3">
              <p className="fs-14 color-bule-0 opacity-75 mb-0">{ startDate ? moment(startDate).format('LL') : ""} - {endDate ? moment(endDate).format('LL') : ""}</p>
              <a href={void(0)} className="btn btn-success ms-3" onClick={this.handleApply}>Apply</a>
            </div>
          )
        }
      </div>
    );
  };

  render() {

    let { startDate, endDate, selectDate, isOpen } = this.state;

    return (
      <div className="wrapper_datepicker d-flex align-items-center px-2 " onClick={this.handleShowPicker}>
        <i className="text-blue-0"><FontAwesomeIcon icon={faCalendarDay} /></i>
        <DatePicker 
          onChange={this.onChange}
          className="border-0 w-100 rounded-2 h-100 ps-2"
          monthsShown={2}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          calendarContainer={this.MyContainer}
          popperPlacement="bottom-end"
          placeholderText={selectDate}
          open={isOpen}
        />
        {/* <i className="text-green"><FontAwesomeIcon icon={faChevronDown} /></i> */}
      </div>
    );
  }
}

export default ComponentDatepicker;