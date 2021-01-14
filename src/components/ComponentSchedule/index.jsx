import React, { Component } from "react";
import { Tab, Row, Nav, Col } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import ItemSchedule from "./ItemSchedule";

import { CONTENT_FIELD_KEY } from "../../constants/ContentModule";

class ComponentSchedule extends Component {
  formPropsData = {
    [CONTENT_FIELD_KEY.START_DATE]: "",
    [CONTENT_FIELD_KEY.END_DATE]: "",
  };

  constructor() {
    super();

    this.state = {
      data: [
        {
          id: 1,
          title: "Facebook",
          schedule: [
            {
              id: 1,
              image: "/assets/images/avatar-1.png",
              name: "Miley Cyrus",
              numbers: [
                { value: "01", label: "01" },
                { value: "02", label: "02" },
                { value: "03", label: "03" },
              ],
              days: [
                { value: "01", label: "01" },
                { value: "02", label: "02" },
                { value: "03", label: "03" },
              ],
              startDateTime: new Date(),
              timeDate: new Date(),
              publish: true,
              timeDateRange: new Date(),
              isToggle: false,
            },
            {
              id: 2,
              image: "/assets/images/avatar-1.png",
              name: "Miley Cyrus",
              numbers: [
                { value: "01", label: "01" },
                { value: "02", label: "02" },
                { value: "03", label: "03" },
              ],
              days: [
                { value: "01", label: "01" },
                { value: "02", label: "02" },
                { value: "03", label: "03" },
              ],
              startDateTime: new Date(),
              timeDate: new Date(),
              publish: false,
              timeDateRange: new Date(),
              isToggle: false,
            },
          ],
        },
        {
          id: 2,
          title: "Instagram",
          schedule: [
            {
              id: 1,
              image: "/assets/images/avatar-1.png",
              name: "Miley Cyrus 1",
              numbers: [
                { value: "01", label: "01" },
                { value: "02", label: "02" },
                { value: "03", label: "03" },
              ],
              days: [
                { value: "01", label: "01" },
                { value: "02", label: "02" },
                { value: "03", label: "03" },
              ],
              startDateTime: new Date(),
              timeDate: new Date(),
              publish: false,
              timeDateRange: new Date(),
              isToggle: false,
            },
            {
              id: 2,
              image: "/assets/images/avatar-1.png",
              name: "Miley Cyrus 1",
              numbers: [
                { value: "01", label: "01" },
                { value: "02", label: "02" },
                { value: "03", label: "03" },
              ],
              days: [
                { value: "01", label: "01" },
                { value: "02", label: "02" },
                { value: "03", label: "03" },
              ],
              startDateTime: new Date(),
              timeDate: new Date(),
              publish: true,
              timeDateRange: new Date(),
              isToggle: false,
            },
          ],
        },
      ],
    };
  }

  handleToggle = (name) => {
    let { data } = this.state;

    data.map((value) => {
      value.schedule.map((item) => ({
        ...item,
        isToggle:
          item.id === name ? (item.isToggle = !item.isToggle) : item.isToggle,
      }));
    });

    this.setState({
      data: data,
    });
  };

  render() {
    let { data } = this.state;
    let { isSwitch } = this.props;
    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="1">
        <Row>
          {isSwitch && (
            <Col sm={3} className="bg-blue-3 py-2 tabs_content">
              <Nav variant="pills" className="flex-column">
                {data.map((tab) => {
                  return (
                    <Nav.Item>
                      <Nav.Link eventKey={tab.id}>
                        {tab.title} [{tab.schedule.length}]
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
              </Nav>
            </Col>
          )}

          <Col sm={isSwitch ? 9 : 12} className="col-9 bg-blue py-3">
            <Tab.Content>
              {data.map((value) => {
                return (
                  <Tab.Pane eventKey={value.id}>
                    <div>
                      {value.schedule.map((item, key) => {
                        return (
                          <div key={key}>
                            <div
                              className="mb-2 d-flex align-items-center justify-content-between cursor-pointer"
                              onClick={() => this.handleToggle(item.id)}
                            >
                              <div className="d-flex align-items-center">
                                <img className="img-avatar" src={item.image} />
                                <span className="ps-2 text-black opacity-75">
                                  {item.name}
                                </span>
                              </div>
                              <i className="text-green fs-5">
                                <FontAwesomeIcon
                                  icon={item.isToggle ? faMinus : faPlus}
                                />
                              </i>
                            </div>
                            <div className="wr_item_schedule">
                              {item.isToggle && <ItemSchedule value={item} />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Tab.Pane>
                );
              })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default ComponentSchedule;
