import React from "react";
import ComponentNoData from "../ComponentNoData";
import "./index.scss";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { projects, PROJECT_COLUMN_INDICATOR } = this.props;

    return (
      <div className="bg-white p-3">
        <div className="d-flex justify-content-between mb-2">
          <h4>Projects</h4>
        </div>
        {
          projects ? (
            <>
              <div className="py-2 px-3 bg-blue">
                <div className="row">
                  <div className="col-9">
                    <span>Project Name</span>
                  </div>
                  <div className="col-3">
                    <span>Lead</span>
                  </div>
                </div>
              </div>
              <div className="px-3">
                {
                  projects.map((value, key) => {
                    return (
                      <div
                        key={key}
                        className="row py-3 border-bottom-1 item_project"
                      >
                        <div className="col-9">
                          <div className="d-flex align-items-center">
                            <span>{value[PROJECT_COLUMN_INDICATOR.NAME]}</span>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="d-flex align-items-center">
                            <img
                              src={"/assets/images/avatar-4.png"}
                              alt=""
                              className="img-avatar"
                            />
                            <span className="ps-3">Peter Stanbridge</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
              {
                projects.length >= 5 && (
                  <div className="text-end mt-3">
                    <a href="/projects" className="mb-0 text-decoration-underline">
                      Show more
                    </a>
                  </div>
                )
              }
            </>
          ) : (
            <ComponentNoData />
          )
        }
        
        
        
      </div>
    );
  }
}

export default Projects;
