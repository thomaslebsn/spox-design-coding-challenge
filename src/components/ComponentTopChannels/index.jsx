import React, { Component } from "react";
import { Dropdown, Tabs, Tab } from "react-bootstrap";

const dataTabs = [
  {
    name: "overall",
    text: "Overall",
  },
  {
    name: "facebook",
    text: "Facebook",
  },
  {
    name: "twitter",
    text: "Twitter",
  },
  {
    name: "linkedin",
    text: "Linkedin",
  },
  {
    name: "instagram",
    text: "Instagram",
  },
];

class ComponentTopChannels extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {};

  render() {
    let { data } = this.props;
    return (
      <div className="">
        <div className="d-flex justify-content-between mb-3 align-items-center">
          <div className="">
            <h4>Top Channels</h4>
          </div>
          <p className="mb-0 fs-14">View Report</p>
        </div>
        <div className="px-3">
          {data.map((value, key) => {
            return (
              <div
                key={key}
                className="row py-3 border-bottom-1 item_project d-flex align-items-center"
              >
                <div className="col-4">
                  <div className="d-flex align-items-center">
                    <img src={value.icon} alt="" className="img-avatar" />
                    <span className="ps-2">{value.text}</span>
                  </div>
                </div>
                <div className="col-2">
                  <span className="mw-100 h-35 fs-14 d-table-cell align-middle text-center rounded-2 bg-status-1">
                    Active
                  </span>
                </div>
                <div className="col-2">
                  <div>
                    <p className="mb-0">Posts</p>
                    <span>{value.posts}</span>
                  </div>
                </div>
                <div className="col-2">
                  <div>
                    <p className="mb-0">Page likes</p>
                    <span>{value.page_likes}</span>
                  </div>
                </div>
                <div className="col-2">
                  <div>
                    <p className="mb-0">Page views</p>
                    <span>{value.page_views}</span>
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

export default ComponentTopChannels;
