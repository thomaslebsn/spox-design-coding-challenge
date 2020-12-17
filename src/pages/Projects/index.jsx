import React from "react";
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

import ListThumb from "../../components/ListThumb";
import "./index.scss";
import List from "./List";
import Thumb from "./Thumb";
import ModalComponent from "../../components/Modal";
import CreateProject from "../../components/CreateProject";
import { Button } from "react-bootstrap";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isList: true,
      showModal: false
    };
  }

  _handleList = () => {
    let { isList } = this.state;

    this.setState({
      isList: !isList
    })

  }

  _handleShowModal = () => {
    this.setState({
      showModal: true
    })
  }

  handleModalShow = (s) => {
    this.setState({ 
      showModal: false 
    });
  };

  bodyModal = () => {
    return (
      <CreateProject />
    )
  }

  footerModal = () => {
    return (
      <Button className="btn btn-success w-100">
        <span className="me-2">Create project</span>
        <i><FontAwesomeIcon icon={faChevronRight} /></i>
      </Button>
    )
  }

  render() {
    const { t, i18n } = this.props;
    let { isList, showModal } = this.state;

    return (
      <div className="py-4 px-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="fs-2">Projects</h2>
          <a href={void(0)} className="cursor-pointer text-decoration-none btn btn-success" onClick={this._handleShowModal}>
            <i><FontAwesomeIcon icon={faPlus} /></i>
            <span className="ps-2">Create project</span>
          </a>
        </div>
        <div>
          <div className="mb-4">
            <ListThumb
              _handleList={this._handleList}
              isList={isList}
            />
          </div>
          <div>
            {
              isList ? (
                <List />
              ) : (
                <Thumb />
              )
            }
          </div>
        </div>
        
        <ModalComponent
          header={"Create a new project"}
          body={this.bodyModal()}
          footer={this.footerModal()}
          show={showModal}
          onHide={() => this.handleModalShow(false)}
        />
      </div>
    );
  }
}

export default withTranslation("common")(Projects);
