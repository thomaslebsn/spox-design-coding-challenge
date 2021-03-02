import React from "react";
import { withTranslation } from "react-i18next";
import { Tab, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons/faUserCog";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons/faUserCheck";
import { faHistory } from "@fortawesome/free-solid-svg-icons/faHistory";
import "./index.scss";

import ComponentPreviewPersona from "../ComponentPreviewPersona";

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
        // {
        //   id: 1,
        //   icon: faUserCheck,
        //   name: "Assign",
        // },
        // {
        //   id: 2,
        //   icon: faHistory,
        //   name: "History",
        // },
      ],
    };
  }

  render() {
    let { data } = this.state;
    return (
      <div className="wr_sbar_right position-fixed top-0 end-0 bottom-0 w-80 vh-100 bg-white pd-t-80 shadow z-index-10">
        <Tab.Container className="h-auto">
          <div className="position-relative h-100">
            <div>
              <Nav variant="pills" className="flex-column py-3 px-2">
                {data.map((value, index) => {
                  return (
                    <Nav.Item key={index} className="border-bottom-1">
                      <Nav.Link
                        eventKey={value.id}
                        className="d-block text-center text px-0 text-black"
                      >
                        <i className="">
                          <FontAwesomeIcon icon={value.icon} />
                        </i>
                        <span className="fs-14 opacity-75 d-block">
                          {value.name}
                        </span>
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
              </Nav>
            </div>

            <Tab.Content className="position-absolute top-0 end-100 w-400 mh-100 border-end-1 overflow-hidden overflow-y-auto">
              <Tab.Pane
                eventKey="0"
                className="wr_tabcontent_right bg-white p-3 h-100"
              >
                <ComponentPreviewPersona
                  previewPersonaFormViewModel={
                    this.props.previewPersonaFormViewModel
                  }
                />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
    );
  }
}

export default withTranslation("common")(ContentSbarRight);
