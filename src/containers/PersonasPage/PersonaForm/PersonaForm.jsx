import React, { Component, lazy } from "react";

import { FORM_FIELD_TYPE, FORMAT_DATE } from "../../../constants/FormFieldType";
import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

const FormComponentPersona = lazy(() => import("../FormComponentPersona"));

class PersonaForm extends Component {
  formPropsData = {
    [PERSONA_FIELD_KEY.NAME]: "",
    [PERSONA_FIELD_KEY.CREATED_DATE]: "",
    [PERSONA_FIELD_KEY.UPDATED_DATE]: "",
  };

  isEditMode = false;

  constructor(props) {
    super(props);
    this.state = {};

    this.viewModel = this.props.viewModel;

    this.isEditMode = this.viewModel.editMode === true;

    if (this.isEditMode) {
      this.populatingFormDataHandler(this.viewModel.personaEditdata[0]);
    }
  }

  generateFormSetting = () => {
    console.log("re generate Form Setting");
    return [
      {
        fields: [
          {
            label: "Name",
            key: PERSONA_FIELD_KEY.NAME,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[PERSONA_FIELD_KEY.NAME],
            required: true,
            validation: "required",
            changed: (event) => {
              this.formPropsData[PERSONA_FIELD_KEY.NAME] = event.target.value;
            },
          },
          {
            label: "Age",
            key: PERSONA_FIELD_KEY.AGE,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[PERSONA_FIELD_KEY.AGE],
            required: true,
            validation: "required",
            changed: (event) => {
              this.formPropsData[PERSONA_FIELD_KEY.AGE] = event.target.value;
            },
          },
          // {
          //   label: "Gender",
          //   key: PERSONA_FIELD_KEY.GENDER,
          //   type: FORM_FIELD_TYPE.SELECTION,
          //   value: this.formPropsData[PERSONA_FIELD_KEY.GENDER],
          //   required: true,
          //   validation: "required",
          //   changed: (event) => {
          //     this.formPropsData[PERSONA_FIELD_KEY.GENDER] = event.target.value;
          //   },
          // },
          {
            label: "Location",
            key: PERSONA_FIELD_KEY.LOCATION,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[PERSONA_FIELD_KEY.LOCATION],
            required: true,
            validation: "required",
            changed: (event) => {
              this.formPropsData[PERSONA_FIELD_KEY.LOCATION] =
                event.target.value;
            },
          },
          {
            label: "Job Title",
            key: PERSONA_FIELD_KEY.JOB_TITLE,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[PERSONA_FIELD_KEY.JOB_TITLE],
            required: true,
            validation: "required",
            changed: (event) => {
              this.formPropsData[PERSONA_FIELD_KEY.JOB_TITLE] =
                event.target.value;
            },
          },
          {
            label: "Sector",
            key: PERSONA_FIELD_KEY.SECTOR,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[PERSONA_FIELD_KEY.SECTOR],
            required: true,
            validation: "required",
            changed: (event) => {
              this.formPropsData[PERSONA_FIELD_KEY.SECTOR] = event.target.value;
            },
          },
        ],
      },
    ];
  };

  populatingFormDataHandler = (data) => {
    if (!data) return false;
    this.formPropsData[PERSONA_FIELD_KEY.NAME] = data.getName().value;
  };

  render() {
    console.log("[Persona - Form] - re-render .........");

    return (
      <FormComponentPersona
        generateFormSetting={() => this.generateFormSetting()}
        formPropsData={this.formPropsData}
        viewModel={this.viewModel}
        key={Math.random(40, 200)}
        formClassName={"personalFormCreate row"}
      />
    );
  }
}
export default PersonaForm;
