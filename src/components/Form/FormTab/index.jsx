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

import "./index.scss";
import { CanvaButton } from "../../CanvaButton";

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
            className={`img-thumbnail rounded imgTab`}
            src={URL.createObjectURL(file)}
          />
        </div>
      ));

      const personaSelectionData = this.viewModel.personaSelectionData;

      const { field, validator } = this.props;

      console.log("personaSelectionData tab");
      console.log(personaSelectionData);

      return (
        personaSelectionData.length > 0 && (
          <>
            <div className="wrapper_tabs border-1 rounded pad">
              <div className="d-flex justify-content-start p-3 ">
                <CanvaButton />
              </div>
              {this.state.files.length > 0 && (
                <div className={`d-flex justify-content-start border-top`}>
                  {preview}
                </div>
              )}
            </div>
          </>
        )
      );
    }
  }
);

export default FormTab;
