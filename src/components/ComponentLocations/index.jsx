import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import Label from '../Form/Label';

import { FORM_FIELD_TYPE } from '../../constants/FormFieldType';
import { PERSONA_FIELD_KEY } from '../../constants/PersonaModule';
import SelectComponent from '../Select';
// import './index.scss';

const ComponentLocations = ({ validator, formPropsData, getDataSelectOptions }) => {
  let field = {
    label: 'Locations',
    key: PERSONA_FIELD_KEY.NAME,
    type: FORM_FIELD_TYPE.INPUT,
    value: formPropsData[PERSONA_FIELD_KEY.NAME],
    validation: 'required',
    changed: (event) => {
      formPropsData[PERSONA_FIELD_KEY.NAME] = event.target.value;
    },
  };

  return (
    <div>
      <Form.Group key={Math.random(40, 200)} className="mb-4">
        <Label text={field.label} required={field.required ?? false} />
        <SelectComponent
          // value={getValueSelected}
          options={getDataSelectOptions}
          className="mb-3 text-green"
          isBorder={true}
          plColor="rgba(8, 18, 64, 0.8)"
          // onChange={handleChange}
        />
        <div className="bg-gray-2 p-3 rounded-2 border-1">
          <p>Viet nam</p>
          <div className="mb-2">
            <Form.Control
              as="input"
              defaultValue={field.value}
              required={field.required ?? false}
              id={field.key}
              onChange={field.changed ?? undefined}
              onBlur={field.blurred ?? undefined}
              className="border-0"
            />
          </div>
          <div>
            <Form.Control
              as="input"
              defaultValue={field.value}
              required={field.required ?? false}
              id={field.key}
              onChange={field.changed ?? undefined}
              onBlur={field.blurred ?? undefined}
              className="border-0"
            />
          </div>
        </div>
        {/* {field.validation &&
          validator.message(field.label, field.value, field.validation, {
            className: 'text-danger',
          })} */}
      </Form.Group>
    </div>
  );
};

export default ComponentLocations;
