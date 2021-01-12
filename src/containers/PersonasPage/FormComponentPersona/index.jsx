import React, { Component, lazy } from "react";
import Label from "../../../components/Form/Label";
import SimpleReactValidator from "simple-react-validator";
import { Form } from "react-bootstrap";

import { renderingGroupFieldHandler } from "../../../utils/form";
import ComponentFormFieldBio from "./ComponentFormFieldBio";
import ComponentFormFieldGCP from "./ComponentFormFieldGCP";
import ComponentFormFieldInformation from "./ComponentFormFieldInformation";
import ComponentFormFieldPersonaName from "./ComponentFormFieldPersonaName";

class FormComponentPersona extends Component {
  isEditMode = false;
  validator = null;
  viewModel = null;

  constructor(props) {
    console.log("re initialize");
    super(props);

    this.isEditMode = props.editMode === true;
    this.validator = new SimpleReactValidator();
    this.viewModel = this.props.viewModel;
    this.formPropsData = props.formPropsData;

    if (this.isEditMode) {
      this.populatingFormDataHandler(props.populatedFormData);
    }

    this.viewModel.setForm(this);
  }

  isFormValid = () => {
    console.log("isFormValid");
    if (this.validator.allValid()) {
      console.log("[is Form Valid]");
      console.log(this.formPropsData);
      return true;
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
      return false;
    }
  };

  getFormPropsData = () => this.formPropsData;

  renderingFormHandler = (formSetting) => {
    return (
      <Form key={Math.random(40, 200)} className={this.props.formClassName}>
        <div className="col-4 ">
          <ComponentFormFieldPersonaName
            validator={this.validator}
            formPropsData={this.formPropsData}
          />

          <div className="border-start-5 bg-white p-2 px-3 mb-3 rounded-2">
            <p className="text-blue-0 opacity-75 mb-2 fs-5">Demographic</p>
            <div>
              {Object.keys(formSetting)
                .map((groupIndex) => {
                  return [...Array(formSetting[groupIndex])].map((group) => {
                    return renderingGroupFieldHandler(group, this.validator);
                  });
                })
                .reduce((arr, el) => {
                  return arr.concat(el);
                }, [])}
            </div>
          </div>
        </div>
        <div className="col-8">
          <ComponentFormFieldBio
            validator={this.validator}
            formPropsData={this.formPropsData}
          />

          <div className="row">
            <div className="col-6">
              <div>
                <p className="text-blue-0 opacity-75 fs-bold bg-blue-3 p-2">
                  Sources of information
                </p>
                <ComponentFormFieldInformation
                  validator={this.validator}
                  formPropsData={this.formPropsData}
                />
              </div>
            </div>
            <div className="col-6">
              <div>
                <p className="text-blue-0 opacity-75 fs-bold bg-blue-3 p-2">
                  Goals - Challenges - Paint point
                </p>
                <div>
                  <ComponentFormFieldGCP
                    validator={this.validator}
                    formPropsData={this.formPropsData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    );
  };

  render() {
    console.log("rerender.....");

    this.validator.purgeFields();

    let formSetting = this.props.generateFormSetting();

    return this.renderingFormHandler(formSetting);
  }
}

export default FormComponentPersona;
