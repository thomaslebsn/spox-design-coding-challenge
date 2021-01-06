import React from "react";
import { withTranslation } from "react-i18next";

const data = [
  {
    key: 1,
    campaignsName: "Independence day 2/9",
    startDate: "31/08/2020",
    endDate: "31/08/2020",
    status: "In progress",
    statusName: "progress",
  },
  {
    key: 2,
    campaignsName: "Trung thu 2020",
    startDate: "31/08/2020",
    endDate: "31/08/2020",
    status: "In progress",
    statusName: "progress",
  },
  {
    key: 3,
    campaignsName: "Christmas 2020",
    startDate: "31/08/2020",
    endDate: "31/08/2020",
    status: "In progress",
    statusName: "progress",
  },
  {
    key: 4,
    campaignsName: "New year's",
    startDate: "31/08/2020",
    endDate: "31/08/2020",
    status: "To do",
    statusName: "to",
  },
  {
    key: 5,
    campaignsName: "Lunar new year",
    startDate: "31/08/2020",
    endDate: "31/08/2020",
    status: "To do",
    statusName: "to",
  },
];

class AssignedToMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t, i18n } = this.props;
    return (
      <div className="bg-white p-3">
        <div className="d-flex justify-content-between mb-2">
          <h4>{t("txt_campaigns")}</h4>
          <p className="mb-0 fs-14">{t("txt_more")}</p>
        </div>
        <div className="py-2 px-3 bg-blue">
          <div className="row">
            <div className="col-6">
              <span>Campaign Name</span>
            </div>
            <div className="col-2">
              <span>Start date</span>
            </div>
            <div className="col-2">
              <span>End date</span>
            </div>
            <div className="col-2">
              <span>Status</span>
            </div>
          </div>
        </div>
        <div className="px-3">
          {data.map((value, key) => {
            return (
              <div key={key} className="row py-3 border-bottom-1 item_project">
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <span className="ps-3">{value.campaignsName}</span>
                  </div>
                </div>
                <div className="col-2">
                  <span>{value.startDate}</span>
                </div>
                <div className="col-2">
                  <span>{value.endDate}</span>
                </div>
                <div className="col-2">
                  <span
                    className={`w-98 fs-14 d-block py-2 text-center rounded-2 status-${value.statusName}`}
                  >
                    {value.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(AssignedToMe);
