import React from "react";
import { withTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";

import SelectComponent from "../Select";

const optionAction = [
  { value: "action-1", label: "Action 1" },
  { value: "action-2", label: "Action 2" },
  { value: "action-3", label: "Action 3" },
]

class ListThumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anAction: null
    };
  }

  handleAnAction = (selectedOption) => {
    this.setState({
      anAction: selectedOption
    })
  }

  render() {
    const { t, i18n } = this.props;

    let { anAction } = this.state;

    return (
      <div className="bg-white rounded-3">
            <div className="row">
              <div className="col-3 border-end-1">
                <div className="input-group mb-0">
                  <input
                    type="text"
                    placeholder="Search your projects"
                    aria-describedby="button-search"
                    className="form-control border-end-0 pe-2 border-0"
                  />
                  <button
                    type="button"
                    id="button-search"
                    className="btn btn_search border-0 border-start-0 border-gray text-green"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
              <div className="col-2 border-end-1">
                <div className="">
                  <SelectComponent 
                    value={anAction}
                    onChange={this.handleAnAction}
                    options={optionAction}
                    className="mb-0 border-0 text-green"
                    isBorder={false}
                  />
                </div>
              </div>
              <div className="col-2 border-end-1">
                <div className="">
                    hhhhhhhhhhhhhhhhh
                </div>
              </div>
              <div className="col-5">

              </div>
            </div>
          </div>
    );
  }
}

export default withTranslation("common")(ListThumb);
