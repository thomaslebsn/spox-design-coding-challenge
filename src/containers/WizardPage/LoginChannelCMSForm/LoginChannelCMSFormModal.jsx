import React, { Component, lazy } from "react";

import { observer } from "mobx-react";
import { withWizardViewModel } from "../WizardViewModels/WizardViewModelContextProvider";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import history from "../../../routes/history";

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

    saveCMSHandler = (channelUniqueName) => {
      let getIdProject = history.location.pathname.match(/\d/g);
      getIdProject = getIdProject.join("");

      this.loginCMSChannelFormModalViewModel.saveCMSHandler(
        getIdProject,
        channelUniqueName
      );
    };
    // this.showModalConnectCMS("wordpress")
    render() {
      const {
        show,
        isConnectWordpressSuccess,
        closeModal,
      } = this.loginCMSChannelFormModalViewModel;
      return (
        <React.Fragment>
          <button
            className="cursor-pointer btn btn-success"
            onClick={(e) => {
              this.props.clicked("wordpress");
            }}
            disabled={isConnectWordpressSuccess ? true : false}
          >
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            <span className="ms-2">
              {isConnectWordpressSuccess ? "Connected" : "Connect"}
            </span>
          </button>
          <ModalComponent
            show={show}
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
                {/* <i className="ms-1">
                  <FontAwesomeIcon icon={faChevronRight} />
                </i> */}
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