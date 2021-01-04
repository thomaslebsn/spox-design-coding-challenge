import { format } from "date-fns";

import FIELD_TYPE from "../../../constants/FieldType";
import { FORMAT_DATE } from "../../../constants/FormFieldType";

import { CAMPAIGNS_FIELD_KEY } from "../../../constants/CampaignsModule";

class CampaignsModel {
  constructor(data) {
    this.id = data.id ?? 0;
    this.name = data.name ?? "";

    this.createdDate = data.created_date ?? "";
  }

  getId = () => {
    return {
      value: this.id,
      type: FIELD_TYPE.READONLY,
      columnName: CAMPAIGNS_FIELD_KEY.ID,
      columnText: "ID",
    };
  };

  getName = () => {
    return {
      value: this.name,
      type: FIELD_TYPE.TEXT,
      columnName: CAMPAIGNS_FIELD_KEY.NAME,
      columnText: "Name",
    };
  };

  getCreatedDate = () => {
    return {
      value: format(new Date(this.createdDate), FORMAT_DATE),
      original: this.createdDate,
      type: FIELD_TYPE.DATE,
      columnName: CAMPAIGNS_FIELD_KEY.CREATED_DATE,
      columnText: "Created Date",
    };
  };

  toTableRowData = () => {
    const id = this.getId(),
      name = this.getName(),
      createdDate = this.getCreatedDate();

    return {
      [id.columnName]: id.value,
      [name.columnName]: name.value,
      [createdDate.columnName]: createdDate.value,
    };
  };

  static convertSubmittedDataToAPIService(campaignsData) {
    const result = campaignsData
      ? {
          name: campaignsData[CAMPAIGNS_FIELD_KEY.NAME],
          created_date: campaignsData[CAMPAIGNS_FIELD_KEY.CREATED_DATE],
        }
      : null;
    return result;
  }
}

export default CampaignsModel;
