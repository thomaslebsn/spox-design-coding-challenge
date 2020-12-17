import React from "react";
import { Tabs, Tab, OverlayTrigger } from "react-bootstrap";

import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SelectComponent from "../Select";

import Dropzone from "react-dropzone";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons/faImage";
import { faVideo } from "@fortawesome/free-solid-svg-icons/faVideo";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

import "emoji-mart/css/emoji-mart.css";
import { Emoji, Picker } from "emoji-mart";

import "./index.scss";

import styles from "./index.module.scss";

const campaigns = [
  { value: "campaigns1", label: "campaigns11" },
  { value: "campaigns2", label: "campaigns2" },
  { value: "campaigns3", label: "campaigns3" },
];

const personas = [
  { value: "personas1", label: "personas1" },
  { value: "personas2", label: "personas2" },
  { value: "personas3", label: "personas3" },
];

const themes = [
  { value: "themes1", label: "themes1" },
  { value: "themes2", label: "themes2" },
  { value: "themes3", label: "themes3" },
];

class CreateContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: null,
      persona: null,
      theme: null,
      channels: [
        {
          id: 1,
          name: "facebook",
          title: "Facebook",
        },
        {
          id: 2,
          name: "advertising",
          title: "Advertising",
        },
      ],
      files: [],
      desc: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleCampaign = (selectedOption) => {
    this.setState((state) => ({ campaign: selectedOption }));
  };

  handlePersona = (selectedOption) => {
    this.setState((state) => ({ persona: selectedOption }));
  };

  handleTheme = (selectedOption) => {
    this.setState((state) => ({ theme: selectedOption }));
  };

  handlePicker = (emoji) => {
    this.setState({
      desc: `${this.state.desc}${emoji.native}`,
    });
  };

  onDrop = (acceptedFiles) => {
    this.setState((state) => ({
      files: [...this.state.files, ...acceptedFiles],
    }));
  };

  render() {
    let { channels, files, desc } = this.state;

    const preview = files.map((file) => (
      <div key={file.name} className="position-relative m-2">
        <img
          className={`img-thumbnail rounded ${styles.img}`}
          src={URL.createObjectURL(file)}
        />
      </div>
    ));

    return (
      <div className="bg-white p-4">
        <div className="col-6">
          <h3 className="mb-4">General</h3>
          <form>
            <div className="d-flex justify-content-between">
              <label className="form-label mb-2" htmlFor="email">
                Choose the campaign <span>*</span>
              </label>
              <Link>Create new</Link>
            </div>

            <SelectComponent
              value={this.state.campaign}
              onChange={this.handleCampaign}
              options={campaigns}
              className="mb-4"
            />

            <div className="d-flex justify-content-between">
              <label className="form-label mb-2" htmlFor="email">
                Choose the persona <span>*</span>
              </label>
              <Link>Create new</Link>
            </div>
            <SelectComponent
              value={this.state.persona}
              onChange={this.handlePersona}
              options={personas}
              isMulti={true}
              className="mb-4"
            />

            <label className="form-label mb-2" htmlFor="email">
              Choose theme <span>*</span>
            </label>
            <SelectComponent
              value={this.state.theme}
              onChange={this.handleTheme}
              options={themes}
              className="mb-4"
            />

            <label className="form-label mb-2" htmlFor="email">
              Headline
            </label>
            <input type="text" className="form-control mb-4" id="email" />

            <label className="form-label mb-2" htmlFor="email">
              Description
            </label>
            <div className="wrapper_tabs border-1 rounded pad">
              <Tabs defaultActiveKey="1" id="desc-tab">
                {channels.map((value) => {
                  return (
                    <Tab
                      eventKey={value.id}
                      title={value.title}
                      className="p-1"
                    >
                      <textarea
                        name="desc"
                        class="form-control border-0 rounded-0"
                        id={value.id}
                        rows="7"
                        onChange={this.handleInputChange}
                        value={desc}
                      ></textarea>
                    </Tab>
                  );
                })}
              </Tabs>
              <div className="d-flex justify-content-start p-3 border-top  ">
                <Dropzone onDrop={this.onDrop} multiple={true} accept="image/*">
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps({
                        className: "cursor-pointer pe-3",
                      })}
                    >
                      <input {...getInputProps()} />
                      <FontAwesomeIcon icon={faImage} />
                    </div>
                  )}
                </Dropzone>

                <Dropzone onDrop={this.onDrop} accept="video/*">
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps({
                        className: "cursor-pointer",
                      })}
                    >
                      <input {...getInputProps()} />
                      <FontAwesomeIcon icon={faVideo} />
                    </div>
                  )}
                </Dropzone>
                <div className="ms-auto ">
                  {" "}
                  <OverlayTrigger
                    placement="top-start"
                    trigger="click"
                    overlay={
                      <Picker
                        set="apple"
                        onSelect={(emoji) => this.handlePicker(emoji)}
                      />
                    }
                  >
                    <Emoji emoji="grinning" size={20} />
                  </OverlayTrigger>
                </div>
              </div>
              <div
                className={`d-flex justify-content-start ${
                  this.state.files.length > 0 && "border-top"
                }`}
              >
                {preview}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(CreateContent);
