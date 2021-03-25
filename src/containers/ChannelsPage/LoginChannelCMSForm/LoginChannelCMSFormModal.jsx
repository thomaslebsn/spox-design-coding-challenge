import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withChannelsViewModel } from "../ChannelsViewModels/ChannelsViewModelContextProvider";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import history from "../../../routes/history";

const ModalComponent = lazy(() => import("../../../components/Modal"));
const LoginChannelCMSForm = lazy(() => import("./LoginChannelCMSForm"));

class LoginChannelCMSFormModal extends Component {
  loginCMSChannelFormModalViewModel = null;

  constructor(props) {
    super(props);

    this.loginCMSChannelFormModalViewModel = this.props.loginCMSChannelFormModalViewModel;

    console.log("this.loginCMSChannelFormModalViewModel");
    console.log(this.loginCMSChannelFormModalViewModel);
  }

  saveCMSHandler = (channelUniqueName) => {
    this.loginCMSChannelFormModalViewModel.saveCMSHandler(
      this.props.organizationID,
      channelUniqueName
    );
  };

  render() {
    if (this.props.wordpressConnected == true) {
      this.loginCMSChannelFormModalViewModel.isConnectWordpressSuccess = true;
    }

    const {
      isConnectWordpressSuccess,
      closeModal,
    } = this.loginCMSChannelFormModalViewModel;

    return (
      <React.Fragment>
        <button
          className="cursor-pointer btn btn-success"
          onClick={(e) => {
            this.props.handleModalCms("wordpress");
          }}
          disabled={isConnectWordpressSuccess ? true : false}
        >
          <span className="ms-2">
            {isConnectWordpressSuccess ? "Connected" : "Connect"}
          </span>
        </button>
        <ModalComponent
          show={this.props.isModalCms}
          onHide={closeModal}
          header={"Connect CMS Wordpress"}
          body={
            <LoginChannelCMSForm
              viewModel={this.loginCMSChannelFormModalViewModel}
            />
          }
          footer={
            <Button
              onClick={(e) => this.saveCMSHandler("wordpress")}
              className="btn btn-success w-100"
            >
              <span>Login Wordpress</span>
              <i className="ms-1">
                <FontAwesomeIcon icon={faChevronRight} />
              </i>
            </Button>
          }
          key={Math.random(40, 200)}
        />
      </React.Fragment>
    );
  }
}

export default LoginChannelCMSFormModal;
