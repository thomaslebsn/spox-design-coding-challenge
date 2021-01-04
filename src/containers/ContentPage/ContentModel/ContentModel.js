import FIELD_TYPE from "../../../constants/FieldType";

import {
  CONTENT_FIELD_KEY,
  CONTENT_STATUS,
} from "../../../constants/ContentModule";

class ContentModel {
  constructor(data) {
    this.id = data.id ?? 0;
    this.name = data.name ?? "";
    this.channels = data.channels ?? "";
    this.status = data.status ?? "";
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
      value: this.channels,
      type: FIELD_TYPE.TEXT,
      columnName: CONTENT_FIELD_KEY.CHANNELS,
      columnText: "Channels",
    };
  };

  getStatus = () => {
    return {
      value: ContentModel.getStatusObject(this.status),
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

  static getStatusObject(status) {
    return Object.keys(CONTENT_STATUS)
      .filter((index) => CONTENT_STATUS[index].id === status)
      .reduce((obj, key) => {
        obj = CONTENT_STATUS[key];
        return obj;
      }, {});
  }

  static getClassStatus(status) {
    return Object.keys(CONTENT_STATUS).filter(
      (index) => CONTENT_STATUS[index] === status
    );
  }

  static convertSubmittedDataToAPIService(contentData) {
    const result = contentData
      ? {
          name: contentData[CONTENT_FIELD_KEY.NAME],
          created_date: contentData[CONTENT_FIELD_KEY.CREATED_DATE],
          updated_date: contentData[CONTENT_FIELD_KEY.UPDATED_DATE],
        }
      : null;
    return result;
  }
}

export default ContentModel;
