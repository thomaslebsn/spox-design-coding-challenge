import React from "react";

import { withTranslation } from "react-i18next";

import styles from "./index.scss";
import { Modal } from "react-bootstrap";

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
    };
  }

  render() {
    let { header, footer, body } = this.props;

    return (
      <>
        <Modal {...this.props} centered>
          <Modal.Header closeButton>
            <Modal.Title>{header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{body}</Modal.Body>
          <Modal.Footer>{footer}</Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withTranslation("common")(ModalComponent);
