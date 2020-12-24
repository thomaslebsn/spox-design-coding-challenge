import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ComponentHeaderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { title, textBtn, handleCreate, faIcons } = this.props;
    return (
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="fs-2">{title}</h2>
        {
          textBtn && (
            <a href="#" className={`cursor-pointer text-decoration-none btn ${isCreate ? "btn-light border-0" : "btn-success"}`} onClick={handleCreate}>
              <i className={`text-white`}><FontAwesomeIcon icon={faIcons} /></i>
              <span className="ps-2">{textBtn}</span>
            </a>
          )
        }
        
      </div>
    );
  }
}

export default ComponentHeaderPage;