import React, { Component, lazy } from "react";

import { FORM_FIELD_TYPE } from "../../constants/FormFieldType";

import SimpleReactValidator from "simple-react-validator";
import { Form } from "react-bootstrap";
import Label from "./Label";

const FormDateRangePicker = lazy(() => import("./FormDateRangePicker"));
const FormImage = lazy(() => import("./FormImage"));

class FormComponent extends Component {
  formPropsData = null;

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

  renderingGroupFieldHandler = (group) => {
    return Object.keys(group.fields)
      .map((fieldIndex) => {
        return [...Array(group.fields[fieldIndex])].map((field) => {
          return (() => {
            switch (field.type) {
              case FORM_FIELD_TYPE.INPUT:
                return (
                  <Form.Group key={Math.random(40, 200)} className="mb-4">
                    <Label
                      text={field.label}
                      required={field.required ?? false}
                    />

                    <Form.Control
                      as="input"
                      defaultValue={field.value}
                      required={field.required ?? false}
                      id={field.key}
                      onChange={field.changed ?? undefined}
                    />

                    {field.validation
                      ? this.validator.message(
                          field.label,
                          field.value,
                          field.validation,
                          { className: "text-danger" }
                        )
                      : ""}
                  </Form.Group>
                );
              case FORM_FIELD_TYPE.TEXTAREA:
                return (
                  <Form.Group key={Math.random(40, 200)} className="mb-4">
                    <Label
                      text={field.label}
                      required={field.required ?? false}
                    />
                    <Form.Control
                      as="textarea"
                      defaultValue={field.value}
                      required={field.required ?? false}
                      id={field.key}
                      onChange={field.changed ?? undefined}
                    />

                    {field.validation &&
                      this.validator.message(
                        field.label,
                        field.value,
                        field.validation,
                        { className: "text-danger" }
                      )}
                  </Form.Group>
                );

              case FORM_FIELD_TYPE.DATERANGE:
                return (
                  <FormDateRangePicker
                    key={Math.random(40, 200)}
                    field={field}
                  />
                );
              case FORM_FIELD_TYPE.IMAGE:
                return (
                  <Form.Group key={Math.random(40, 200)} className="mb-4">
                    <Label
                      text={field.label}
                      required={field.required ?? false}
                    />

                    <FormImage key={Math.random(40, 200)} field={field} />
                  </Form.Group>
                );

              default:
                return null;
            }
          })();
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

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
      <Form key={Math.random(40, 200)}>
        {Object.keys(formSetting)
          .map((groupIndex) => {
            return [...Array(formSetting[groupIndex])].map((group) => {
              return this.renderingGroupFieldHandler(group);
            });
          })
          .reduce((arr, el) => {
            return arr.concat(el);
          }, [])}
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

export default FormComponent;
