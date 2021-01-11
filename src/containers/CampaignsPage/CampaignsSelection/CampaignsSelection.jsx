import React, { Component, lazy } from "react";

import PAGE_STATUS from "../../../constants/PageStatus";
import { CAMPAIGNS_FIELD_KEY } from "../../../constants/CampaignsModule";

import Table from "../../../components/Table";

import { observer } from "mobx-react";
import { withCampaignsViewModel } from "../CampaignsViewModels/CampaignsViewModelContextProvider";

import Spinner from "../../../components/Spinner";

const ModalComponent = lazy(() => import("../../../components/Modal"));

const CampaignsSelection = observer(
  class CampaignsSelection extends Component {
    campaignsListViewModel = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("CampaignList - Debug View Model");
      console.log(viewModel);
      this.campaignsSelectionViewModel = viewModel
        ? viewModel.getCampaignsSelectionViewModel()
        : null;

      console.log("After binding class");
      console.log(this.campaignsSelectionViewModel);
    }

    componentDidMount() {
      this.campaignsSelectionViewModel.initializeData();
    }

    handerEditCampaign = (row) => {
      this.campaignsSelectionViewModel.setSelectionData(row);
      this.campaignsSelectionViewModel.closeModal();
    };

    render() {
      const { tableStatus, campaigns, show } = this.campaignsSelectionViewModel;

      if (!show) return null;

      console.log("[CampaignsSelection] - re-render .........");

      console.log(campaigns);

      const tableRowHeader = [
        {
          Header: "Name",
          accessor: CAMPAIGNS_FIELD_KEY.NAME, // accessor is the "key" in the data
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
      ];

      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <ModalComponent
          show={show}
          onHide={this.campaignsSelectionViewModel.closeModal}
          header={"Choose campaign"}
          dialogClassName="modal-lg"
          body={
            <Table
              rowData={campaigns}
              tableRowHeader={tableRowHeader}
              onEdit={this.handerEditCampaign}
              noSelection={true}
              noColumns={true}
            ></Table>
          }
          key={Math.random(40, 200)}
        />
      );
    }
  }
);

export default withCampaignsViewModel(CampaignsSelection);
