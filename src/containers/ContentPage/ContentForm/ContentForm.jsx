import React, { Component, lazy } from "react";

import { FORM_FIELD_TYPE, FORMAT_DATE } from "../../../constants/FormFieldType";
import { CONTENT_FIELD_KEY } from "../../../constants/ContentModule";

const FormComponent = lazy(() => import("../../../components/Form"));

class ContentForm extends Component {
  formPropsData = {
    [CONTENT_FIELD_KEY.NAME]: "",
    [CONTENT_FIELD_KEY.CREATED_DATE]: "",
    [CONTENT_FIELD_KEY.UPDATED_DATE]: "",
  };

  isEditMode = false;

  constructor(props) {
    super(props);
    this.state = {};

    this.viewModel = this.props.viewModel;

    this.isEditMode = this.viewModel.editMode === true;

    if (this.isEditMode) {
      this.populatingFormDataHandler(this.viewModel.contentEditdata[0]);
    }
  }

  generateFormSetting = () => {
    console.log("re generate Form Setting");
    return [
      {
        fields: [
          {
            label: "Content Name",
            key: CONTENT_FIELD_KEY.NAME,
            type: FORM_FIELD_TYPE.INPUT,
            value: this.formPropsData[CONTENT_FIELD_KEY.NAME],
            required: true,
            validation: "required",
            changed: (event) => {
              this.formPropsData[CONTENT_FIELD_KEY.NAME] = event.target.value;
            },
          },
        ],
      },
    ];
  };

  populatingFormDataHandler = (data) => {
    if (!data) return false;
    this.formPropsData[CONTENT_FIELD_KEY.NAME] = data.getName().value;
  };

  render() {
    console.log("[Content - Form] - re-render .........");

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
export default ContentForm;
