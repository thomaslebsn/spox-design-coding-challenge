import React, { Component } from "react";

import FormComponent from "../../../components/Form";
import { FORM_FIELD_TYPE, FORMAT_DATE } from "../../../constants/FormFieldType";
import { PROJECT_COLUMN_INDICATOR } from "../../../constants/ProjectModule";

class ProjectForm extends Component {
  formPropsData = {
    [PROJECT_COLUMN_INDICATOR.NAME]: "",
    [PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION]: "",
    [PROJECT_COLUMN_INDICATOR.START_DATE]: "",
    [PROJECT_COLUMN_INDICATOR.END_DATE]: "",
    [PROJECT_COLUMN_INDICATOR.LOGO]: "",
  };

  isEditMode = false;

  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };

    this.viewModel = this.props.viewModel;

    this.isEditMode = this.viewModel.editMode === true;

    if (this.isEditMode) {
      this.populatingFormDataHandler(this.viewModel.projectEditdata);
    }
  }

  generateFormSetting = () => {
    console.log("re generate Form Setting");
    return [
      {
        fields: [
          {
            label: "Name",
            key: PROJECT_COLUMN_INDICATOR.NAME,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[PROJECT_COLUMN_INDICATOR.NAME],
            required: true,
            validation: "required",
            changed: (event) => {
              this.formPropsData[PROJECT_COLUMN_INDICATOR.NAME] =
                event.target.value;
            },
          },
          {
            label: "Start Date",
            key: PROJECT_COLUMN_INDICATOR.START_DATE,
            type: FORM_FIELD_TYPE.DATE,
            value: this.formPropsData[PROJECT_COLUMN_INDICATOR.START_DATE],
            required: true,
            validation: "required",
            changed: (date) => {
              this.formPropsData[PROJECT_COLUMN_INDICATOR.START_DATE] = date;
            },
          },
          {
            label: "End Date",
            key: PROJECT_COLUMN_INDICATOR.END_DATE,
            type: FORM_FIELD_TYPE.DATE,
            value: this.formPropsData[PROJECT_COLUMN_INDICATOR.END_DATE],
            required: true,
            validation: "required",
            changed: (date) => {
              this.formPropsData[PROJECT_COLUMN_INDICATOR.END_DATE] = date;
            },
          },
          {
            label: "Project Logo",
            key: PROJECT_COLUMN_INDICATOR.LOGO,
            type: FORM_FIELD_TYPE.IMAGE,
            value: this.formPropsData[PROJECT_COLUMN_INDICATOR.LOGO],
            required: true,
            validation: "required",
            changed: (event) => {
              this.formPropsData[PROJECT_COLUMN_INDICATOR.LOGO] =
                event.target.value;
            },
          },
          {
            label: "Short description about project",
            key: PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION,
            type: FORM_FIELD_TYPE.TEXTAREA,
            value: this.formPropsData[
              PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION
            ],
            required: true,
            validation: "required",
            changed: (event) => {
              this.formPropsData[PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION] =
                event.target.value;
            },
          },
        ],
      },
    ];
  };

  populatingFormDataHandler = (data) => {
    if (!data) return false;
    this.formPropsData[PROJECT_COLUMN_INDICATOR.NAME] =
      data[PROJECT_COLUMN_INDICATOR.NAME] ?? "";
    this.formPropsData[PROJECT_COLUMN_INDICATOR.START_DATE] =
      data[PROJECT_COLUMN_INDICATOR.START_DATE] ?? "";
    this.formPropsData[PROJECT_COLUMN_INDICATOR.END_DATE] =
      data[PROJECT_COLUMN_INDICATOR.END_DATE] ?? "";
    this.formPropsData[PROJECT_COLUMN_INDICATOR.LOGO] =
      data[PROJECT_COLUMN_INDICATOR.LOGO] ?? "";
    this.formPropsData[PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION] =
      data[PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION] ?? "";
  };

  onDrop = (files) => {
    this.setState({ files });
  };

  render() {
    console.log("[Project - Form] - re-render .........");

    return (
      <FormComponent
        generateFormSetting={() => this.generateFormSetting()}
        formPropsData={this.formPropsData}
        viewModel={this.viewModel}
        key={Math.random(40, 200)}
      />
    );
  }
}
export default ProjectForm;
