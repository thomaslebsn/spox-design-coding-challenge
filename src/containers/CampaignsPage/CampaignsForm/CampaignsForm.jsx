import React, { Component, lazy } from "react";
import { observer } from "mobx-react";

import { FORM_FIELD_TYPE, FORMAT_DATE } from "../../../constants/FormFieldType";
import { CAMPAIGNS_FIELD_KEY } from "../../../constants/CampaignsModule";
import PAGE_STATUS from "../../../constants/PageStatus";
import Spinner from "../../../components/Spinner";

const FormComponent = lazy(() => import("../../../components/Form"));

const CampaignsForm = observer(
  class CampaignsForm extends Component {
    formPropsData = {
      [CAMPAIGNS_FIELD_KEY.PROJECT]: "",
      [CAMPAIGNS_FIELD_KEY.NAME]: "",
      [CAMPAIGNS_FIELD_KEY.START_DATE]: "",
      [CAMPAIGNS_FIELD_KEY.END_DATE]: "",
    };

    constructor(props) {
      super(props);
      this.state = {
        files: [],
      };

      this.viewModel = this.props.viewModel;
      this.isEditMode = this.viewModel.editMode;
      this.isEditMode = this.viewModel.editMode === true;

      console.log("[CampaignForm] viewModel");
      console.log(this.props.viewModel);

      this.viewModel.setForm(this);
    }

    generateFormSetting = () => {
      console.log("re generate Form Setting", this.formPropsData);
      const dropdownlistProjectValues = this.viewModel.dropdownlistProjectValues
        ? this.viewModel.dropdownlistProjectValues
        : null;
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
              option: dropdownlistProjectValues,
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
                this.formPropsData[CAMPAIGNS_FIELD_KEY.NAME] =
                  event.target.value;
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
      console.log("populatingFormDataHandler", data);

      if (!data) return false;
      
      this.formPropsData[CAMPAIGNS_FIELD_KEY.PROJECT] = data.getProjectId();
      this.formPropsData[CAMPAIGNS_FIELD_KEY.NAME] = data.getName().value;
      this.formPropsData[
        CAMPAIGNS_FIELD_KEY.START_DATE
      ] = data.getStartDate().original;
      this.formPropsData[
        CAMPAIGNS_FIELD_KEY.END_DATE
      ] = data.getEndDate().original;
    };

    render() {
      console.log(
        "[Campaigns - Form] - re-render .........",
        this.formPropsData
      );

      const { formStatus, editMode } = this.viewModel;

      if (editMode) {
        let editData = this.viewModel.getCampaignEditData();
        this.populatingFormDataHandler(editData);
      }

      return formStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <FormComponent
          generateFormSetting={() => this.generateFormSetting()}
          formPropsData={this.formPropsData}
          viewModel={this.viewModel}
          key={Math.random(40, 200)}
        />
      );
    }
  }
);

export default CampaignsForm;
