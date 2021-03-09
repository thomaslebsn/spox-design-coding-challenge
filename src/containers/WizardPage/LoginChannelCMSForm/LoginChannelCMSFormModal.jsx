import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withWizardViewModel } from "../WizardViewModels/WizardViewModelContextProvider";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
const ModalComponent = lazy(() => import("../../../components/Modal"));
const LoginChannelCMSForm = lazy(() => import("./LoginChannelCMSForm"));

const LoginChannelCMSFormModal = observer(
  class LoginChannelCMSFormModal extends Component {
    loginCMSChannelFormModalViewModel = null;

    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("LoginChannelCMSForm - Debug View Model");
      console.log(viewModel);

      this.loginCMSChannelFormModalViewModel = viewModel
        ? viewModel.getLoginCMSChannelFormModalViewModel()
        : null;
    }

    saveCMSHandler = () => {
      this.loginCMSChannelFormModalViewModel.saveCMSHandler();
    };
    // this.showModalConnectCMS("wordpress")
    render() {
      const { show } = this.loginCMSChannelFormModalViewModel;
      return (
        <React.Fragment>
          <a
            href={void 0}
            className="cursor-pointer btn btn-success"
            onClick={(e) => {
              this.props.clicked('wordpress');
            }}
          >
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            <span className="ms-2">
              {this.loginCMSChannelFormModalViewModel
                .isConnectWordpressSuccess == true
                ? "Connected"
                : "Connect"}
            </span>
          </a>
          <ModalComponent
            show={show}
            onHide={this.loginCMSChannelFormModalViewModel.closeModal}
            header={"Connect CMS Wordpress"}
            body={
              <LoginChannelCMSForm
                viewModel={this.loginCMSChannelFormModalViewModel}
              />
            }
            footer={
              <Button
                onClick={this.saveCMSHandler}
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
);

export default withWizardViewModel(LoginChannelCMSFormModal);
