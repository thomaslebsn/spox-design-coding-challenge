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
    campaignsFilterFormViewModel = null;
    contentData = null;

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

      this.campaignsFilterFormViewModel = viewModel
        ? viewModel.getCampaignsFilterFormViewModel()
        : null;

      console.log("this.campaignsFilterFormViewModel");
      console.log(this.campaignsFilterFormViewModel);
      console.log("After binding class");
      console.log(this.campaignsListViewModel);
    }

    componentDidMount() {
      this.campaignsListViewModel.initializeData();
      this.campaignsFilterFormViewModel.initData();
    }

    handerEditCampaign = (row) => {
      this.campaignsFormModalViewModal.loadForm(row[CAMPAIGNS_FIELD_KEY.ID]);
      this.campaignsListViewModel.getContentByIdCampaign(
        row[CAMPAIGNS_FIELD_KEY.ID]
      );
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

    getDataFormFilter = () => {
      return [
        {
          name: "Persona",
          option: [
            { value: "persona1", label: "Persona 1" },
            { value: "persona2", label: "Persona 2" },
            { value: "persona3", label: "Persona 3" },
          ],
        },
        {
          name: "Organisation",
          option: [
            { value: "organisation1", label: "Organisation 1" },
            { value: "organisation2", label: "Organisation 2" },
            { value: "organisation3", label: "Organisation 3" },
          ],
        },
        {
          name: "projects",
          option: [
            ...this.campaignsFilterFormViewModel.dropdownlistProjectValues,
          ],
          isMulti: true,
        },
        {
          name: "Campaigns",
          option: [
            { value: "campaigns1", label: "Campaigns 1" },
            { value: "campaigns2", label: "Campaigns 2" },
            { value: "campaigns3", label: "Campaigns 3" },
          ],
        },
        {
          name: "Content Type",
          option: [
            { value: "contentType1", label: "Content Type 1" },
            { value: "contentType2", label: "Content Type 2" },
            { value: "contentType3", label: "Content Type 3" },
          ],
        },
        {
          name: "Status",
          option: [
            { value: "status1", label: "Status 1" },
            { value: "status2", label: "Status 2" },
            { value: "status3", label: "Status 3" },
          ],
        },
        {
          name: "Assigness",
          option: [
            { value: "assigness1", label: "Assigness 1" },
            { value: "assigness2", label: "Assigness 2" },
            { value: "assigness3", label: "Assigness 3" },
          ],
        },
      ];
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
            searchFunction={this.campaignsListViewModel.searchCampaign}
            dataFormFilter={this.getDataFormFilter}
          ></Table>
        </div>
      );
    }
  }
);

export default withCampaignsViewModel(CampaignsList);
