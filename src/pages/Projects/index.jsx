import React from "react";
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";

import ListThumb from "../../components/ListThumb";
import "./index.scss";
import List from "./List";
import Thumb from "./Thumb";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isList: true
    };
  }

  _handleList = () => {
    let { isList } = this.state;

    this.setState({
      isList: !isList
    })

  }

  render() {
    const { t, i18n } = this.props;
    let { isList } = this.state;

    return (
      <div className="py-4 px-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="fs-2">Projects</h2>
          <a href={void(0)} className="cursor-pointer text-decoration-none btn btn-success">
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
      </div>
    );
  }
}

export default withTranslation("common")(Projects);
