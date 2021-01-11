import React, { Component, lazy } from "react";
import { Form } from "react-bootstrap";
import Label from "../../../components/Form/Label";

import { FORM_FIELD_TYPE, FORMAT_DATE } from "../../../constants/FormFieldType";
import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

const FormImage = lazy(() => import("../../../components/Form/FormImage"));

const ComponentFormFieldPersonaName = ({ validator, formPropsData }) => {
  let field = {
    label: "Persona Name",
    key: PERSONA_FIELD_KEY.NAME,
    type: FORM_FIELD_TYPE.INPUT,
    value: formPropsData[PERSONA_FIELD_KEY.NAME],
    required: true,
    validation: "required",
    changed: (event) => {
      formPropsData[PERSONA_FIELD_KEY.NAME] = event.target.value;
    },
  };

  let fieldAvatar = {
    label: "Avatar",
    key: PERSONA_FIELD_KEY.AVATAR,
    type: FORM_FIELD_TYPE.IMAGE,
    value: formPropsData[PERSONA_FIELD_KEY.AVATAR],
    required: true,
    validation: "required",
    changed: (event) => {
      formPropsData[PERSONA_FIELD_KEY.AVATAR] = event.target.value;
    },
  };

  return (
    <>
      <Form.Group
        key={Math.random(40, 200)}
        className="mb-4 border-start-5 bg-white p-2 px-3 rounded-2"
      >
        <Label text={field.label} required={field.required ?? false} />
        <Form.Control
          as="input"
          defaultValue={field.value}
          required={field.required ?? false}
          id={field.key}
          onChange={field.changed ?? undefined}
          onBlur={field.blurred ?? undefined}
          className="border-0"
        />

        {field.validation &&
          validator.message(field.label, field.value, field.validation, {
            className: "text-danger",
          })}
      </Form.Group>
      <Form.Group
        key={Math.random(40, 200)}
        className={`mb-4 border-start-5 bg-white p-2 px-3 rounded-2`}
      >
        <Label text={"Avatar"} required={true} />

        <FormImage key={Math.random(40, 200)} field={fieldAvatar} />
      </Form.Group>
    </>
  );
};

export default ComponentFormFieldPersonaName;
