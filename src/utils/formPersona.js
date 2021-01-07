import React, { lazy } from "react";
import Label from "../components/Form/Label";
import { FORM_FIELD_TYPE } from "../constants/FormFieldType";
import { Form } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";

const FormDateRangePicker = lazy(() =>
  import("../components/Form/FormDateRangePicker")
);
const FormImage = lazy(() => import("../components/Form/FormImage"));
const FormSelection = lazy(() => import("../components/Form/FormSelection"));
const FormTab = lazy(() => import("../components/Form/FormTab"));

const validator = new SimpleReactValidator();

const renderingGroupFieldHandlerPersona = (group) => {
  const componentFields = () => {
    return Object.keys(group.fields)
      .map((fieldIndex) => {
        return [...Array(group.fields[fieldIndex])].map((field) => {
          return (() => {
            switch (field.type) {
              case FORM_FIELD_TYPE.INPUT:
                return (
                  <Form.Group
                    key={Math.random(40, 200)}
                    className={`mb-4 ${field.className}`}
                  >
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
                      className={`${field.classNameInput}`}
                    />

                    {field.validation &&
                      validator.message(
                        field.label,
                        field.value,
                        field.validation,
                        { className: "text-danger" }
                      )}
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
                      validator.message(
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
                  <Form.Group
                    key={Math.random(40, 200)}
                    className={`mb-4 ${field.className}`}
                  >
                    <Label
                      text={field.label}
                      required={field.required ?? false}
                    />

                    <FormImage key={Math.random(40, 200)} field={field} />
                  </Form.Group>
                );

              case FORM_FIELD_TYPE.SELECTION:
                return (
                  <Form.Group key={Math.random(40, 200)} className="mb-4">
                    <FormSelection key={Math.random(40, 200)} field={field} />

                    {field.validation &&
                      validator.message(
                        field.label,
                        field.value,
                        field.validation,
                        { className: "text-danger" }
                      )}
                  </Form.Group>
                );

              case FORM_FIELD_TYPE.TAB:
                return (
                  <Form.Group key={Math.random(40, 200)} className="mb-4">
                    <FormTab key={Math.random(40, 200)} field={field} />

                    {field.validation &&
                      validator.message(
                        field.label,
                        field.value,
                        field.validation,
                        { className: "text-danger" }
                      )}
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

  const componentDemographic = () => {
    return Object.keys(group.demographic)
      .map((fieldIndex) => {
        return [...Array(group.demographic[fieldIndex])].map((field) => {
          return (() => {
            switch (field.type) {
              case FORM_FIELD_TYPE.INPUT:
                return (
                  <Form.Group
                    key={Math.random(40, 200)}
                    className={`mb-4 ${field.className}`}
                  >
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
                      className={`${field.classNameInput}`}
                    />

                    {field.validation &&
                      validator.message(
                        field.label,
                        field.value,
                        field.validation,
                        { className: "text-danger" }
                      )}
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
                      validator.message(
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
                  <Form.Group
                    key={Math.random(40, 200)}
                    className={`mb-4 ${field.className}`}
                  >
                    <Label
                      text={field.label}
                      required={field.required ?? false}
                    />

                    <FormImage key={Math.random(40, 200)} field={field} />
                  </Form.Group>
                );

              case FORM_FIELD_TYPE.SELECTION:
                return (
                  <Form.Group key={Math.random(40, 200)} className="mb-4">
                    <FormSelection key={Math.random(40, 200)} field={field} />

                    {field.validation &&
                      validator.message(
                        field.label,
                        field.value,
                        field.validation,
                        { className: "text-danger" }
                      )}
                  </Form.Group>
                );

              case FORM_FIELD_TYPE.TAB:
                return (
                  <Form.Group key={Math.random(40, 200)} className="mb-4">
                    <FormTab key={Math.random(40, 200)} field={field} />

                    {field.validation &&
                      validator.message(
                        field.label,
                        field.value,
                        field.validation,
                        { className: "text-danger" }
                      )}
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

  return (
    <>
      <div className="col-4">
        {componentFields()}
        <div className="border-start-5 bg-white p-2 mb-3 rounded-2">
          <p className="text-blue-0 opacity-75 mb-2 fs-5">Demographic</p>
          {componentDemographic()}
        </div>
      </div>
      <div className="col-8"></div>
    </>
  );
};

export { renderingGroupFieldHandlerPersona };
