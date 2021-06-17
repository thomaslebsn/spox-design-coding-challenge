import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons/faFolderOpen";

class ComponentNoData extends Component {
  render() {
    return (
      <div className="mt-5 text-center">
        <p className="mb-0">
          <i className="fs-1 text-blue-0 opacity-25 icon_not_found">
            <FontAwesomeIcon icon={faFolderOpen} />
          </i>
        </p>
        <p className="mb-0 fs-5 text-black-50">No Data Found !</p>
      </div>
    );
  }
}

export default ComponentNoData;
