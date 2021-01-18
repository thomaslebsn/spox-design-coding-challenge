import React from "react";
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons/faUserCog";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons/faUserCheck";
import { faHistory } from "@fortawesome/free-solid-svg-icons/faHistory";

class ContentSbarRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 0,
          icon: faUserCog,
          name: "Persona",
        },
        {
          id: 1,
          icon: faUserCheck,
          name: "Assign",
        },
        {
          id: 2,
          icon: faHistory,
          name: "History",
        },
      ],
    };
  }

  render() {
    let { data } = this.state;
    return (
      <div className="position-fixed top-0 end-0 bottom-0 w-80 vh-100 bg-white pd-t-80 shadow z-index-10">
        <ul className="list-unstyled py-3 px-2">
          {data.map((value, key) => {
            return (
              <li key={key} className="py-3 border-bottom-1">
                <a
                  href="#"
                  className="d-block text-center text-decoration-none"
                >
                  <i className="text-black">
                    <FontAwesomeIcon icon={value.icon} />
                  </i>
                  <span className="fs-14 text-black opacity-75 d-block">
                    {value.name}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withTranslation("common")(ContentSbarRight);
