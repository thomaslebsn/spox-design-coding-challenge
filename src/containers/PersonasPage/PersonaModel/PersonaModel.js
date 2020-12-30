import FIELD_TYPE from "../../../constants/FieldType";
import { FORMAT_DATE } from "../../../constants/FormFieldType";
import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

import { format } from "date-fns";

class PersonaModel {
  constructor(data) {
    this.id = data.id ?? 0;
    this.name = data.name ?? "";

    this.createdDate = data.created_date ?? "";
    this.updatedDate = data.updated_date ?? "";
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
      updatedDate = this.getUpdatedDate();

    return {
      [id.columnName]: id.value,
      [name.columnName]: name.value,
      [createdDate.columnName]: createdDate.value,
      [updatedDate.columnName]: updatedDate.value,
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
