import React from "react";
import { format } from "date-fns";

import CampaignsStore from "../../containers/CampaignsPage/CampaignsStore/CampaignsStore";
import { FORMAT_DATE } from "../../constants/FormFieldType";
import getStatus from "../../utils/status";

const campaignsStore = new CampaignsStore();

class Campaigns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    const { campaigns, CAMPAIGNS_FIELD_KEY } = this.props;

    return (
      <div className="bg-white p-3">
        <div className="d-flex justify-content-between mb-2">
          <h4>Campaigns</h4>
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
          {campaigns &&
            campaigns.map((value, key) => {
              console.log("valuevalue 456789", value);
              return (
                <div
                  key={key}
                  className="row py-3 border-bottom-1 item_project"
                >
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <span>{value[CAMPAIGNS_FIELD_KEY.NAME]}</span>
                    </div>
                  </div>
                  <div className="col-2">
                    <span>{value[CAMPAIGNS_FIELD_KEY.START_DATE]}</span>
                  </div>
                  <div className="col-2">
                    <span>{value[CAMPAIGNS_FIELD_KEY.END_DATE]}</span>
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
        <div className="text-end mt-3">
          <a href="/campaigns" className="mb-0 text-decoration-underline">
            Show more
          </a>
        </div>
      </div>
    );
  }
}

export default Campaigns;
