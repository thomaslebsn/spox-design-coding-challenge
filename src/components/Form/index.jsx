import React, { Component } from "react";

import Dropzone from "react-dropzone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons/faCloudUploadAlt";

import { FORM_FIELD_TYPE, FORMAT_DATE } from "../../constants/FormFieldType";

import SimpleReactValidator from "simple-react-validator";
import { Form } from "react-bootstrap";
import Label from "./Label";

class FormComponent extends Component {
  formPropsData = null;

  isEditMode = false;
  validator = null;
  viewModel = null;

  constructor(props) {
    console.log("re initialize");
    super(props);

    this.state = {
      files: [],
    };

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

              case FORM_FIELD_TYPE.DATE:
                return (
                  <Form.Group key={Math.random(40, 200)} className="mb-4">
                    <Label
                      text={field.label}
                      required={field.required ?? false}
                    />

                    <DatePicker
                      value={field.value && new Date(field.value)}
                      // selected={field.value && new Date(field.value)}
                      required={field.required ?? false}
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
              case FORM_FIELD_TYPE.IMAGE:
                return (
                  <Form.Group key={Math.random(40, 200)} className="mb-4">
                    <Label
                      text={field.label}
                      required={field.required ?? false}
                    />
                    <Dropzone onDrop={this.onDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <div className="position-relative  cursor-pointer">
                          <div
                            {...getRootProps()}
                            className="d-flex align-items-center justify-content-center p-3"
                          >
                            <input
                              {...getInputProps()}
                              className="position-absolute start-0 top-0 bottom-0 end-0"
                            />
                            <div className="d-flex align-items-center p-3">
                              <i className="fs-1 text-blue-0 opacity-25">
                                <FontAwesomeIcon icon={faCloudUploadAlt} />
                              </i>
                              <div className="text-center ms-1">
                                <p className="mb-0">
                                  Drag and drop a file here{" "}
                                </p>
                                <p className="mb-0">
                                  or <strong>Choose file</strong>
                                </p>
                              </div>
                            </div>
                          </div>
                          {field.value && (
                            <div
                              key={field.value}
                              className="position-absolute position-absolute start-0 top-0 bottom-0 end-0 bg-white"
                            >
                              <img
                                src={field.value}
                                className="w-100 h-100 object-fit-cover"
                                alt={field.value}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </Dropzone>

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
