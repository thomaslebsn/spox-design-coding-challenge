import {
  ProjectLeadModel
} from "./ProjectLeadModel";
import {
  ProjectNameModel
} from "./ProjectNameModel";
import FIELD_TYPE from "../../../constants/FieldType";
import {
  PROJECT_COLUMN_INDICATOR
} from "../../../constants/ProjectModule";

class ProjectModel {
  constructor(data) {
    this.id = data.id ?? 0;
    this.name = data.name ?? "";
    this.logoUrl = data.logo_url ?? "";
    this.startdate = data.start_date ?? "";
    this.enddate = data.end_date ?? "";
    this.progress = data.progress ?? 0;
    this.shortDescription = data.short_description ?? "";

    this.projectName = data.name && data.logo_url ? new ProjectNameModel(data.name && data.logo_url) :
    null;

    this.projectLead = data.project_lead ?
      new ProjectLeadModel(data.project_lead) :
      null;

    this.createDate = data.createDate ?? "";
    this.lastModifiedDate = data.last_modified_date ?? "";
    this.createdBy = data.create_by ?? "";
    this.lastModifiedBy = data.last_modified_by ?? "";
  }

  getId = () => {
    return {
      value: this.id,
      type: FIELD_TYPE.READONLY,
      columnName: PROJECT_COLUMN_INDICATOR.ID,
      columnText: "ID",
    };
  };

  getName = () => {
    return {
      value: this.projectName,
      type: FIELD_TYPE.TEXT,
      columnName: PROJECT_COLUMN_INDICATOR.NAME,
      columnText: "Name",
    };
  };

  getLogoUrl = () => {
    return {
      value: this.logoUrl,
      type: FIELD_TYPE.IMAGE,
      columnName: PROJECT_COLUMN_INDICATOR.LOGO,
      columnText: "Logo Url",
    };
  };

  getStartDate = () => {
    return {
      value: this.startdate,
      type: FIELD_TYPE.DATE,
      columnName: PROJECT_COLUMN_INDICATOR.START_DATE,
      columnText: "Start Date",
    };
  };

  getEndDate = () => {
    return {
      value: this.enddate,
      type: FIELD_TYPE.DATE,
      columnName: PROJECT_COLUMN_INDICATOR.END_DATE,
      columnText: "End Date",
    };
  };

  getProgress = () => {
    return {
      value: this.progress,
      type: FIELD_TYPE.TEXT,
      columnName: PROJECT_COLUMN_INDICATOR.PROGRESS,
      columnText: "Progress",
    };
  };

  getShortDescription = () => {
    return {
      value: this.shortDescription,
      type: FIELD_TYPE.RICHTEXT,
      columnName: PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION,
      columnText: "Short Description",
    };
  };

  getLead = () => {
    return {
      value: this.projectLead.getName(),
      type: FIELD_TYPE.TEXT,
      columnName: PROJECT_COLUMN_INDICATOR.LEAD,
      columnText: "Lead",
    };
  };

  toTableRowData = () => {
    const id = this.getId(),
      name = this.getName(),
      shortDescription = this.getShortDescription(),
      startdate = this.getStartDate(),
      enddate = this.getEndDate(),
      lead = this.getLead(),
      progress = this.getProgress();

    return {
      [id.columnName]: id.value,
      [name.columnName]: name.value,
      [shortDescription.columnName]: shortDescription.value,
      [startdate.columnName]: startdate.value,
      [enddate.columnName]: enddate.value,
      [lead.columnName]: lead.value,
      [progress.columnName]: progress.value,
    };
  };

  toTableColumns = (headerColumns) => {};

  static convertSubmittedDataToAPIService(projectData) {
    console.log("convertSubmittedDataToAPIService");
  }
}

export default ProjectModel;