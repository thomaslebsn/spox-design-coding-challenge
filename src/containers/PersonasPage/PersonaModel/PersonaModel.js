import FIELD_TYPE from "../../../constants/FieldType";
import { FORMAT_DATE } from "../../../constants/FormFieldType";
import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

import ChannelUtils from "../../ChannelsPage/ChannelUtils/ChannelUtils";

import { format } from "date-fns";

class PersonaModel {
  constructor(data) {
    this.id = data.id ?? 0;
    this.name = data.title ?? "";

    this.createdDate = data.created_date ?? "";
    this.updatedDate = data.updated_date ?? "";

    this.image = data.image ?? "";

    this.channels = data.channels ?? "";
    this.channelsModel = ChannelUtils.transformChannelResponseIntoModel(
      this.channels
    );
  }

  getId = () => {
    return {
      value: this.id,
      type: FIELD_TYPE.READONLY,
      columnName: PERSONA_FIELD_KEY.ID,
      columnText: "ID",
    };
  };

  getName = () => {
    return {
      value: this.name,
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_FIELD_KEY.NAME,
      columnText: "Name",
    };
  };

  getImage = () => {
    return {
      value: this.image,
      type: FIELD_TYPE.IMAGE,
      columnName: PERSONA_FIELD_KEY.IMAGE,
      columnText: "Name",
    };
  };

  getChannels = () => {
    return {
      value: this.channelsModel,
      type: FIELD_TYPE.TEXT,
      columnName: PERSONA_FIELD_KEY.CHANNELS,
      columnText: "Channels",
    };
  };

  getCreatedDate = () => {
    return {
      value: format(new Date(this.createdDate), FORMAT_DATE),
      original: this.createdDate,
      type: FIELD_TYPE.DATE,
      columnName: PERSONA_FIELD_KEY.CREATED_DATE,
      columnText: "Created Date",
    };
  };

  getUpdatedDate = () => {
    return {
      value: format(new Date(this.updatedDate), FORMAT_DATE),
      original: this.updatedDate,
      type: FIELD_TYPE.DATE,
      columnName: PERSONA_FIELD_KEY.UPDATED_DATE,
      columnText: "Updated",
    };
  };

  toTableRowData = () => {
    const id = this.getId(),
      name = this.getName(),
      createdDate = this.getCreatedDate(),
      updatedDate = this.getUpdatedDate(),
      image = this.getImage(),
      channels = this.getChannels();

    return {
      [id.columnName]: id.value,
      [name.columnName]: name.value,
      [createdDate.columnName]: createdDate.value,
      [updatedDate.columnName]: updatedDate.value,
      [image.columnName]: image.value,
      [channels.columnName]: channels.value,
    };
  };

  static convertSubmittedDataToAPIService(personaData) {
    const result = personaData
      ? {
          name: personaData[PERSONA_FIELD_KEY.NAME],
          created_date: personaData[PERSONA_FIELD_KEY.CREATED_DATE],
          updated_date: personaData[PERSONA_FIELD_KEY.UPDATED_DATE],
        }
      : null;
    return result;
  }
}

export default PersonaModel;
