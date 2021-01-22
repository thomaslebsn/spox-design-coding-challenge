import FIELD_TYPE from "../../../constants/FieldType";
import { FORMAT_DATE } from "../../../constants/FormFieldType";
import { PERSONA_FIELD_KEY,  ESI_PERSONA_FIELD_KEY} from "../../../constants/PersonaModule";

import ChannelUtils from "../../ChannelsPage/ChannelUtils/ChannelUtils";

//import {ESI_PERSONA_FIELD_KEY} from "easii-io-web-service-library";

import { format } from "date-fns";

class PersonaModel {
  constructor(data) {
    this.id = data[ESI_PERSONA_FIELD_KEY.ID] ?? 0;
    this.name = data[ESI_PERSONA_FIELD_KEY.NAME] ?? "";
    this.channels = data[ESI_PERSONA_FIELD_KEY.CHANNELS] ?? "";
    this.age = data[ESI_PERSONA_FIELD_KEY.AGE] ?? 0;
    this.gender = data[ESI_PERSONA_FIELD_KEY.GENDER] ?? "";
    this.location = data[ESI_PERSONA_FIELD_KEY.LOCATION] ?? "";
    this.tools = data[ESI_PERSONA_FIELD_KEY.TOOLS] ?? "";
    this.job_title = data[ESI_PERSONA_FIELD_KEY.JOB_TITLE] ?? "";
    this.website = data[ESI_PERSONA_FIELD_KEY.WEBSITE] ?? "";
    this.sector = data[ESI_PERSONA_FIELD_KEY.SECTOR] ?? "";
    this.vendor_research = data[ESI_PERSONA_FIELD_KEY.VENDOR_RESEARCH] ?? "";
    this.interest = data[ESI_PERSONA_FIELD_KEY.INTEREST] ?? [];
    this.goals = data[ESI_PERSONA_FIELD_KEY.GOALS] ?? "";
    this.marital_status = data[ESI_PERSONA_FIELD_KEY.MARITAL_STATUS] ?? "";
    this.paint_point = data[ESI_PERSONA_FIELD_KEY.PAINT_POINT] ?? "";
    this.avatar = data[ESI_PERSONA_FIELD_KEY.AVATAR] ?? "";
    this.challenges = data[ESI_PERSONA_FIELD_KEY.CHANNELS] ?? "";
    this.bio = data[ESI_PERSONA_FIELD_KEY.BIO] ?? "";
    this.image = data[ESI_PERSONA_FIELD_KEY.IMAGE] ?? "";

    this.createdDate = data[ESI_PERSONA_FIELD_KEY.CREATED_DATE] ?? "";
    this.updatedDate = data[ESI_PERSONA_FIELD_KEY.MODIFIED_DATE] ?? "";

    // this.channelsModel = ChannelUtils.transformChannelResponseIntoModel(
    //   this.channels
    // );
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
      //value: this.createdDate,
      original: this.createdDate,
      type: FIELD_TYPE.DATE,
      columnName: PERSONA_FIELD_KEY.CREATED_DATE,
      columnText: "Created Date",
    };
  };

  getUpdatedDate = () => {
    return {
      value: format(new Date(this.updatedDate), FORMAT_DATE),
      //value: this.updatedDate,
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
      updatedDate = this.getUpdatedDate();
      // image = this.getImage();
      //channels = this.getChannels();

    return {
      [id.columnName]: id.value,
      [name.columnName]: name.value,
      [createdDate.columnName]: createdDate.value,
      [updatedDate.columnName]: updatedDate.value,
      //[image.columnName]: image.value,
      //[channels.columnName]: channels.value,
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
