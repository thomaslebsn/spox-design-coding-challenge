import React from "react";

import { withTranslation } from "react-i18next";

import styles from "./index.scss";
import { Modal } from "react-bootstrap";

class ModalComponent extends React.Component {
  render() {
    let { header, footer, body, show, onHide } = this.props;

    return (
      <>
        <Modal show={show} onHide={onHide} centered>
          <Modal.Header closeButton className="px-4">
            <Modal.Title>{header}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">{body}</Modal.Body>
          <Modal.Footer className="px-4">{footer}</Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withTranslation("common")(ModalComponent);
