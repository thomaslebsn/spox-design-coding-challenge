import React from "react";

import styles from "./index.module.scss";
import Complete from "../../components/Complete";
import Projects from "../../components/Projects";
import AssignedToMe from "../../components/AssignedToMe";
import Campaigns from "../../components/Campaigns";
import BigCalendar from "../../components/BigCalendar";
import UpcomingPosts from "../../components/UpcomingPosts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import BigCalendarFull from "../../components/BigCalendarFull";
import "./index.scss";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFull: true,
      isFullcalendar: false,
      isSbarRight: false,
    };
  }

  handleCollapFull = () => {
    let { isFull } = this.state;

    this.setState({
      isFull: !isFull,
    });
  };

  handleFullCalender = () => {
    document.body.classList.add("full_calender");
    this.setState({
      isFullcalendar: true,
    });
  };

  newSchedule = () => {
    return (
      <a
        href={void 0}
        className={`wrapper_new_schedule ${styles.wrapper_new_schedule} cursor-pointer btn btn-success`}
      >
        <i>
          <FontAwesomeIcon icon={faPlus} />
        </i>
        <span className="ps-2">New Schedule</span>
      </a>
    );
  };

  handleMenuRight = () => {
    document.body.classList.toggle("show_menu_right");
    this.setState({
      isSbarRight: !this.state.isSbarRight,
    });
  };

  render() {
    let { isFull, isFullcalendar, isSbarRight } = this.state;
    return (
      <div className="h-100 position-relative">
        <a
          href={void 0}
          className={`
              item_hambuger_icon
              d-none 
              position-absolute
              text-green 
              bg-blue-1 
              rounded-circle 
              align-items-center 
              justify-content-center
              fs-12
              cursor-pointer
              mt-1
              left-auto
              top-0
              z-index-100
            `}
          onClick={this.handleMenuRight}
        >
          <FontAwesomeIcon
            icon={!isSbarRight ? faChevronLeft : faChevronRight}
          />
        </a>
        {isFull ? (
          <div className="d-flex">
            <div className="py-4 px-3 pe-400">
              <h2 className="mb-3 fw-normal text-blue-0">
                Good morning, <strong className="fw-bold">William White</strong>
              </h2>
              <div className="mb-3">
                <Complete />
              </div>
              <div className="mb-3">
                <Projects />
              </div>
              <div className="mb-3">
                <AssignedToMe />
              </div>
              <div>
                <Campaigns />
              </div>
            </div>
            <div
              className={`sdbar_right h-100 position-fixed end-0 top-0 bottom-0 pd-t-80 w-400`}
            >
              <a
                href={void 0}
                className={`
                    item_collap 
                    d-flex 
                    position-absolute
                    text-green 
                    bg-blue-1 
                    rounded-circle 
                    align-items-center 
                    justify-content-center
                    fs-12
                    cursor-pointer
                    mt-5
                  `}
                onClick={this.handleCollapFull}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </a>
              <div className=" w-100 bg-white h-100 overflow-hidden overflow-y-auto">
                <BigCalendar />
                <UpcomingPosts />
              </div>
            </div>
          </div>
        ) : (
          <div className="position-relative d-flex bg-white h-100">
            <a
              href={void 0}
              className={`
                  item_collap
                  item_collap_fixed
                  ${styles.item_collap_fixed}
                  d-flex 
                  position-fixed
                  text-green 
                  bg-blue-1 
                  rounded-circle 
                  align-items-center 
                  justify-content-center
                  fs-12
                  cursor-pointer
                  mt-5
                  z-index-100
                `}
              onClick={this.handleCollapFull}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </a>
            <div
              className={`py-4 px-3 ${isFullcalendar ? "" : "pe-400"} w-100`}
            >
              <div className="wrapper_calendar wrapper_calendar_full h-100">
                <div className="mb-3 d-flex align-items-center justify-content-between">
                  <h2 className="fw-normal text-blue-0">Schedule</h2>
                  {isFullcalendar && this.newSchedule()}
                </div>
                <BigCalendarFull />
              </div>
            </div>
            {!isFullcalendar && (
              <div
                className={`sdbar_right h-100 position-fixed end-0 top-0 bottom-0 pd-t-80 w-400 `}
              >
                <div className="w-100 bg-white h-100 overflow-hidden overflow-y-auto">
                  <div className="p-4 d-flex justify-content-end">
                    {!isFullcalendar && this.newSchedule()}
                  </div>
                  <UpcomingPosts
                    isClose={true}
                    handleFullCalender={this.handleFullCalender}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default HomePage;
