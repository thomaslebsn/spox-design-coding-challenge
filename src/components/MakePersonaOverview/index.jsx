import React from "react";
import { withTranslation } from "react-i18next";
import Dropzone from "react-dropzone";
import { OverlayTrigger, Popover  } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons/faCloudUploadAlt";

import SelectComponent from "../Select";

import styles from "./index.module.scss";
import ComponentLinkChannels from "../ComponentLinkChannels";

const optionGender = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const optionstatus = [
  { value: "married", label: "Married" },
  { value: "married1", label: "Married 1" }
];

const optionChannels = [
  { value: "channels", label: "Channels" },
  { value: "channels1", label: "Channels 1" }
];

const optionInterest = [
  { 
    value: "design", 
    label: (
      <>
      <OverlayTrigger trigger="hover" placement="right" overlay={(
        <div id="popover-basic" className="bg-white py-3 px-4 w-260">
          <p className="fs-14">
            <span>Size:</span>
            <span>496,890,422</span>
          </p>
          <p className="fs-14">
            <span>Interest:</span>
            <span>{"Fitness and wellness > Physical fitness"}</span>
          </p>
          <p className="fs-14">
            <span>Description:</span>
            <span>{"Aliquam quis lorem facilisis, molestie lectus sed, gravida felis. Morbi fringilla viverra magna. Cras laoreet metus sed posuere eleifend. Sed facilisis dictum"}</span>
          </p>
        </div>
      )}>
        <span className="d-flex align-items-center justify-content-between">
          <span>Design</span>
          <span className="opacity-75">Design design</span>
        </span>
      </OverlayTrigger>
      </>
    ) 
  },
  { 
    value: "interior", 
    label: (
      <>
        <span className="d-flex align-items-center justify-content-between">
          <span>Interior</span>
          <span className="opacity-75">Interior design</span>
        </span>
      </>
    ) 
  },
  { 
    value: "fashion", 
    label: (
      <>
        <span className="d-flex align-items-center justify-content-between">
          <span>Fashion</span>
          <span className="opacity-75">Fashion design</span>
        </span>
      </>
    ) 
  },
  { 
    value: "graphic", 
    label: (
      <>
        <span className="d-flex align-items-center justify-content-between">
          <span>Graphic</span>
          <span className="opacity-75">Graphic design</span>
        </span>
      </>
    ) 
  },
  { 
    value: "industrial", 
    label: (
      <>
        <span className="d-flex align-items-center justify-content-between">
          <span>Graphic</span>
          <span className="opacity-75">Industrial design</span>
        </span>
      </>
    ) 
  },
  { 
    value: "architecture", 
    label: (
      <>
        <span className="d-flex align-items-center justify-content-between">
          <span>Architecture</span>
          <span className="opacity-75">Architecture design</span>
        </span>
      </>
    ) 
  }
];

class MakePersonaOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      gender: { value: "male", label: "Male" },
      status: { value: "married", label: "Married" },
      channels: { value: "channels", label: "Channels" },
      interest: null
    };
  }

  onDrop = (files) => {
    this.setState({ files });
  };

  handleGender = (selectedOption) => {
    this.setState({
      gender: selectedOption
    })
  }

  handleStatus = (selectedOption) => {
    this.setState({
      status: selectedOption
    })
  }

  handleChannels = (selectedOption) => {
    this.setState({
      channels: selectedOption
    })
  }

  handleInterest = (selectedOption) => {
    this.setState({
      interest: selectedOption
    })
  }

  render() {
    const { t, i18n } = this.props;
    let { files, gender, status, channels, interest } = this.state;

    const renderAvatar = files.map((file, index) => (
      <div
        key={file.name}
        className={`position-absolute position-absolute start-0 top-0 bottom-0 end-0 bg-white text-center`}
      >
        <img
          src={URL.createObjectURL(file)}
          className={`img-thumbnail rounded ${styles.img}`}
        />
      </div>
    ));

    return (
      <div className="row">
        <div className="col-4">
          <div className="border-start-5 bg-white p-2 mb-3 rounded-2">
            <label className="form-label mb-2" htmlFor="personaName">Persona name</label>
            <input type="text" className="form-control border-0" id="personaName" />
          </div>
          <div className="border-start-5 bg-white p-2 mb-3 rounded-2">
            <label className="form-label mb-2" htmlFor="name">Avatar</label>
            <Dropzone onDrop={this.onDrop} accept="image/*">
              {({ getRootProps, getInputProps }) => (
                <div className={`wrapper_avatar ${styles.wrapper_avatar} position-relative cursor-pointer`}>
                  <div
                    {...getRootProps()}
                    className="d-flex align-items-center justify-content-center p-3 outline-none"
                  >
                    <input
                      {...getInputProps()}
                      className="position-absolute start-0 top-0 bottom-0 end-0"
                    />
                    <div className="d-flex align-items-center">
                      <i className="fs-1 text-blue-0 opacity-25">
                        <FontAwesomeIcon icon={faCloudUploadAlt} />
                      </i>
                      <div className="text-center ms-1 fs-14 text-blue-0 opacity-75">
                        <p className="mb-0">Drag and drop a file here </p>
                        <p className="mb-0">
                          or <strong className="text-blue-3">Choose file</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  {renderAvatar}
                </div>
              )}
            </Dropzone>
          </div>
          <div className="border-start-5 bg-white p-2 mb-3 rounded-2">
            <p className="text-blue-0 opacity-75 mb-2 fs-5">Demographic</p>
            <div>
              <div className="mb-3">
                <label className="form-label mb-2" htmlFor="name">name</label>
                <input type="text" className="form-control" id="name" />
              </div>
              <div className="mb-3">
                <label className="form-label mb-2" htmlFor="age">Age</label>
                <input type="text" className="form-control" id="age" />
              </div>
              <div className="mb-3">
                <label className="form-label mb-2" htmlFor="age">Gender</label>
                <SelectComponent
                  value={gender}
                  onChange={this.handleGender}
                  options={optionGender}
                  className="text-green"
                  isBorder={true}
                  plColor="rgba(8, 18, 64, 0.8)"
                />
              </div>
              <div className="mb-3">
                <label className="form-label mb-2" htmlFor="location">Location</label>
                <input type="text" className="form-control" id="location" />
              </div>
              <div className="mb-3">
                <label className="form-label mb-2" htmlFor="jobTitle">Job Title</label>
                <input type="text" className="form-control" id="jobTitle" />
              </div>
              <div className="mb-3">
                <label className="form-label mb-2" htmlFor="sector">Sector</label>
                <input type="text" className="form-control" id="sector" />
              </div>
              <div className="mb-3">
                <label className="form-label mb-2" htmlFor="age">Marital Status</label>
                <SelectComponent
                  value={status}
                  onChange={this.handleStatus}
                  options={optionstatus}
                  className="text-green"
                  isBorder={true}
                  plColor="rgba(8, 18, 64, 0.8)"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="mb-3">
            <div className="border-start-5 bg-white p-2 mb-3 rounded-2">
              <label className="form-label mb-2">Bio</label>
              <textarea className="form-control border-0 rounded-0" rows="3" ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div>
                <p className="text-blue-0 opacity-75 fs-bold bg-blue-3 p-2 mb-2">Sources of information</p>
                <div className="border-start-5 bg-white p-2 mb-3 rounded-2">
                  <label className="form-label mb-2" htmlFor="tools">Tools</label>
                  <input type="text" className="form-control border-0" id="tools" />
                </div>
                <div className="border-start-5 bg-white p-2 mb-3 rounded-2">
                  <label className="form-label mb-2" htmlFor="website">Website</label>
                  <input type="text" className="form-control border-0" id="website" />
                </div>
                <div className="border-start-5 bg-white p-2 mb-3 rounded-2">
                  <label className="form-label mb-2" htmlFor="research">Vendor research</label>
                  <input type="text" className="form-control border-0" id="research" />
                </div>
                <div className="border-start-5 bg-white p-2 mb-3 rounded-2">
                  <label className="form-label mb-2" htmlFor="age">Channels</label>
                  <SelectComponent
                    value={channels}
                    onChange={this.handleChannels}
                    options={optionChannels}
                    className="text-green mb-3"
                    isBorder={true}
                    plColor="rgba(8, 18, 64, 0.8)"
                  />
                  <ComponentLinkChannels />
                </div>
                <div className="border-start-5 bg-white p-2 mb-3 rounded-2">
                  <label className="form-label mb-2" htmlFor="age">Interest</label>
                  <SelectComponent
                    value={interest}
                    onChange={this.handleInterest}
                    options={optionInterest}
                    className="text-green mb-3"
                    isBorder={true}
                    plColor="rgba(8, 18, 64, 0.8)"
                    isMulti
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div>
                <p className="text-blue-0 opacity-75 fs-bold bg-blue-3 p-2">Goals - Challenges - Paint point</p>
                <div className="border-start-5 bg-white p-2 mb-3 rounded-2">
                  <label className="form-label mb-2">Goals</label>
                  <textarea className="form-control border-0 rounded-0" rows="5" ></textarea>
                </div>
                <div className="border-start-5 bg-green-2 p-2 mb-3 rounded-2 border-green">
                  <label className="form-label mb-2">Challenges</label>
                  <textarea className="form-control border-0 rounded-0 bg-transparent" rows="5" ></textarea>
                </div>
                <div className="border-start-5 bg-red-2 p-2 rounded-2 border-red">
                  <label className="form-label mb-2">Paint point</label>
                  <textarea className="form-control border-0 rounded-0 bg-transparent" rows="5" ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(MakePersonaOverview);
