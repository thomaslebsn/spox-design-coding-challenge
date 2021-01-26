import React from "react";
import { withTranslation } from "react-i18next";
import { format } from "date-fns";

import CampaignsStore from "../../containers/CampaignsPage/CampaignsStore/CampaignsStore";
import { FORMAT_DATE } from "../../constants/FormFieldType";
import getStatus from "../../utils/status";

const campaignsStore = new CampaignsStore();

class AssignedToMe extends React.Component {
  getDataCampaigns = [];
  constructor(props) {
    super(props);
    this.state = {
      getDataCampaigns: [],
    };
  }

  componentDidMount = () => {
    campaignsStore.fetchCampaigns((data) => {
      this.getDataCampaigns = data;
      this.setState({
        getDataCampaigns: data,
      });
    });
  };

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
          {this.state.getDataCampaigns.map((value, key) => {
            return (
              <div key={key} className="row py-3 border-bottom-1 item_project">
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <span>{value.name}</span>
                  </div>
                </div>
                <div className="col-2">
                  <span>
                    {value.startdate
                      ? format(new Date(value.startdate), FORMAT_DATE)
                      : ""}
                  </span>
                </div>
                <div className="col-2">
                  <span>
                    {value.enddate
                      ? format(new Date(value.enddate), FORMAT_DATE)
                      : ""}
                  </span>
                </div>
                <div className="col-2">
                  <span
                    className={`mw-100 h-35 fs-14 d-table-cell align-middle text-center rounded-2 bg-status-${value.status}`}
                  >
                    {value.status ? getStatus(value.status) : ""}
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
