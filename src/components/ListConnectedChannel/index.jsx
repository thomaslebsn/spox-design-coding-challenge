import React from "react";
import styles from "./index.module.scss";

const defaultData = [
  {
    images: "/assets/images/ic-facebook.svg",
    des: "Facebook",
  },
  {
    images: "/assets/images/ic-facebook.svg",
    des: "Twitter",
  },
  {
    images: "/assets/images/ic-facebook.svg",
    des: "LinkedIn",
  },
  {
    images: "/assets/images/ic-facebook.svg",
    des: "Wordpress",
  },
  {
    images: "/assets/images/ic-facebook.svg",
    des: "Mailchimp",
  },
];

class ListConnectedChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { value } = this.props;
    const dataToRender = value ? value : defaultData;
    return (
      <div className="bg-white shadow-sm rounded-2 px-3 py-4 h-100 d-flex align-items-center">
        <div className="row">
          {dataToRender.map((value, key) => {
            return (
              <div
                key={Math.random(10000, 20000)}
                className={`item_social ${styles.item_social} col-3 mb-4 `}
              >
                <div
                  className={`main_social ${styles.main_social} text-center`}
                >
                  <p
                    className={`mb-0 wrapper_images ${styles.wrapper_images} d-flex align-items-center justify-content-center`}
                  >
                    <img alt={value.des} src={value.images} />
                  </p>
                  <p className="text-blue-0 opacity-50 mb-0">{value.des}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ListConnectedChannel;
