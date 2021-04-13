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
    const { isModalCms } = this.props;
    const { cmsChannelType, closeModal } = this.loginCMSChannelFormModalViewModel;


    let header = '';
    let buttonTitle = '';
    let isConnected = false;
    let eventName = '';
    switch (cmsChannelType) {
      case 1:
        header = 'Connect CMS Wordpress';
        buttonTitle = 'Login Wordpress';
        eventName = 'wordpress';
        break;
      case 2:
        header = 'Connect CMS Drupal';
        buttonTitle = 'Login Drupal';
        eventName = 'drupal';
        break;
      default:
        break;
    }

    return (
      <React.Fragment>
        <ModalComponent
          show={isModalCms}
          onHide={closeModal}
          header={header}
          body={
            <LoginChannelCMSForm
              viewModel={this.loginCMSChannelFormModalViewModel}
            />
          }
          footer={
            <Button
              onClick={(e) => this.saveCMSHandler(eventName)}
              className="btn btn-success w-100"
            >
              <span>{buttonTitle}</span>
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
