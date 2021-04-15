import React, { Component, lazy } from "react";
import "./index.scss";
import Iframe from "react-iframe";
import { AUTHORIZATION_KEY, AXIOS_CONFIGS } from "easii-io-web-service-library";
const ModalComponent = lazy(() => import("../../components/Modal"));

class DamButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  handleClick = () => {
    this.setState({
      showModal: true,
    });
  };

  closeModal = (s) => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const urlDam =
      AXIOS_CONFIGS.BASE_ENDPOINT_URL +
      "/administrator/index.php?option=com_aesir_dam&view=collection_assets&tmpl=component&token=" +
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
