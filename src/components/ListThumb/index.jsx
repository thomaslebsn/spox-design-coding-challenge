import React from "react";
import { withTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";

class ListThumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { t, i18n } = this.props;

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
                  eeeeeeeeeeee
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
