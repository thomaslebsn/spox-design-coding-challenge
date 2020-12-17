import React from "react";
import { withTranslation } from "react-i18next";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";


import styles from "./index.module.scss";
import Checkbox from "../Checkbox";

class FilterCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          title: "Persona",
          name: "persona",
          listCheck: [
            {
              name: "persona-1",
              groupName: "persona",
              checked: true,
              value: "Hieu - Simple"
            },
            {
              name: "persona-2",
              groupName: "persona",
              checked: false,
              value: "Thao - Advance"
            },
            {
              name: "persona-3",
              groupName: "persona",
              checked: false,
              value: "Phu - Complex"
            }
          ]
        },
        {
          id: 2,
          title: "Organisation",
          name: "organisation",
          listCheck: [
            {
              name: "organisation-1",
              groupName: "organisation",
              checked: false,
              value: "redCHANNELS"
            },
            {
              name: "organisation-2",
              groupName: "organisation",
              checked: false,
              value: "redWEB redSHOP"
            },
            {
              name: "organisation-3",
              groupName: "organisation",
              checked: false,
              value: "redCOMPONENT"
            }
          ]
        },
        {
          id: 3,
          title: "Projects",
          name: "projects",
          listCheck: [
            {
              name: "projects-1",
              groupName: "projects",
              checked: false,
              value: "Marketing Vietnam Suntory PepsiCo"
            },
            {
              name: "projects-2",
              groupName: "projects",
              checked: false,
              value: "Marketing Vietnam Nikon"
            },
            {
              name: "projects-3",
              groupName: "projects",
              checked: false,
              value: "Marketing Vietnam Adidas"
            },
            {
              name: "projects-4",
              groupName: "projects",
              checked: false,
              value: "Marketing Vietnam Levi's"
            },
            {
              name: "projects-5",
              groupName: "projects",
              checked: false,
              value: "Shop Gap for Casual Women's"
            },
            {
              name: "projects-6",
              groupName: "projects",
              checked: false,
              value: "Men's Marketing Vietnam McDonalds"
            }
          ]
        },
        {
          id: 4,
          title: "Campaigns",
          name: "campaigns",
          listCheck: [
            {
              name: "campaigns-1",
              groupName: "campaigns",
              checked: false,
              value: "Independence day 2/9"
            },
            {
              name: "campaigns-2",
              groupName: "campaigns",
              checked: false,
              value: "Trung Thu 2020"
            },
            {
              name: "campaigns-3",
              groupName: "campaigns",
              checked: false,
              value: "New Year 2021"
            },
            {
              name: "campaigns-4",
              groupName: "campaigns",
              checked: false,
              value: "Beer Fridge"
            },
            {
              name: "campaigns-5",
              groupName: "campaigns",
              checked: false,
              value: "Lacaph"
            },
            {
              name: "campaigns-6",
              groupName: "campaigns",
              checked: false,
              value: "Pizza Reale"
            }
          ]
        },
        {
          id: 5,
          title: "Content type",
          name: "contenttype",
          listCheck: [
            {
              name: "contenttype-1",
              groupName: "contenttype",
              checked: false,
              value: "Social Media"
            },
            {
              name: "contenttype-2",
              groupName: "contenttype",
              checked: false,
              value: "Email Marketing"
            },
            {
              name: "contenttype-3",
              groupName: "contenttype",
              checked: false,
              value: "Digital advertising"
            }
          ]
        }
      ]
    };
  }

  handleCheck = (name) => {

    let { data } = this.state;

    data.map(value => {
      value.listCheck.map((item) => ({
        ...item,
        checked: item.name === name ? item.checked = !item.checked : item.checked,
        checked: item.groupName === name ? item.checked = true : item.checked
      }))
    })

    this.setState({
      data: data
    })
  }

  onCheckBoxChange = (name) => {
    this.handleCheck(name);
  }

  handleSelectAll = (name) => {
    this.handleCheck(name);
  }

  render() {
    const { t, i18n } = this.props;
    let { data } = this.state;

    return (
      <div className={`wrapper_filter_calendar ${styles.wrapper_filter_calendar} position-fixed top-0 end-0 bottom-0 z-index-100 start-0 d-flex justify-content-end vh-100`}>
        <div className="bg-white w-400 h-100">
          <div className="d-flex align-items-center justify-content-between p-3 border-bottom-1">
            <h4 className="text-blue-0 fw-medium">Filter</h4>
            <a href={void(0)} className="cursor-pointer text-green" onClick={this.props.handleCloseFilterCalendar}>
              <i>
                <FontAwesomeIcon icon={faTimes} />
              </i>
              <span className="ms-2">Clear all</span>
            </a>
          </div>
          <div className={`main_filter_calendar ${styles.main_filter_calendar} overflow-hidden overflow-y-auto`}>
            {
              data.map((value, key) => {
                return (
                  <div key={key} className="border-bottom-1 p-3">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <p className="text-blue-0 mb-0 text-uppercase">{value.title}</p>
                      <a href={void(0)} className="cursor-pointer fs-14 text-black opacity-50" onClick={() => this.handleSelectAll(value.name)}>Select all</a>
                    </div>
                    <div>
                      {
                        value.listCheck.map((item, index) => {
                          return (
                            <div key={index} className={`item_check_list ${styles.item_check_list} mb-3`}>
                              <Checkbox 
                                text={item.value}
                                checked={item.checked}
                                onCheckBoxChange={() => this.onCheckBoxChange(item.name)}
                              />
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="px-3 pt-4 pb-3">
            <Button 
              className="btn btn-success w-100"
            >
              <i>
                <FontAwesomeIcon icon={faFilter} /> 
              </i>
              <span className="ms-2">Filter</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(FilterCalendar);
