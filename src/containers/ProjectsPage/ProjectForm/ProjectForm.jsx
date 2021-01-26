import React, { Component, lazy } from "react";

import { observer } from "mobx-react";

import { FORM_FIELD_TYPE, FORMAT_DATE } from "../../../constants/FormFieldType";
import { PROJECT_COLUMN_INDICATOR } from "../../../constants/ProjectModule";

import { format } from "date-fns";
import PAGE_STATUS from "../../../constants/PageStatus";

import Spinner from "../../../components/Spinner";

const FormComponent = lazy(() => import("../../../components/Form"));

const ProjectForm = observer(
  class ProjectForm extends Component {
    formPropsData = {
      [PROJECT_COLUMN_INDICATOR.NAME]: "",
      [PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION]: "",
      [PROJECT_COLUMN_INDICATOR.START_DATE]: "",
      [PROJECT_COLUMN_INDICATOR.END_DATE]: "",
      [PROJECT_COLUMN_INDICATOR.LOGO]: "",
    };

    constructor(props) {
      super(props);
      this.state = {
        files: [],
      };

      this.viewModel = this.props.viewModel;

      console.log("[ProjectForm] viewModel");
      console.log(this.props.viewModel);

      this.viewModel.setForm(this);
    }

    generateFormSetting = () => {
      console.log("re generate Form Setting", this.formPropsData);
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
              type: FORM_FIELD_TYPE.DATERANGE,
              startField: {
                label: "Start Date",
                key: PROJECT_COLUMN_INDICATOR.START_DATE,
                value: this.formPropsData[PROJECT_COLUMN_INDICATOR.START_DATE],
                changed: (date) => {
                  this.formPropsData[
                    PROJECT_COLUMN_INDICATOR.START_DATE
                  ] = date;
                },
              },
              endField: {
                label: "End Date",
                key: PROJECT_COLUMN_INDICATOR.END_DATE,
                value: this.formPropsData[PROJECT_COLUMN_INDICATOR.END_DATE],
                changed: (date) => {
                  this.formPropsData[PROJECT_COLUMN_INDICATOR.END_DATE] = date;
                },
              },
              required: true,
              validation: "required",
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
      console.log("populatingFormDataHandler");
      console.log(data);

      if (!data) return false;

      this.formPropsData[PROJECT_COLUMN_INDICATOR.NAME] = data.getName().value;
      this.formPropsData[
        PROJECT_COLUMN_INDICATOR.START_DATE
      ] = data.getStartDate().original;
      this.formPropsData[
        PROJECT_COLUMN_INDICATOR.END_DATE
      ] = data.getEndDate().original;
      this.formPropsData[
        PROJECT_COLUMN_INDICATOR.LOGO
      ] = data.getLogoUrl().value;
      this.formPropsData[
        PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION
      ] = data.getShortDescription().value;

      console.log("-- is DATA POPu ---");
      console.log(this.formPropsData);
    };

    onDrop = (files) => {
      this.setState({ files });
    };

    render() {
      console.log("[Project - Form] - re-render .........");
      console.log(this.formPropsData);

      const { formStatus, projectEditdata, editMode } = this.viewModel;

      if (editMode) {
        this.populatingFormDataHandler(projectEditdata);
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
export default ProjectForm;
