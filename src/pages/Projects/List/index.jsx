import React from "react";
import { withTranslation } from "react-i18next";
import { ProgressBar, Pagination } from "react-bootstrap";

import "../index.scss";
import Checkbox from "../../../components/Checkbox";

const data = [
  {
    key: 1,
    image: "/assets/images/icon-pepsi.png",
    projectName: "Marketing Vietnam Suntory PepsiCo",
    avatar: "/assets/images/avatar-1.png",
    leadName: "Ponnappa Priya",
    startDay: "31/08/2020",
    endDay: "20/09/2020",
    progress: 70
  },
  {
    key: 2,
    image: "/assets/images/icon-nikon.png",
    projectName: "Marketing Vietnam Suntory PepsiCo",
    avatar: "/assets/images/avatar-2.png",
    leadName: "Mia Wong",
    startDay: "31/08/2020",
    endDay: "20/09/2020",
    progress: 50
  },
  {
    key: 3,
    image: "/assets/images/icon-adidas.png",
    projectName: "Marketing Vietnam Adidas",
    avatar: "/assets/images/avatar-3.png",
    leadName: "Peter Stanbridge",
    startDay: "31/08/2020",
    endDay: "20/09/2020",
    progress: 70
  },
  {
    key: 4,
    image: "/assets/images/icon-levis.png",
    projectName: "Marketing Vietnam Levi's",
    avatar: "/assets/images/avatar-4.png",
    leadName: "Natalie Lee-Walsh",
    startDay: "31/08/2020",
    endDay: "20/09/2020",
    progress: 50
  },
  {
    key: 5,
    image: "/assets/images/icon-gap.png",
    projectName: "MShop Gap for Casual Women's, Men's",
    avatar: "/assets/images/avatar-5.png",
    leadName: "Salome Simoes",
    startDay: "31/08/2020",
    endDay: "20/09/2020",
    progress: 90
  }
]

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t, i18n } = this.props;
    return (
      <div className="bg-white p-3 rounded-2">
        <div className="py-2 px-3 bg-blue">
          <div className="row">
            <div className="col-3 d-flex align-items-center">
              <Checkbox />
              <span className="ms-2">Project Name</span>
            </div>
            <div className="col-2">
              <span>Start date</span>
            </div>
            <div className="col-2">
              <span>End date</span>
            </div>
            <div className="col-3">
              <span>Lead</span>
            </div>
            <div className="col-2">
              <span>Progress</span>
            </div>
          </div>
        </div>
        <div className="px-3 mb-4">
          {
            data.map((value, key) => {
              return (
                <div key={key} className="row py-3 border-bottom-1 item_project align-items-center">
                  <div className="col-3">
                    <div className="d-flex align-items-center">
                      <Checkbox />
                      <img src={value.image} alt="" className="img-avatar ms-2"/>
                      <span className="ps-3">{value.projectName}</span>
                    </div>
                  </div>
                  <div className="col-2">
                    <span>{value.startDay}</span>
                  </div>
                  <div className="col-2">
                    <span>{value.endDay}</span>
                  </div>
                  <div className="col-3">
                    <div className="d-flex align-items-center">
                      <img src={value.avatar} alt="" className="img-avatar"/>
                      <span className="ps-3">{value.leadName}</span>
                    </div>
                  </div>
                  <div className="col-2">
                    <ProgressBar>
                      <ProgressBar variant="success" now={value.progress} label={`${value.progress}%`}/>
                    </ProgressBar>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className={`wrapper_pagination d-flex justify-content-center`}>
          <Pagination>
            <Pagination.Prev className="prev"/>
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Item>{4}</Pagination.Item>
            <Pagination.Item>{5}</Pagination.Item>
            <Pagination.Next className="next"/>
          </Pagination>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(List);
