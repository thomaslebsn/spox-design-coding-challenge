import React, { Component } from "react";
import history from "../../../routes/history";

import PAGE_STATUS from "../../../constants/PageStatus";
import { CAMPAIGNS_FIELD_KEY } from "../../../constants/CampaignsModule";
import Table from "../../../components/Table";

import { observer } from "mobx-react";
import { withCampaignsViewModel } from "../CampaignsViewModels/CampaignsViewModelContextProvider";

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

    // handerEditCampaigns = (row) => {
    //   history.push(`/campaigns/edit/${row[CAMPAIGNS_FIELD_KEY.ID]}`, {
    //     form: true,
    //     id: row[CAMPAIGNS_FIELD_KEY.ID],
    //   });
    // };

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
      const {
        tableRowHeader,
        tableStatus,
        campaigns,
      } = this.campaignsListViewModel;
      console.log(campaigns);
      return tableStatus === PAGE_STATUS.LOADING ? (
        <div>Load</div>
      ) : (
        <Table
          rowData={campaigns}
          tableRowHeader={tableRowHeader}
          // onEdit={this.handerEditCampaigns}
          onSelect={this.handerSelectCampaigns}
        ></Table>
      );
    }
  }
);

export default withCampaignsViewModel(CampaignsList);
