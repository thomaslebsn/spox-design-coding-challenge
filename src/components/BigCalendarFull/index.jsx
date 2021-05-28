import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import moment from 'moment';

import './index.scss';
import FilterCalendar from '../FilterCalendar';
import CustomToolbar from './CustomToolbar';

const localizer = momentLocalizer(moment);

class BigCalendarFull extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      textBtnGroup: 'Month',
      textDayGroup: 'Today',
      isFilterCalendar: false,
    };

    const { events } = this.props;

    this.events = events ? events : [];
  }

  eventPropGetter = (event) => {
    return {
      style: { backgroundColor: event.background },
    };
  };

  handleNavigate = (date, view) => {
    this.props.onFilter(date, view);
  };

  Event({ event }) {
    const popover = (
      <Popover id="popover-basic" className="bg-white z-index-100 rounded-2">
        <Popover.Title className="bg-blue-3 py-2 px-3 rounded-top d-flex justify-content-between align-items-center">
          <span className="text-blue-0 opacity-75 fw-bold">{event.title}</span>
        </Popover.Title>
        <Popover.Content className="py-2 px-3">
          <p className="mb-0 mb-3">{event.text}</p>
          {/* <div>
            <a href={void 0} className="btn btn-success w-100">
              <i>
                <FontAwesomeIcon icon={faPlus} />
              </i>
              <span className="ms-2">Make a plan</span>
            </a>
          </div> */}
        </Popover.Content>
      </Popover>
    );

    return (
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <div className={`wrapper_des_event d-inline-block w-100 shadow`}>
          <a href={void 0} className="w-100 text-decoration-none d-inline-block">
            <span>{event.title}</span>
          </a>
        </div>
      </OverlayTrigger>
    );
  }

  handleFilterCalendar = () => {
    this.setState({
      isFilterCalendar: true,
    });
  };

  handleCloseFilterCalendar = () => {
    this.setState({
      isFilterCalendar: false,
    });
  };

  render() {
    console.log('[BigCalendarFull] render', this.props);
    return (
      <>
        <Calendar
          popup
          localizer={localizer}
          events={this.events}
          defaultDate={this.props.showDate}
          defaultView={this.props.showView}
          style={{ height: '90%' }}
          showMultiDayTimes
          components={{
            toolbar: CustomToolbar,
            event: this.Event,
          }}
          eventPropGetter={this.eventPropGetter}
          onNavigate={this.handleNavigate}
        />
        {this.state.isFilterCalendar && (
          <FilterCalendar handleCloseFilterCalendar={this.handleCloseFilterCalendar} />
        )}
      </>
    );
  }
}

export default BigCalendarFull;
