import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Label from '../../../components/Form/Label';
import { FORM_FIELD_TYPE } from '../../../constants/FormFieldType';
import { PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';

import ComponentLinkChannels from '../../../components/ComponentLinkChannels';
import SelectComponent from '../../../components/Select';
import FormSelectDropdown from '../../../components/Form/FormSelectDropdown';
import SelectComponentAds from '../../../components/ComponentFBITads/SelectComponentAds';

const ComponentFormChannels = ({ validator, formPropsData, viewModel }) => {
  const handleChangeChannels = (value) => {
    viewModel.getSelectedLabels(value);

    viewModel.getDataValueSelectedIds = value;
    let personaIds = viewModel.getSelectedIDs();
    if (personaIds) {
      formPropsData[PERSONA_FIELD_KEY.CHANNELS] = personaIds;
    }
  };

  return (
    <>
      <Form.Group key={Math.random(40, 200)} className={``}>
        <SelectComponent
          // defaultValue
          value={viewModel.getDataValueSelectedIds ? viewModel.getDataValueSelectedIds : null}
          options={formPropsData['connected_channels_master_data']}
          className="mb-3 text-green"
          isBorder={true}
          plColor="rgba(8, 18, 64, 0.8)"
          isMulti={true}
          onChange={handleChangeChannels}
        />
        <ComponentLinkChannels viewModel={viewModel} />
      </Form.Group>
    </>
  );
};

export default ComponentFormChannels;
