import React from "react";
import { withTranslation } from "react-i18next";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons/faCalendarDay";
import { faFileExport } from "@fortawesome/free-solid-svg-icons/faFileExport";

import ModalComponent from "../../components/Modal";
import CreateProject from "../../components/CreateProject";

import SelectComponent from "../../components/Select";
import ComponentChart from "../../components/Chart";


const optionDay = [
  { value: "day-1", label: "Day 1" },
  { value: "day-2", label: "Day 2" },
  { value: "day-3", label: "Day 3" }
]

const optionExport = [
  { value: "day-1", label: "Day 1" },
  { value: "day-2", label: "Day 2" },
  { value: "day-3", label: "Day 3" }
]

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      stateDay: null,
      stateExport: null
    };
  }

  _handleShowModal = () => {
    this.setState({
      showModal: true
    })
  }

  handleModalShow = (s) => {
    this.setState({ 
      showModal: false 
    });
  };

  footerModal = () => {
    return (
      <Button className="btn btn-success w-100">
        <span className="me-2">Create project</span>
        <i><FontAwesomeIcon icon={faChevronRight} /></i>
      </Button>
    )
  }

  handleDay = (optionSelected) => {
    this.setState({
      stateDay: optionSelected
    })
  }

  handleExport = (optionSelected) => {
    this.setState({
      stateExport: optionSelected
    })
  }

  render() {
    const { t, i18n } = this.props;
    let { showModal, stateDay, stateExport } = this.state;

    return (
      <div className="py-4 px-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="fs-2">Campaigns Statistics</h2>
          <div className="d-flex align-items-center">
            {/* <a href={void(0)} className="cursor-pointer text-decoration-none btn btn-success" onClick={this._handleShowModal}>
              <span className="ps-2">Create project</span>
            </a> */}
            <div className="d-flex align-items-center border-1 bg-white rounded-2 ps-3 w-180">
              <i className="text-blue-0"><FontAwesomeIcon icon={faCalendarDay} /></i>
              <div className="flex-1">
                <SelectComponent 
                  value={stateDay}
                  onChange={this.handleDay}
                  options={optionDay}
                  isBorder={false}
                  placeholder='Last 30 days'
                  className="text-green"
                  plColor="rgba(8, 18, 64, 0.8)"
                />
              </div>
            </div>
            <div className="d-flex align-items-center border-1 border-green bg-green rounded-2 ps-3 w-150 ms-2">
              <i className="text-white"><FontAwesomeIcon icon={faFileExport} /></i>
              <div className="flex-1">
                <SelectComponent 
                  value={stateExport}
                  onChange={this.handleExport}
                  options={optionExport}
                  isBorder={false}
                  placeholder='Export'
                  className="text-white"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-6">
              <ComponentChart />
            </div>
            <div className="col-3">sdfsdf</div>
            <div className="col-3">sdfsdf sdf asdf ádfe</div>
          </div>
        </div>
        <ModalComponent
          header={"Create a new project"}
          body={() => <CreateProject />}
          footer={this.footerModal()}
          show={showModal}
          onHide={() => this.handleModalShow(false)}
        />
      </div>
    );
  }
}

export default withTranslation("common")(Projects);
