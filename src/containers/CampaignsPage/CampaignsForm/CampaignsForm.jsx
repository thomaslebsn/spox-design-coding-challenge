import React, { Component, lazy } from "react";

import { FORM_FIELD_TYPE, FORMAT_DATE } from "../../../constants/FormFieldType";
import { CAMPAIGNS_FIELD_KEY } from "../../../constants/CampaignsModule";

const FormComponent = lazy(() => import("../../../components/Form"));

class CampaignsForm extends Component {
  formPropsData = {
    [CAMPAIGNS_FIELD_KEY.NAME]: "",
    [CAMPAIGNS_FIELD_KEY.START_DATE]: "",
    [CAMPAIGNS_FIELD_KEY.END_DATE]: "",
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
      this.populatingFormDataHandler(this.viewModel.campaignsEditdata[0]);
    }
  }

  generateFormSetting = () => {
    console.log("re generate Form Setting");

    return [
      {
        fields: [
          {
            label: "Project",
            key: CAMPAIGNS_FIELD_KEY.PROJECT,
            type: FORM_FIELD_TYPE.DROPDOWN,
            value: this.formPropsData[CAMPAIGNS_FIELD_KEY.PROJECT],
            required: true,
            validation: "required",
            option: [
              { value: "1", label: "Marketing Vietnam Nikon" },
              { value: "2", label: "Marketing Vietnam Nikon 2" },
            ],
            changed: (event) => {
              this.formPropsData[CAMPAIGNS_FIELD_KEY.PROJECT] = event.value;
            },
          },
          {
            label: "Campaign name",
            key: CAMPAIGNS_FIELD_KEY.NAME,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[CAMPAIGNS_FIELD_KEY.NAME],
            required: true,
            validation: "required",
            changed: (event) => {
              this.formPropsData[CAMPAIGNS_FIELD_KEY.NAME] = event.target.value;
            },
          },
          {
            type: FORM_FIELD_TYPE.DATERANGE,
            startField: {
              label: "Start Date",
              key: CAMPAIGNS_FIELD_KEY.START_DATE,
              value: this.formPropsData[CAMPAIGNS_FIELD_KEY.START_DATE],
              changed: (date) => {
                console.log(date);
                this.formPropsData[CAMPAIGNS_FIELD_KEY.START_DATE] = date;
              },
            },
            endField: {
              label: "End Date",
              key: CAMPAIGNS_FIELD_KEY.END_DATE,
              value: this.formPropsData[CAMPAIGNS_FIELD_KEY.END_DATE],
              changed: (date) => {
                this.formPropsData[CAMPAIGNS_FIELD_KEY.END_DATE] = date;
              },
            },
            required: true,
            validation: "required",
          },
        ],
      },
    ];
  };

  populatingFormDataHandler = (data) => {
    if (!data) return false;
    this.formPropsData[CAMPAIGNS_FIELD_KEY.NAME] = data.getName().value;
    this.formPropsData[
      CAMPAIGNS_FIELD_KEY.START_DATE
    ] = data.getStartDate().original;
    this.formPropsData[
      CAMPAIGNS_FIELD_KEY.END_DATE
    ] = data.getEndDate().original;
  };

  render() {
    console.log("[Campaigns - Form] - re-render .........");

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

export default CampaignsForm;
