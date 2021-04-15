import React, { Component, lazy } from "react";
import "./index.scss";
import Iframe from "react-iframe";
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
    return (
      <>
        <button className="" onClick={this.handleClick} type="button">
          Dam button
        </button>
        <ModalComponent
          body={
            <Iframe
              url="http://www.youtube.com/embed/xDMP3i36naA"
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
