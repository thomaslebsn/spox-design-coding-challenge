import React from "react";
import { withTranslation } from "react-i18next";

import "./index.scss";
import ProjectStore from "../../containers/ProjectsPage/ProjectStore/ProjectStore";

const projectStore = new ProjectStore();

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getDataProjects: [],
    };
  }

  componentDidMount = () => {
    projectStore.fetchProjects((data) => {
      this.setState({
        getDataProjects: data,
      });
    });
  };

  render() {
    const { t, i18n } = this.props;

    return (
      <div className="bg-white p-3">
        <div className="d-flex justify-content-between mb-2">
          <h4>{t("txt_projects")}</h4>
          <p className="mb-0 fs-14">{t("txt_more")}</p>
        </div>
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
          {this.state.getDataProjects.map((value, key) => {
            return (
              <div key={key} className="row py-3 border-bottom-1 item_project">
                <div className="col-9">
                  <div className="d-flex align-items-center">
                    <img src={value.logoUrl} alt="" className="img-avatar" />
                    <span className="ps-3">{value.name}</span>
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
          })}
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(Projects);
