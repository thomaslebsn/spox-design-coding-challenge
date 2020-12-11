import React from "react";
import { withTranslation } from "react-i18next";

import "./index.scss";

const data = [
  {
    key: 1,
    title: "Post 1 - Event announcement",
    campaign: "Independence day 2/9",
    schedule: "16/09/2020 | 08:00 AM",
    images: [
      "/assets/images/icon-nikon.png",
      "/assets/images/icon-nikon.png",
      "/assets/images/icon-nikon.png",
      "/assets/images/icon-nikon.png"
    ]
  },
  {
    key: 2,
    title: "Post 2 - Remind event",
    campaign: "Independence day 2/9",
    schedule: "16/09/2020 | 10:00 AM",
    images: [
      "/assets/images/icon-nikon.png",
      "/assets/images/icon-nikon.png",
      "/assets/images/icon-nikon.png"
    ]
  },
  {
    key: 3,
    title: "Post 1 - Real time: Covid post",
    campaign: "Christmas 2020",
    schedule: "16/09/2020 | 10:00 AM",
    images: [
      "/assets/images/icon-nikon.png",
      "/assets/images/icon-nikon.png",
      "/assets/images/icon-nikon.png"
    ]
  },
  {
    key: 4,
    title: "Post 3 - Event happen",
    campaign: "Independence day 2/9",
    schedule: "16/09/2020 | 10:00 AM",
    images: [
      "/assets/images/icon-nikon.png",
      "/assets/images/icon-nikon.png",
      "/assets/images/icon-nikon.png"
    ]
  }
]

class UpcomingPosts extends React.Component {
  render() {
    return (
      <div className="p-4">
        <h4 className="fs-4 mb-3">Upcoming Posts</h4>
        <div>
          {
            data.map((value, key) => {
              return (
                <div key={key} className="main_post rounded-2 shadow mb-3">
                  <div className="bg-blue rounded-top-2 text-blue-0 fw-bold py-2 px-3 d-flex justify-content-between align-items-center">
                    <span>{value.title}</span>
                    <a href={void(0)} className="cursor-pointer text-blue-0 text-decoration-none">...</a>
                  </div>
                  <div className="p-3">
                    <ul className="list-unstyled post_list_text">
                      <li className="fs-14 mb-2 row">
                        <span className="text-blue-0 col-4"><strong>Campaign:</strong></span>
                        <span className="col-8">{value.campaign}</span>
                      </li>
                      <li className="fs-14 row">
                        <span className="text-blue-0 col-4 "><strong>Schedule:</strong></span>
                        <span className="col-8">{value.schedule}</span>
                      </li>
                    </ul>
                    <ul className="list-unstyled d-flex post_list_images">
                      {
                        value.images.map((item, index) => {
                          return (
                            <li key={index} className="me-1">
                              <img src={item} className="img-avatar"/>
                            </li>
                          )
                        })
                      }
                    </ul>
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

export default withTranslation("common")(UpcomingPosts);
