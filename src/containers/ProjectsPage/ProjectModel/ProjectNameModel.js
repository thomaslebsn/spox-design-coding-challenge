import React from "react";
import Helper from "../../../utils/helper";

class ProjectNameModel {
  constructor(data) {
    this.id = data.id ?? null;
    this.name = data.title ?? "";
    this.logo_url = Helper.isValidUrl(data.logo) ?? "";
  }

  getProjectName = () => {
    return (
      <>
        {this.logo_url ? (
          <img
            src={this.logo_url}
            alt="project-logo"
            className="img-avatar me-2"
          />
        ) : (
          ""
        )}
        {this.name}
      </>
    );
  };
}

export { ProjectNameModel };
