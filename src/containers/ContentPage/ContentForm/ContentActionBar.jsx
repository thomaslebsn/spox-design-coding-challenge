import React, { Component, lazy } from "react";
import { Link } from "react-router-dom";

import { withContentViewModel } from "../ContentViewModels/ContentViewModelContextProvider";
import { Dropdown } from "react-bootstrap";

class ContentActionBar extends Component {
  contentFormViewModel = null;
  contentsListViewModel = null;
  constructor(props) {
    super(props);
    const { viewModel } = props;
    console.log("ContentActionBar - Debug View Model");
    console.log(viewModel);
    this.contentFormViewModel = viewModel
      ? viewModel.getContentFormViewModel()
      : null;

    this.contentsListViewModel = viewModel
      ? viewModel.getContentListViewModel()
      : null;

    console.log("ContentActionBar - After binding class");
    console.log(this.contentFormViewModel);
  }

  createContentHandler = (event) => {
    this.contentFormViewModel.openModal();
  };

  handerDeleteContent = () => {
    console.log("handerDeleteContent");
    this.contentsListViewModel.deleteContents();
  };

  render() {
    console.log("[ContentActionBar] - re-render .........");

    return (
      <div className="d-flex justify-content-end">
        <Dropdown className="me-3">
          <Dropdown.Toggle variant="info" id="actions">
            Choose an action
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={this.handerDeleteContent}>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Link
          to={{
            pathname: "/content/create",
          }}
          className="btn btn-success"
        >
          Create a new content
        </Link>
      </div>
    );
  }
}
export default withContentViewModel(ContentActionBar);