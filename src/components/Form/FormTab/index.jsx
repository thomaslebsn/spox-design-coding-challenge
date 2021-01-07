import React, { Component, lazy } from "react";
import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";
import { observer } from "mobx-react";
import { Form } from "react-bootstrap";
import Label from "../Label";

import { Tabs, Tab, OverlayTrigger } from "react-bootstrap";
import Dropzone from "react-dropzone";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons/faImage";
import { faVideo } from "@fortawesome/free-solid-svg-icons/faVideo";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

import "emoji-mart/css/emoji-mart.css";
import { Emoji, Picker } from "emoji-mart";

import styles from "./index.module.scss";

const FormTab = observer(
  class FormTab extends Component {
    constructor(props) {
      super(props);

      this.state = {
        files: [],
        desc: "",
      };

      this.field = this.props.field;

      this.viewModel = this.field.viewModel;

      this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value,
      });

      this.field.changed(event);
    }

    handlePicker = (emoji) => {
      this.setState({ desc: `${this.state.desc}${emoji.native}` });
    };

    onDrop = (acceptedFiles) => {
      this.setState((state) => ({
        files: [...this.state.files, ...acceptedFiles],
      }));
    };

    render() {
      console.log("[FormTab] render");

      let { files, desc } = this.state;

      const preview = files.map((file) => (
        <div key={file.name} className="position-relative m-2">
          <img
            className={`img-thumbnail rounded ${styles.img}`}
            src={URL.createObjectURL(file)}
          />
        </div>
      ));

      const personaSelectionData = this.viewModel.personaSelectionData;

      const { field, validator } = this.props;

      console.log(personaSelectionData);
      return (
        personaSelectionData.length > 0 && (
          <>
            <Label text={field.label} required={field.required ?? false} />
            <div className="wrapper_tabs border-1 rounded pad">
              <Tabs defaultActiveKey="1" id="desc-tab">
                {personaSelectionData.map((item) => {
                  const channels = item[PERSONA_FIELD_KEY.CHANNELS];

                  return channels.map((value) => {
                    return (
                      <Tab
                        eventKey={value.id}
                        title={value.name}
                        className="p-1"
                      >
                        <Form.Control
                          name="desc"
                          as="textarea"
                          className="form-control border-0 rounded-0"
                          required={field.required ?? false}
                          defaultValue={field.value}
                          id={value.id}
                          onChange={this.handleInputChange}
                          onBlur={field.blurred ?? undefined}
                        />

                        {field.validation &&
                          this.props.validator.message(
                            field.label,
                            field.value,
                            field.validation,
                            { className: "text-danger" }
                          )}
                      </Tab>
                    );
                  });
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
          </>
        )
      );
    }
  }
);

export default FormTab;
