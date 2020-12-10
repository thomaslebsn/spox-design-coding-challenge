import React from "react";
import { withTranslation } from "react-i18next";

import "./index.scss";

const data = [
  {
    key: 1,
    image: "/assets/images/icon-pepsi.png",
    projectName: "Marketing Vietnam Suntory PepsiCo",
    avatar: "/assets/images/avatar.png",
    leadName: "Ponnappa Priya"
  },
  {
    key: 2,
    image: "/assets/images/icon-nikon.png",
    projectName: "Marketing Vietnam Suntory PepsiCo",
    avatar: "/assets/images/avatar.png",
    leadName: "Mia Wong"
  },
  {
    key: 3,
    image: "/assets/images/icon-adidas.png",
    projectName: "Marketing Vietnam Adidas",
    avatar: "/assets/images/avatar.png",
    leadName: "Peter Stanbridge"
  },
  {
    key: 4,
    image: "/assets/images/icon-levis.png",
    projectName: "Marketing Vietnam Levi's",
    avatar: "/assets/images/avatar.png",
    leadName: "Natalie Lee-Walsh"
  },
  {
    key: 5,
    image: "/assets/images/icon-gap.png",
    projectName: "MShop Gap for Casual Women's, Men's",
    avatar: "/assets/images/avatar.png",
    leadName: "Salome Simoes"
  }
]

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
          {
            data.map((value, key) => {
              return (
                <div key={key} className="row py-3 border-bottom-1 item_project">
                  <div className="col-9">
                    <div className="d-flex align-items-center">
                      <img src={value.image} alt="" className="img-avatar"/>
                      <span className="ps-3">{value.projectName}</span>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="d-flex align-items-center">
                      <img src={value.avatar} alt="" className="img-avatar"/>
                      <span className="ps-3">{value.leadName}</span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(Projects);
