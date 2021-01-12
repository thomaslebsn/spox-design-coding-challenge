import React, { lazy } from "react";
import Label from "../components/Form/Label";
import { FORM_FIELD_TYPE } from "../constants/FormFieldType";
import { Form } from "react-bootstrap";

const FormDateRangePicker = lazy(() =>
  import("../components/Form/FormDateRangePicker")
);
const FormImage = lazy(() => import("../components/Form/FormImage"));
const FormSelection = lazy(() => import("../components/Form/FormSelection"));
const FormTab = lazy(() => import("../components/Form/FormTab"));
const FormSelectDropdown = lazy(() =>
  import("../components/Form/FormSelectDropdown")
);

const renderingGroupFieldHandler = (group, validator) => {
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
                    onBlur={field.blurred ?? undefined}
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
                    onBlur={field.blurred ?? undefined}
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
                <FormDateRangePicker key={Math.random(40, 200)} field={field} />
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
                  <Label
                    text={field.label}
                    required={field.required ?? false}
                  />

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
                  <FormTab
                    key={Math.random(40, 200)}
                    field={field}
                    validator={validator}
                  />
                </Form.Group>
              );
            case FORM_FIELD_TYPE.DROPDOWN:
              return (
                <Form.Group key={Math.random(40, 200)} className="mb-4">
                  <Label
                    text={field.label}
                    required={field.required ?? false}
                  />
                  <FormSelectDropdown field={field} />
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

export { renderingGroupFieldHandler };
