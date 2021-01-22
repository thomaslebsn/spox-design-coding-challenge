import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withCampaignsViewModel } from "../CampaignsViewModels/CampaignsViewModelContextProvider";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

const ModalComponent = lazy(() => import("../../../components/Modal"));
const CampaignsForm = lazy(() => import("./CampaignsForm"));

const CampaignsFormModal = observer(
  class CampaignsFormModal extends Component {
    CampaignsFormModalViewModal = null;
    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("CampaignsFormModal - Debug View Model");
      console.log(viewModel);

      this.CampaignsFormModalViewModal = viewModel
        ? viewModel.getCampainsFormModalViewModel()
        : null;
    }

    saveCampaignsHandler = () => {
      this.CampaignsFormModalViewModal.saveOnModal();
    };

    render() {
      const { show } = this.CampaignsFormModalViewModal;
      return (
        <ModalComponent
          show={show}
          onHide={this.CampaignsFormModalViewModal.closeModal}
          header={"Create Campaign"}
          body={<CampaignsForm viewModel={this.CampaignsFormModalViewModal} />}
          footer={
            <Button
              onClick={this.saveCampaignsHandler}
              className="btn btn-success w-100"
            >
              <span>Create campaign</span>
              <i className="ms-1">
                <FontAwesomeIcon icon={faChevronRight} />
              </i>
            </Button>
          }
          key={Math.random(40, 200)}
        />
      );
    }
  }
);

export default withCampaignsViewModel(CampaignsFormModal);
