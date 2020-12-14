import React from "react";

import "./index.scss";
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

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFull: true
    };
  }

  handleCollapFull = () => {
    let { isFull } = this.state;

    this.setState({
      isFull: !isFull
    })
  }

  render() {
    let { isFull } = this.state;
    return (
      <div className="h-100">
        {
          isFull ? (
            <div className="d-flex">
              <div className="py-4 px-3 pe-400">
                <h2 className="mb-3 fw-normal text-blue-0">Good morning, <strong className="fw-bold">William White</strong></h2>
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
              <div className={`sdbar_right h-100 position-fixed end-0 top-0 bottom-0 pd-t-80 w-400`}>
                <a
                  href={void(0)} 
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
                <div className=" w-100 bg-white h-100 overflow-hidden overflow-y-auto" >
                  <BigCalendar />
                  <UpcomingPosts />
                </div>
              </div>
            </div>
          ) : (
            <div className="position-relative d-flex bg-white h-100">
              <a
                href={void(0)} 
                className="
                  item_collap 
                  item_collap_fixed
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
                "
                onClick={this.handleCollapFull}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </a>
              <div className="py-4 px-3 pe-400 w-100">
                <div className="wrapper_calendar wrapper_calendar_full h-100">
                    <h2 className="mb-3 fw-normal text-blue-0">Schedule</h2>
                  <BigCalendarFull />
                </div>
              </div>
              <div className={`sdbar_right h-100 position-fixed end-0 top-0 bottom-0 pd-t-80 w-400 `}>
                <div className="w-100 bg-white h-100 overflow-hidden overflow-y-auto" >
                  <div className="text-end p-4">
                    <a href={void(0)} className="cursor-pointer btn btn-success">
                      <i><FontAwesomeIcon icon={faPlus} /></i>
                      <span className="ps-2">New Schedule</span>
                    </a>
                  </div>
                  <UpcomingPosts />
                </div>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default HomePage;
