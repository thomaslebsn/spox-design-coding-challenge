import React, { Component } from "react";
import { Button, Accordion, Image } from "react-bootstrap";

import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";
import { FORM_FIELD_TYPE } from "../../../constants/FormFieldType";
import { CONTENT_FIELD_KEY } from "../../../constants/ContentModule";

import ButtonNormal from "../../../components/ButtonNormal";
import ComponentSwitch from "../../../components/ComponentSwitch";
import ComponentSchedule from "../../../components/ComponentSchedule";
import FormSelectDropdown from "../../../components/Form/FormSelectDropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";

import { personaSelectionViewModal } from "./PersonalSelectionPage";

import SimpleReactValidator from "simple-react-validator";

import { observer } from "mobx-react";
import { withContentViewModel } from "../ContentViewModels/ContentViewModelContextProvider";
import PAGE_STATUS from "../../../constants/PageStatus";
import Spinner from "../../../components/Spinner";

const optionApproval = [
  {
    value: "design",
    label: "Design",
    text: "Design",
    type: "Interests",
    size: "496,890,422",
    interest: "Fitness and wellness > Physical fitness",
    description:
      "Aliquam quis lorem facilisis, molestie lectus sed, gravida felis. Morbi fringilla viverra magna. Cras laoreet metus sed posuere eleifend. Sed facilisis dictum",
  },
  {
    value: "interior",
    label: "Interior design",
    text: "Interior design",
    type: "Employers",
    size: "196,890,422",
    interest: "Fitness and wellness > Physical fitness",
    description:
      "Aliquam quis lorem facilisis, molestie lectus sed, gravida felis",
  },
  {
    value: "fashion",
    label: "Fashion design",
    text: "Fashion design",
    type: "Job Titles",
    type: "Employers",
    size: "342,890,422",
    interest: "Fitness and wellness > Physical fitness",
    description:
      "Aliquam quis lorem facilisis, molestie lectus sed, gravida felis",
  },
  {
    value: "graphic",
    label: "Graphic design",
    text: "Graphic design",
    type: "Interests",
    size: "888,890,453",
    interest: "Fitness and wellness > Physical fitness",
    description:
      "Aliquam quis lorem facilisis, molestie lectus sed, gravida felis",
  },
  {
    value: "industrial",
    label: "Industrial design",
    text: "Industrial design",
    type: "Titles Titles",
    size: "888,111,555",
    interest: "Fitness and wellness > Physical fitness",
    description:
      "Aliquam quis lorem facilisis, molestie lectus sed, gravida felis",
  },
  {
    value: "architecture",
    label: "Architecture design",
    text: "Architecture design",
    type: "Interests",
    size: "565,322,777",
    interest: "Fitness and wellness > Physical fitness",
    description:
      "Aliquam quis lorem facilisis, molestie lectus sed, gravida felis",
  },
];

const ContentFormPublish = observer(
  class ContentFormPublish extends Component {
    formPropsData = {};

    validator = null;

    constructor(props) {
      super(props);
      this.state = {
        pernona: true,
        social: true,
        isChecked: "radio_1",
        isSwitch: false,
      };

      this.validator = new SimpleReactValidator();
      const { viewModel, id } = props;

      console.log(id);
      console.log("ContentFormPage - Debug View Model");
      console.log(viewModel);
      this.contentFormViewModel = viewModel
        ? viewModel.getContentFormViewModel()
        : null;

      console.log("ContentFormPublish - viewModel");
      console.log(this.contentFormViewModel.contentEditdata);
    }

    post = () => {
      if (this.isFormValid()) {
        this.contentFormViewModel.post(
          this.contentFormViewModel.contentEditdata
        );
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

        channels.map((channel) => ({
          ...channel,
          checked:
            channel.name === name
              ? (channel.checked = !channel.checked)
              : channel.checked,
          checked:
            name === "deselectAll"
              ? (channel.checked = false)
              : channel.checked,
        }));
      });

      this.setState({
        personaSelectionData,
      });
    };

    handleDeselect = (name) => {
      this.handleCheck(name);
    };

    handleItemCheck = (name) => {
      this.handleCheck(name);
    };

    handleRadio = (name) => {
      this.setState({
        isChecked: name,
      });
    };

    handleChangeSwitch = (checked) => {
      console.log("isSwitch isSwitch", this.state.isSwitch);
      this.setState({
        isSwitch: !this.state.isSwitch,
      });
    };

    render() {
      let { isChecked, isSwitch } = this.state;
      console.log("[Content - FormPublish] - re-render .........");

      const {
        personaSelectionData,
        channelSelectionData,
      } = personaSelectionViewModal;

      const { formStatus } = this.contentFormViewModel;

      console.log("[Content - FormPublish] personaSelectionData");
      console.log(personaSelectionData);

      console.log("[Content - FormPublish] channelSelectionData");
      console.log(channelSelectionData);

      let fieldApproval = {
        key: PERSONA_FIELD_KEY.INTEREST,
        type: FORM_FIELD_TYPE.DROPDOWN,
        value: this.formPropsData[PERSONA_FIELD_KEY.INTEREST],
        required: true,
        validation: "required",
        option: optionApproval,
        changed: (event) => {
          this.formPropsData[PERSONA_FIELD_KEY.INTEREST] = event.value;
        },
        isComponents: true,
      };

      return formStatus == PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <div className="col-6">
          <h3 className="mb-4">Publish</h3>
          <div className="bg-white p-4">
            <Accordion defaultActiveKey="0" className="">
              {personaSelectionData.map((item) => {
                //const channels = item[PERSONA_FIELD_KEY.CHANNELS];
                const name = item[PERSONA_FIELD_KEY.NAME];
                const channels = [
                  {
                    id: 1,
                    name: "facebook 1",
                    image: "/assets/images/icon-pepsi.png",
                    icon: "/assets/images/facebook.png",
                    checked: true,
                  },
                  {
                    id: 2,
                    name: "instagram 1",
                    image: "/assets/images/icon-pepsi.png",
                    icon: "/assets/images/instagram.png",
                    checked: true,
                  },
                ];
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
                                onClick={() =>
                                  this.handleItemCheck(channel.name)
                                }
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
                <div className="py-4">
                  <div className="d-flex mb-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="flexRadioDefault1"
                        checked={isChecked === "radio_1" ? true : false}
                        name="radio_1"
                        onClick={() => this.handleRadio("radio_1")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Post now
                      </label>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="flexRadioDefault2"
                          checked={isChecked === "radio_2" ? true : false}
                          name="radio_2"
                          onClick={() => this.handleRadio("radio_2")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          Schedule
                        </label>
                      </div>
                      <ComponentSwitch
                        checked={isSwitch}
                        handleChange={this.handleChangeSwitch}
                        text={"Customize schedule for each channel"}
                        id="customize_schedule"
                      />
                    </div>
                    <ComponentSchedule isSwitch={isSwitch} />
                  </div>
                  <div className="d-flex mb-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="flexRadioDefault3"
                        checked={isChecked === "radio_3" ? true : false}
                        name="radio_3"
                        onClick={() => this.handleRadio("radio_3")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault3"
                      >
                        Save as draft
                      </label>
                    </div>
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
              {/* <div className="w-180">
                <FormSelectDropdown field={fieldApproval} />
              </div> */}
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
);

export default withContentViewModel(ContentFormPublish);
