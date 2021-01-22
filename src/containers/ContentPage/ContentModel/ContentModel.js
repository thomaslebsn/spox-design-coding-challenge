import FIELD_TYPE from "../../../constants/FieldType";

import { CONTENT_FIELD_KEY } from "../../../constants/ContentModule";
import getStatus from "../../../utils/status";

import ChannelUtils from "../../ChannelsPage/ChannelUtils/ChannelUtils";

import { ESI_CONTENT_FIELD_KEY } from "easii-io-web-service-library";

class ContentModel {
  constructor(data) {
    console.log("data data data data data", data);
    this.id = data[ESI_CONTENT_FIELD_KEY.ID] ?? 0;
    this.name = data[[ESI_CONTENT_FIELD_KEY.HEADLINE]] ?? "";
    this.channels = data.channel_descriptions ?? "";

    this.channelsModel = ChannelUtils.transformChannelResponseIntoModel(
      this.channels
    );

    this.channelsData = this.status = data.status ?? "";
    this.description = data.description ?? "";
  }

  getId = () => {
    return {
      value: this.id,
      type: FIELD_TYPE.READONLY,
      columnName: CONTENT_FIELD_KEY.ID,
      columnText: "ID",
    };
  };

  getName = () => {
    return {
      value: this.name,
      type: FIELD_TYPE.TEXT,
      columnName: CONTENT_FIELD_KEY.NAME,
      columnText: "Name",
    };
  };

  getDescription = () => {
    return {
      value: this.description,
      type: FIELD_TYPE.RICHTEXT,
      columnName: CONTENT_FIELD_KEY.DESCRIPTION,
      columnText: "Description",
    };
  };

  getChannels = () => {
    return {
      value: this.channelsModel,
      type: FIELD_TYPE.TEXT,
      columnName: CONTENT_FIELD_KEY.CHANNELS,
      columnText: "Channels",
    };
  };

  getStatus = () => {
    return {
      value: getStatus(this.status),
      type: FIELD_TYPE.TEXT,
      columnName: CONTENT_FIELD_KEY.STATUS,
      columnText: "Status",
    };
  };

  toTableRowData = () => {
    const id = this.getId(),
      name = this.getName(),
      description = this.getDescription(),
      status = this.getStatus(),
      channels = this.getChannels();

    return {
      [id.columnName]: id.value,
      [name.columnName]: name.value,
      [description.columnName]: description.value,
      [status.columnName]: status.value,
      [channels.columnName]: channels.value,
    };
  };

  static convertSubmittedDataToAPIService(contentData) {
    const result = contentData
      ? {
          [ESI_CONTENT_FIELD_KEY.HEADLINE]: contentData[CONTENT_FIELD_KEY.NAME],
          created_date: contentData[CONTENT_FIELD_KEY.CREATED_DATE],
          updated_date: contentData[CONTENT_FIELD_KEY.UPDATED_DATE],
        }
      : null;
    return result;
  }
}

export default ContentModel;
