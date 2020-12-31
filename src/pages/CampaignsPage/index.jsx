import React from "react";
import { withTranslation } from "react-i18next";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faFileExport } from "@fortawesome/free-solid-svg-icons/faFileExport";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

import ModalComponent from "../../components/Modal";

import SelectComponent from "../../components/Select";
import ComponentChart from "../../components/Chart";
import ListSocial from "../../components/ListSocial";
import CampaignsTotalNumber from "../../components/CampaignsTotalNumber";
import FilterList from "../../components/FilterList";
import ComponentDatepicker from "../../components/ComponentDatepicker";
import TableListCampaigns from "../../components/TableListCampaigns";
import CreateCampaign from "../../components/CreateCampaign";

import Layout from "../../hoc/Layout";

const optionExport = [
  { value: "day-1", label: "Day 1" },
  { value: "day-2", label: "Day 2" },
  { value: "day-3", label: "Day 3" },
];

class CampaignsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      stateExport: null,
    };
  }

  _handleShowModalCampaign = () => {
    this.setState({
      showModal: true,
    });
  };

  handleModalShow = (s) => {
    this.setState({
      showModal: false,
    });
  };

  footerModal = () => {
    return (
      <Button className="btn btn-success w-100">
        <span className="me-2">Create campaign</span>
        <i>
          <FontAwesomeIcon icon={faChevronRight} />
        </i>
      </Button>
    );
  };

  handleExport = (optionSelected) => {
    this.setState({
      stateExport: optionSelected,
    });
  };

  bodyCreateCampaign = () => {
    return <CreateCampaign />;
  };

  render() {
    const { t, i18n } = this.props;
    let { showModal, stateExport } = this.state;

    return (
      <div className="py-4 px-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="fs-2">Campaigns Statistics</h2>
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center border-1 bg-white rounded-2 w-180">
              <ComponentDatepicker />
            </div>
            <div className="d-flex align-items-center border-1 border-green bg-green rounded-2 ps-3 w-150 ms-2">
              <i className="text-white">
                <FontAwesomeIcon icon={faFileExport} />
              </i>
              <div className="flex-1">
                <SelectComponent
                  value={stateExport}
                  onChange={this.handleExport}
                  options={optionExport}
                  isBorder={false}
                  placeholder="Export"
                  className="text-white"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div className="row">
            <div className="col-6">
              <ComponentChart />
            </div>
            <div className="col-3">
              <ListSocial />
            </div>
            <div className="col-3">
              <CampaignsTotalNumber />
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between mb-3">
            <h2 className="fs-2">List Campaigns</h2>
            <a
              href={void 0}
              className="cursor-pointer text-decoration-none btn btn-success"
              onClick={this._handleShowModalCampaign}
            >
              <i className="text-white">
                <FontAwesomeIcon icon={faPlus} />
              </i>
              <span className="ps-2">Create campaign</span>
            </a>
          </div>
          <FilterList />
          <TableListCampaigns />
        </div>
        <ModalComponent
          header={"Create Campaign"}
          body={this.bodyCreateCampaign()}
          footer={this.footerModal()}
          show={showModal}
          onHide={() => this.handleModalShow(false)}
        />
      </div>
    );
  }
}

export default withTranslation("common")(CampaignsPage);
