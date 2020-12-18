import React from "react";
import styles from "./index.module.scss";

const data = [
  {
    key: 1,
    images: "/assets/images/ic-facebook.svg",
    number: "2.344",
    des: "Total number of campaigns"
  },
  {
    key: 2,
    images: "/assets/images/ic-facebook.svg",
    number: "1.891",
    des: "Total number of published post"
  },
  {
    key: 3,
    images: "/assets/images/ic-facebook.svg",
    number: "1.004",
    des: "Total number of follower"
  },
  {
    key: 4,
    images: "/assets/images/ic-facebook.svg",
    number: "35,134",
    des: "Total number of engagement"
  }
]

class CampaignsTotalNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="h-100 d-flex flex-column justify-content-between">
        {
          data.map((value, key) => {
            return (
              <div key={key} className={`item_social ${styles.item_social} bg-white p-3 shadow-sm rounded-2`}>
                <div className={`main_social ${styles.main_social} d-flex`}>
                  <p className={`mb-0 wrapper_images ${styles.wrapper_images} d-flex align-items-center justify-content-center`}>
                    <img src={value.images} />
                  </p>
                  <div className="ps-2">
                    <p className="text-blue-0 opacity-50 mb-0">{value.des}</p>
                    <h4 className="text-blue-0 mb-0 fs-2">{value.number}</h4>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default CampaignsTotalNumber;
