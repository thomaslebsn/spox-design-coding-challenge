import React, { Component, lazy } from "react";
import "./index.scss";
import Iframe from "react-iframe";
import { AUTHORIZATION_KEY, AXIOS_CONFIGS } from "easii-io-web-service-library";
import { io } from "socket.io-client";
const ModalComponent = lazy(() => import("../../components/Modal"));

const socket = io(AXIOS_CONFIGS.BASE_ENDPOINT_URL + ":9999");

class DamButton extends React.Component {
  constructor(props) {
    super(props);
    this.socket = socket;
    this.state = {
      showModal: false,
    };
  }

  handleClick = () => {
    this.socket.emit(
      "join room",
      localStorage.getItem(AUTHORIZATION_KEY.TOKEN_USER)
    );

    this.setState({
      showModal: true,
    });
  };

  componentDidMount = () => {};

  closeModal = (s) => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    this.socket.on("response assets", (roomId, data) => {
      console.log(data);
    });

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
              width="450px"
              height="450px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
            />
          }
          show={this.state.showModal}
          onHide={this.closeModal}
        />
      </>
    );
  }
}

export default DamButton;
