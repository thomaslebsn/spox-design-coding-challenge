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

const CampaignsList = observer(
  class CampaignsList extends Component {
    campaignsListViewModel = null;

    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("PersonaList - Debug View Model");
      console.log(viewModel);
      this.campaignsListViewModel = viewModel
        ? viewModel.getCampaignsListViewModel()
        : null;

      console.log("After binding class");
      console.log(this.campaignsListViewModel);
    }

    componentDidMount() {
      this.campaignsListViewModel.initializeData();
    }

    handerEditCampaigns = (row) => {
      history.push(`/campaigns/edit/${row[CAMPAIGNS_FIELD_KEY.ID]}`, {
        form: true,
        id: row[CAMPAIGNS_FIELD_KEY.ID],
      });
    };

    handerSelectCampaigns = (data) => {
      this.campaignsListViewModel.campaignsIdsSelected = data
        .map((item) => {
          console.log("Debug An Item");
          console.log(item);
          return item.id;
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, []);
    };

    render() {
      console.log("[Quick Edit Product] - re-render .........");
      const { tableStatus, campaigns } = this.campaignsListViewModel;

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
            return (
              <span
                className={`badge ${value.className} mw-100 h-35 d-table-cell align-middle`}
              >
                {value.text}
              </span>
            );
          },
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
          <Table
            rowData={campaigns}
            tableRowHeader={tableRowHeader}
            onEdit={this.handerEditCampaigns}
            onSelect={this.handerSelectCampaigns}
            isFilter={true}
          ></Table>
        </div>
      );
    }
  }
);

export default withCampaignsViewModel(CampaignsList);
