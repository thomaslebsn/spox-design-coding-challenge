import React, { Component, lazy } from "react";
import { Dropdown } from "react-bootstrap";

import ButtonNormal from "../../../components/ButtonNormal";
import { withCampaignsViewModel } from "../CampaignsViewModels/CampaignsViewModelContextProvider";

const CampaignsFormModal = lazy(() => import("./CampaignsFormModal"));

class CampaignsActionBar extends Component {
  campaignsFormModalViewModal = null;
  campaignsListViewModel = null;

  constructor(props) {
    super(props);

    const { viewModel } = props;
    console.log("CampaignsActionBar - Debug View Model");
    console.log(viewModel);

    this.campaignsFormModalViewModal = viewModel
      ? viewModel.getCampainsFormModalViewModel()
      : null;

    this.campaignsListViewModel = viewModel
      ? viewModel.getCampaignsListViewModel()
      : null;
  }

  createCampaignsHandler = () => {
    this.campaignsFormModalViewModal.openModal();
  };

  handerDeleteCampaigns = () => {
    this.campaignsListViewModel.deleteCampaigns();
  };

  render() {
    console.log("[CampaignsActionBar] - re-render .........");
    return (
      <div className="d-flex justify-content-end">
        <Dropdown className="me-3">
          <Dropdown.Toggle variant="info" id="actions">
            Choose an action
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={this.handerDeleteCampaigns}>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ButtonNormal
          onClick={this.createCampaignsHandler}
          iconStart={true}
          text="Create campaign"
        />
        <CampaignsFormModal />
      </div>
    );
  }
}

export default withCampaignsViewModel(CampaignsActionBar);
