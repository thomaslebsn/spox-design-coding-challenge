import React, { Component } from "react";
import history from "../../../routes/history";

import PAGE_STATUS from "../../../constants/PageStatus";
import { CAMPAIGNS_FIELD_KEY } from "../../../constants/CampaignsModule";
import Table from "../../../components/Table";
import ComponentChart from "../../../components/Chart";
import ListSocial from "../../../components/ListSocial";
import CampaignsTotalNumber from "../../../components/CampaignsTotalNumber";

import { observer } from "mobx-react";
import { withCampaignsViewModel } from "../CampaignsViewModels/CampaignsViewModelContextProvider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";

import Spinner from "../../../components/Spinner";

import getStatus from "../../../utils/status";
import CampaignsActionBar from "../CampaignsForm/CampaignsActionBar";

const CampaignsList = observer(
  class CampaignsList extends Component {
    campaignsListViewModel = null;
    campaignsFormModalViewModal = null;

    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("PersonaList - Debug View Model");
      console.log(viewModel);
      this.campaignsListViewModel = viewModel
        ? viewModel.getCampaignsListViewModel()
        : null;

      this.campaignsFormModalViewModal = viewModel
        ? viewModel.getCampainsFormModalViewModel()
        : null;

      console.log("After binding class");
      console.log(this.campaignsListViewModel);
    }

    componentDidMount() {
      this.campaignsListViewModel.initializeData();
    }

    handerEditCampaign = (row) => {
      this.campaignsFormModalViewModal.getCampaign(row[CAMPAIGNS_FIELD_KEY.ID]);
      this.campaignsFormModalViewModal.openModal();
    };

    handerSelectCampaigns = (data) => {
      this.campaignsListViewModel.campaignsIdsSelected = data
        .map((item) => {
          console.log("Debug An Item");
          console.log(item);
          return item[CAMPAIGNS_FIELD_KEY.ID];
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, []);
    };

    render() {
      console.log("[Quick Edit Product] - re-render .........");
      const {
        tableStatus,
        campaigns,
        pagination,
      } = this.campaignsListViewModel;

      const tableRowHeader = [
        {
          Header: "Campaign Name",
          accessor: CAMPAIGNS_FIELD_KEY.NAME,
          id: "expander",
          Cell: ({ row }) => (
            <div {...row.getToggleRowExpandedProps()} className="d-flex">
              {row.isExpanded ? (
                <i className="text-green">
                  <FontAwesomeIcon icon={faMinus} />
                </i>
              ) : (
                <i className="text-green">
                  <FontAwesomeIcon icon={faPlus} />
                </i>
              )}
              <span className="ms-2 fw-bold text-black opacity-75">
                {row.values.expander}
              </span>
            </div>
          ),
          SubCell: ({ row }) => (
            <span className="ps-4">{row.original.name}</span>
          ),
        },
        {
          Header: "Status",
          accessor: CAMPAIGNS_FIELD_KEY.STATUS,
          className: "status",
          Cell: ({ value }) => {
            console.log("value value sub", value);
            return (
              <span
                className={`badge ${value.className} mw-100 h-35 d-table-cell align-middle`}
              >
                {value.text}
              </span>
            );
          },
          SubCell: ({ row }) => (
            <span
              className={`badge ${
                getStatus(row.original.status).className
              }  mw-100 h-35 d-table-cell align-middle`}
            >
              {getStatus(row.original.status).text}
            </span>
          ),
        },
        {
          Header: "Start date",
          accessor: CAMPAIGNS_FIELD_KEY.START_DATE,
        },
        {
          Header: "End date",
          accessor: CAMPAIGNS_FIELD_KEY.END_DATE,
        },
        {
          Header: "Number of post that need to do",
          accessor: CAMPAIGNS_FIELD_KEY.NEED_TO_DO,
        },
        {
          Header: "Number of the schedude post",
          accessor: CAMPAIGNS_FIELD_KEY.SCHEDUDE_POST,
        },
        {
          Header: "Number of the published content",
          accessor: CAMPAIGNS_FIELD_KEY.PUBLISHED_CONTENT,
        },
        {
          Header: "Percentage campaign complete (%)",
          accessor: CAMPAIGNS_FIELD_KEY.PROGRESS,
        },
      ];

      console.log("Row Data is tableRowHeader");
      console.log(this.tableRowHeader);

      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <div>
          <div className="mb-4">
            <div className="row">
              <div className="col-lg-12 col-xl-6 mb-3 mb-xl-0">
                <ComponentChart />
              </div>
              <div className="col-md-6 col-xl-3 ">
                <ListSocial />
              </div>
              <div className="col-md-6 col-xl-3">
                <CampaignsTotalNumber />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="text-blue-0">List Campaigns</h2>
            <CampaignsActionBar />
          </div>
          <Table
            rowData={campaigns}
            tableRowHeader={tableRowHeader}
            onEdit={this.handerEditCampaign}
            onSelect={this.handerSelectCampaigns}
            isFilter={true}
            pagination={pagination}
            listViewModel={this.campaignsListViewModel}
          ></Table>
        </div>
      );
    }
  }
);

export default withCampaignsViewModel(CampaignsList);
