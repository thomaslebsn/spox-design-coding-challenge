import React, { Component } from "react";
import { Button, Accordion, Image } from "react-bootstrap";

import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

import ButtonNormal from "../../../components/ButtonNormal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";

import { personaSelectionViewModal } from "./PersonalSelectionPage";

import SimpleReactValidator from "simple-react-validator";

class ContentFormPublish extends Component {
  validator = null;

  constructor(props) {
    super(props);
    this.state = { pernona: true, social: true };

    this.validator = new SimpleReactValidator();
    this.viewModel = this.props.viewModel;
  }

  post = () => {
    if (this.isFormValid()) {
      this.viewModel.post();
    }
  };

  isFormValid = () => {
    console.log("isFormValid");
    console.log(this.formPropsData);
    if (this.validator.allValid()) {
      console.log("[is Form Valid]");

      return true;
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
      return false;
    }
  };

  handleCheck = (name) => {
    const { personaSelectionData } = personaSelectionViewModal;

    personaSelectionData.map((item) => {
      const channels = item[PERSONA_FIELD_KEY.CHANNELS];

      channels.map(
        (channel) => (
          console.log("channel channel", channel),
          {
            ...channel,
            checked:
              channel.name === name
                ? (channel.checked = !channel.checked)
                : channel.checked,
            checked:
              name === "deselectAll"
                ? (channel.checked = false)
                : channel.checked,
          }
        )
      );
    });

    this.setState({
      personaSelectionData,
    });
  };

  handleDeselect = (name) => {
    this.handleCheck(name);
  };

  handleItemCheck = (name) => {
    console.log("name", name);
    this.handleCheck(name);
  };

  render() {
    console.log("[Content - FormPublish] - re-render .........");

    const {
      personaSelectionData,
      channelSelectionData,
    } = personaSelectionViewModal;

    console.log("[Content - FormPublish] personaSelectionData");
    console.log(personaSelectionData);

    console.log("[Content - FormPublish] channelSelectionData");
    console.log(channelSelectionData);

    return (
      <div className="col-6">
        <h3 className="mb-4">Publish</h3>
        <div className="bg-white p-4">
          <Accordion defaultActiveKey="0" className="">
            {personaSelectionData.map((item) => {
              const channels = item[PERSONA_FIELD_KEY.CHANNELS];
              const name = item[PERSONA_FIELD_KEY.NAME];
              console.log("channels", channels);
              return (
                <div key={Math.random(40, 200)}>
                  <div className="mb-2">
                    <Accordion.Toggle
                      as={Button}
                      className="w-100 text-start d-flex justify-content-between align-items-center"
                      eventKey="0"
                      onClick={() =>
                        this.setState({ pernona: !this.state.pernona })
                      }
                    >
                      {name}
                      <FontAwesomeIcon
                        icon={this.state.pernona ? faMinus : faPlus}
                        color="#16b979"
                      />
                    </Accordion.Toggle>
                  </div>
                  <Accordion.Collapse eventKey="0">
                    <div className="py-4 d-flex align-items-center justify-content-between">
                      <div className="d-flex">
                        {channels.map((channel) => {
                          return (
                            <div
                              className={`position-relative me-2`}
                              key={Math.random(40, 200)}
                              onClick={() => this.handleItemCheck(channel.name)}
                            >
                              {channel.checked && (
                                <i className="text-green position-absolute start-0 bottom-0">
                                  <FontAwesomeIcon icon={faCheckCircle} />
                                </i>
                              )}

                              <Image
                                data-channel={channel.id}
                                src={channel.icon}
                                width="18"
                                className="position-absolute bottom-0 end-0"
                              />
                              <Image
                                src={channel.image}
                                className="rounded-circle border-1 cursor-pointer img-avatar"
                              />
                            </div>
                          );
                        })}
                      </div>
                      <a
                        href={void 0}
                        className="cursor-pointer text-black opacity-75 text-decoration-none"
                        onClick={() => this.handleDeselect("deselectAll")}
                      >
                        Deselect all
                      </a>
                    </div>
                  </Accordion.Collapse>
                </div>
              );
            })}
          </Accordion>

          <h3 className="mb-3">When to publish this?</h3>

          <Accordion defaultActiveKey="0" className="mb-3">
            <div className="mb-2">
              <Accordion.Toggle
                as={Button}
                className="w-100 bg-light text-body text-start d-flex justify-content-between align-items-center"
                eventKey="0"
                onClick={() => this.setState({ social: !this.state.social })}
              >
                Social Media
                <FontAwesomeIcon
                  icon={this.state.social ? faMinus : faPlus}
                  color="#16b979"
                />
              </Accordion.Toggle>
            </div>
            <Accordion.Collapse eventKey="0">
              <div className="py-4 d-flex">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="flexRadioDefault1"
                    defaultChecked
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Post now
                  </label>
                </div>
              </div>
            </Accordion.Collapse>
          </Accordion>

          <div className="d-flex justify-content-between">
            <Button
              className="btn btn-light border-success"
              onClick={this.props.previousStep}
            >
              Back
            </Button>
            <ButtonNormal
              className="btn btn-success"
              text="Post"
              onClick={this.post}
            ></ButtonNormal>
          </div>
        </div>
      </div>
    );
  }
}
export default ContentFormPublish;
