import React from 'react';
import { Nav, Accordion, useAccordionToggle } from 'react-bootstrap';

import ChartLine from "./ChartLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";


import styles from "./index.module.scss";

class ChannelAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panelIndex: ""
    };
  }
  
  render() {
    let { panelIndex } = this.state;
    let { data } = this.props;

    const CustomToggle = ({ children, eventKey }) => {
      const customOnClick = useAccordionToggle(eventKey, () => {
        this.setState({
          panelIndex: eventKey === panelIndex ? null : eventKey
        })
      })
  
      return (
        <Nav.Link onClick={customOnClick} className={`d-flex align-items-center justify-content-between p-3 ${eventKey === panelIndex ? "border-bottom-1" : ""}`}>
          {children}
          <i className="text-green fs-5"><FontAwesomeIcon icon={eventKey === panelIndex ? faMinus : faPlus} /></i>
        </Nav.Link>
      )
    }
    return (
      <Accordion>
        {
          data.map((value, index) => {
            return (
              <div key={index} className="bg-white rounded-3 mb-4">
                <CustomToggle eventKey={value.key}>
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={value.images} alt="" />
                    <span className="ms-2 fs-4 text-blue-0">{value.title}</span>
                  </div>
                </CustomToggle>
                <Accordion.Collapse eventKey={value.key}>
                  <div className="px-3">
                    {
                      value.dataList.map((item, key) => {
                        return (
                          <div key={key} className={`item_accordion ${styles.item_accordion} py-3 border-bottom-1 row align-items-center`}>
                            <div className="d-flex align-items-center col-3">
                              <img className="img-avatar" src={item.images} alt="" />
                              <span className="ms-2">{item.title}</span>
                            </div>
                            <div className="col-9">
                              <div className="row">
                                <ChartLine 
                                  data={item.chart}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                    
                  </div>
                </Accordion.Collapse>
              </div>
            )
          })
        }
        
      </Accordion>
    )
  }
}
export default ChannelAccordion;