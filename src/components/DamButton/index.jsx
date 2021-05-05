import React, { Component, lazy } from "react";

import Iframe from "react-iframe";
import { AUTHORIZATION_KEY, AXIOS_CONFIGS } from "easii-io-web-service-library";
import { io } from "socket.io-client";
import "./index.scss";

const ModalComponent = lazy(() => import("../../components/Modal"));

const socket = io(AXIOS_CONFIGS.BASE_ENDPOINT_URL + ":9999");

class DamButton extends React.Component {
    _isMounted = false;
  constructor(props) {
    super(props);
    this.socket = socket;
    this.state = {
      showModal: false,
    };
  }

  handleClick = () => {
      console.log(AUTHORIZATION_KEY.TOKEN_USER);
      console.log(AXIOS_CONFIGS.BASE_ENDPOINT_URL + ":9999");
    this.socket.emit(
      "join room",
      localStorage.getItem(AUTHORIZATION_KEY.TOKEN_USER)
    );

    this.setState({
      showModal: true,
    });
  };

  closeModal = (s) => {
    this.setState({
      showModal: false,
    });
  };

    componentDidMount = () => {
        this._isMounted = true;

        this.socket.on("response assets", (roomId, data) => {
            if (this._isMounted) {
                this.closeModal();
            }
        });
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {

    const urlDam =
      AXIOS_CONFIGS.BASE_ENDPOINT_URL +
      "/administrator/index.php?option=com_aesir_dam&view=easii_dam&token=" +
      localStorage.getItem(AUTHORIZATION_KEY.TOKEN_USER);
    return (
      <>
        <button className="" onClick={this.handleClick} type="button">
          Dam button
        </button>
        <ModalComponent
          header={"Digital Assets"}
          body={
            <Iframe
              url={urlDam}
              width="100%"
              height="100%"
              id="ifram_digital_assets"
              className="myClassname ifram_digital_assets"
              display="initial"
              position="relative"
            />
          }
          show={this.state.showModal}
          onHide={this.closeModal}
          dialogClassName="modal-fullscreen modal_digital_assets "
        />
      </>
    );
  }
}

export default DamButton;
