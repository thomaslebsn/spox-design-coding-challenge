import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Label from '../../../components/Form/Label';
import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';

import ComponentLinkChannels from '../../../components/ComponentLinkChannels';
import FormSelectDropdown from '../../../components/Form/FormSelectDropdown';

const ComponentFormChannels = ({ validator, formPropsData, viewModel }) => {
  let fieldChannels = {
    label: 'Channels',
    key: PERSONA_FIELD_KEY.CHANNELS,
    type: FORM_FIELD_TYPE.DROPDOWN,
    value:
      formPropsData[PERSONA_FIELD_KEY.CHANNELS] != ''
        ? formPropsData[PERSONA_FIELD_KEY.CHANNELS]
        : '',

    defaultValue: formPropsData['connected_channels_master_data'],
    required: true,
    validation: 'required',
    option: formPropsData['connected_channels_master_data'],
    changed: (data) => {
      let values = data && data.map((e) => e.value);
      // let labels = data && data.map((e) => e.label);
      formPropsData[PERSONA_FIELD_KEY.CHANNELS] = values;

      // viewModel.getDataValueSelected.push(labels);
    },
    isMulti: true,
  };
  return (
    <>
      <Form.Group key={Math.random(40, 200)} className={``}>
        <FormSelectDropdown field={fieldChannels ? fieldChannels : null} />
        <ComponentLinkChannels viewModel={viewModel} />
      </Form.Group>
    </>
  );
};

export default ComponentFormChannels;
