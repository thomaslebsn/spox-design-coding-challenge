import React from "react";
import styles from "./index.module.scss";
import { observer } from "mobx-react";

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
const ListConnectedChannel = observer(
  class ListConnectedChannel extends React.Component {
    viewModel = null;
    constructor(props) {
      super(props);
      this.state = {};
      this.viewModel = props.field.viewModel
        ? props.field.viewModel
        : null;
      console.log("Debuggin -------- ListConnectedChannel ----- View Model");
      console.log(this.viewModel);
    }

    render() {
      const value = this.viewModel
        ? this.viewModel.connectedChannels
        : "";
      console.log("Debuggin -------- ListConnectedChannel");
      console.log(value);
      return (
        <div className="bg-white shadow-sm rounded-2 px-3 py-2 h-100 d-flex align-items-center">
          <div className="row w-100">
            {value
              ? value.map((value, key) => {
                  return (
                    <div
                      key={Math.random(10000, 20000)}
                      className={`item_social ${styles.item_social} col-2 mb-2 `}
                    >
                      <div
                        className={`main_social ${styles.main_social} text-center`}
                      >
                        <p
                          className={`mb-0 wrapper_images ${styles.wrapper_images} d-flex align-items-center justify-content-center`}
                        >
                          <img alt={value.des} src={value.images} className="img-avatar"/>
                        </p>
                        <p className="text-blue-0 opacity-50 mb-0">
                          {value.des}
                        </p>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      );
    }
  }
);

export default ListConnectedChannel;
