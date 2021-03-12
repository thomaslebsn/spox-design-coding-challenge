import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons/faEdit";

import SelectComponent from "../Select";

class ComponentPreviewPersona extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {};

  render() {
    let { data } = this.props;
    console.log("data data data 222", data);
    return (
      <div>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3>Preview Persona</h3>
          {/* <a
            href={void 0}
            className="cursor-pointer text-decoration-none text-green"
          >
            <i className="">
              <FontAwesomeIcon icon={faEdit} />
            </i>
            <span className="ms-1">Edit</span>
          </a> */}
        </div>
        <SelectComponent
          placeholder={data ? data.name : null}
          onChange={this.props.handleSelect}
          options={this.props.options}
          className="text-green bg-white rounded-2 mb-3"
          isBorder={true}
          plColor="rgba(8, 18, 64, 0.8)"
        />
        <div className="text-center mb-2">
          <img
            src={data ? data.image : null}
            className="w-110 h-110 object-fit-cover rounded-circle"
          />
        </div>
        <p>{data ? data.job_title : null}</p>
        <div>
          <div className="bg-blue-3 py-2 px-3">Demographic</div>
          <ul className="list-unstyled py-3">
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Name</span>
              <span className="flex-1">{data ? data.name : null}</span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Age</span>
              <span className="flex-1">{data ? data.age : null}</span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Gender</span>
              <span className="flex-1">{data ? data.gender.label : null}</span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Location</span>
              <span className="flex-1">{data ? data.location : null}</span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Job Title</span>
              <span className="flex-1">{data ? data.job_title : null}</span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Sector</span>
              <span className="flex-1">{data ? data.sector : null}</span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Marital Status</span>
              <span className="flex-1">
                {/* {data ? data.marital_status : null} */}
              </span>
            </li>
          </ul>
        </div>
        <div>
          <div className="bg-blue-3 py-2 px-3">Sources of information</div>
          <ul className="list-unstyled py-3">
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Tools</span>
              <span className="flex-1">{data ? data.tools : null}</span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Website</span>
              <span className="flex-1">{data ? data.website : null}</span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Vendor research</span>
              <span className="flex-1">
                {data ? data.vendor_research : null}
              </span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Social Networks</span>
              {/* <span className="flex-1">
                <ul className="list-unstyled d-flex post_list_images">
                  {item.images.map((i) => {
                    return (
                      <li className="me-2">
                        <img src={i} className="img-avatar" />
                      </li>
                    );
                  })}
                </ul>
              </span> */}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ComponentPreviewPersona;
