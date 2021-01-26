import React from "react";
import Helper from "../../../utils/helper";

class ProjectNameModel {
  constructor(name, logo) {
    this.name = name;
    this.logo = logo;
  }

  getProjectName = () => {
    return (
      <>
        {this.logo ? (
          <img src={this.logo} alt="project-logo" className="img-avatar me-2" />
        ) : (
          ""
        )}
        {this.name}
      </>
    );
  };
}

export { ProjectNameModel };
