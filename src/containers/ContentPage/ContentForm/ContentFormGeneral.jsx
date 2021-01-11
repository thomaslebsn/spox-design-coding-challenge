import React, { Component } from "react";

import { FORM_FIELD_TYPE } from "../../../constants/FormFieldType";
import { CONTENT_FIELD_KEY } from "../../../constants/ContentModule";

import ButtonNormal from "../../../components/ButtonNormal";

import SimpleReactValidator from "simple-react-validator";

import {
  PersonalSelectionPage,
  personaSelectionViewModal,
} from "./PersonalSelectionPage";

import {
  CampaignSelectionPage,
  campaignSelectionViewModal,
} from "./CampaignSelectionPage";

import { renderingGroupFieldHandler } from "../../../utils/form";

import { Form } from "react-bootstrap";

class ContentFormGeneral extends Component {
  formPropsData = {
    [CONTENT_FIELD_KEY.NAME]: "",
    [CONTENT_FIELD_KEY.CAMPAIGN]: "",
    [CONTENT_FIELD_KEY.PERSONA]: "",
    [CONTENT_FIELD_KEY.DESCRIPTION]: "",
  };

  validator = null;
  isEditMode = false;

  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator();
    this.viewModel = this.props.viewModel;

    this.viewModel.setForm(this);
  }

  generateFormSetting = () => {
    console.log("re generate Form Setting");
    return [
      {
        fields: [
          {
            label: "Choose the Campaign",
            key: CONTENT_FIELD_KEY.CAMPAIGN,
            type: FORM_FIELD_TYPE.SELECTION,
            value: this.formPropsData[CONTENT_FIELD_KEY.CAMPAIGN],
            required: true,
            validation: "required",
            viewModel: campaignSelectionViewModal,
            changed: () => {
              this.formPropsData[
                CONTENT_FIELD_KEY.CAMPAIGN
              ] = campaignSelectionViewModal.getSelectionData();
            },
            clicked: () => {
              campaignSelectionViewModal.openModal();
            },
          },
          {
            label: "Choose the Persona",
            key: CONTENT_FIELD_KEY.PERSONA,
            type: FORM_FIELD_TYPE.SELECTION,
            value: this.formPropsData[CONTENT_FIELD_KEY.PERSONA],
            required: true,
            validation: "required",
            viewModel: personaSelectionViewModal,
            changed: () => {
              this.formPropsData[
                CONTENT_FIELD_KEY.PERSONA
              ] = personaSelectionViewModal.getSelectionData();
            },
            clicked: () => {
              personaSelectionViewModal.openModal();
            },
          },
          {
            label: "Headline",
            key: CONTENT_FIELD_KEY.NAME,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[CONTENT_FIELD_KEY.NAME],
            required: true,
            validation: "required",
            changed: (event) => {
              this.formPropsData[CONTENT_FIELD_KEY.NAME] = event.target.value;
            },
            blurred: this.blurringFieldHandler,
          },
          {
            label: "Description",
            key: CONTENT_FIELD_KEY.DESCRIPTION,
            type: FORM_FIELD_TYPE.TAB,
            value: this.formPropsData[CONTENT_FIELD_KEY.DESCRIPTION],
            viewModel: personaSelectionViewModal,
            required: true,
            validation: "required",
            changed: (event) => {
              console.log("[Description] changed");
              this.formPropsData[CONTENT_FIELD_KEY.DESCRIPTION] =
                event.target.value;
            },
            blurred: this.blurringFieldHandler,
          },
        ],
      },
    ];
  };

  populatingFormDataHandler = (data) => {
    if (!data) return false;
    this.formPropsData[CONTENT_FIELD_KEY.NAME] = data.getName().value;
  };

  next = () => {
    if (this.isFormValid()) {
      this.props.nextStep();
    }
  };

  blurringFieldHandler = () => {
    console.log("blurringFieldHandler");
    this.isFormValid();
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

  render() {
    console.log("[Content - FormGeneral] - re-render .........");

    const formSetting = this.generateFormSetting();

    return (
      <>
        <div className="bg-white p-4">
          <div className="col-6">
            <h3 className="mb-4">General</h3>
            <Form key={Math.random(40, 200)}>
              {Object.keys(formSetting)
                .map((groupIndex) => {
                  return [...Array(formSetting[groupIndex])].map((group) => {
                    return renderingGroupFieldHandler(group, this.validator);
                  });
                })
                .reduce((arr, el) => {
                  return arr.concat(el);
                }, [])}
            </Form>
            <div className="d-flex justify-content-end">
              <ButtonNormal
                className="btn btn-success"
                text="Next"
                onClick={this.next}
              ></ButtonNormal>
            </div>
          </div>
        </div>

        <PersonalSelectionPage />
        <CampaignSelectionPage />
      </>
    );
  }
}
export default ContentFormGeneral;