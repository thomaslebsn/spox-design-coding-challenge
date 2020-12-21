import { ProjectLeadItemModel } from "./ProjectLeadModel";
import FIELD_TYPE from "../../../constants/FieldType";

class ProjectModel {
  constructor(data) {
    this.id = data.id ?? 0;
    this.name = data.name ?? "";
    this.logoUrl = data.logo_url ?? "";
    this.startdate = data.start_date ?? "";
    this.enddate = data.end_date ?? "";
    this.progress = data.progress ?? 0;
    this.shortDescription = data.short_description ?? "";

    this.projectLeadItemModel = data.project_lead
      ? new ProjectLeadItemModel(data.project_lead)
      : null;

    this.projectLead = this.projectLeadItemModel
      ? this.projectLeadItemModel.toDropdownOption()
      : null;

    this.createDate = data.createDate ?? "";
    this.lastModifiedDate = data.list_modified_date ?? "";
    this.createdBy = data.create_by ?? "";
    this.lastModifiedBy = data.list_modified_by ?? "";
  }

  getId = () => {
    return {
      value: this.id,
      type: FIELD_TYPE.READONLY,
      columnName: "id",
      columnText: "ID",
    };
  };

  getName = () => {
    return {
      value: this.name,
      type: FIELD_TYPE.TEXT,
      columnName: "name",
      columnText: "Name",
    };
  };

  getLogoUrl = () => {
    return {
      value: this.logoUrl,
      type: FIELD_TYPE.IMAGE,
      columnName: "logoUrl",
      columnText: "Logo Url",
    };
  };

  getStartDate = () => {
    return {
      value: this.startdate,
      type: FIELD_TYPE.DATE,
      columnName: "startdate",
      columnText: "Start Date",
    };
  };

  getEndDate = () => {
    return {
      value: this.enddate,
      type: FIELD_TYPE.DATE,
      columnName: "enddate",
      columnText: "End Date",
    };
  };

  getProgress = () => {
    return {
      value: this.progress,
      type: FIELD_TYPE.TEXT,
      columnName: "progress",
      columnText: "Progress",
    };
  };

  getShortDescription = () => {
    return {
      value: this.shortDescription,
      type: FIELD_TYPE.RICHTEXT,
      columnName: "shortDescription",
      columnText: "Short Description",
    };
  };

  getLead = () => {
    return {
      value: this.projectLead,
      type: FIELD_TYPE.MULTIPLE_SELECTION,
    };
  };

  toTableRowData = (headerColumns) => {
    const id = this.getId(),
      name = this.getName(),
      shortDescription = this.getShortDescription(),
      startdate = this.getStartDate(),
      enddate = this.getEndDate(),
      progress = this.getProgress();

    const mappedColIndex = {
      [id.columnName]: id,
      [name.columnName]: name,
      [shortDescription.columnName]: shortDescription,
      [startdate.columnName]: startdate,
      [enddate.columnName]: enddate,
      [progress.columnName]: progress,
    };

    return [
      headerColumns.map((columnNameElement) => {
        return mappedColIndex[columnNameElement];
      }),
    ];
  };

  toTableColumns = (headerColumns) => {};

  static convertSubmittedDataToAPIService(projectData) {
    console.log("convertSubmittedDataToAPIService");
  }
}

export default ProjectModel;
