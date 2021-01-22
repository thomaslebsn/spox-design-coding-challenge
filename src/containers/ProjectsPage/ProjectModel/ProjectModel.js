import { ProjectLeadModel } from "./ProjectLeadModel";
import { ProjectNameModel } from "./ProjectNameModel";
import { ProgressModel } from "./ProgressModel";
import FIELD_TYPE from "../../../constants/FieldType";
import { FORMAT_DATE } from "../../../constants/FormFieldType";
import { PROJECT_COLUMN_INDICATOR, ESI_PROJECT_COLUMN_INDICATOR } from "../../../constants/ProjectModule";

import { format } from "date-fns";
import { ESI_PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

class ProjectModel {
  constructor(data) {
    this.id = data.id ?? 0;
    this.name = data.title ?? "";
    this.logoUrl = data.logo ?? "";
    this.startdate = data.start_date ?? "";
    this.enddate = data.end_date ?? "";
    this.shortDescription = data.short_description ?? "";

    this.projectName =
      data.title && data.logo ? new ProjectNameModel(data) : null;

    this.projectLead = data.project_lead
      ? new ProjectLeadModel(data.project_lead)
      : null;

    this.progress = data.progress ? new ProgressModel(data) : null;

    this.createdate = data.created_date ?? "";
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
      value: this.name,
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
      value: this.startdate
        ? format(new Date(this.startdate), FORMAT_DATE)
        : "",
      original: this.startdate,
      type: FIELD_TYPE.DATE,
      columnName: PROJECT_COLUMN_INDICATOR.START_DATE,
      columnText: "Start Date",
    };
  };

  getEndDate = () => {
    return {
      value: this.enddate ? format(new Date(this.enddate), FORMAT_DATE) : "",
      original: this.enddate,
      type: FIELD_TYPE.DATE,
      columnName: PROJECT_COLUMN_INDICATOR.END_DATE,
      columnText: "End Date",
    };
  };

  getProgress = () => {
    return {
      value: this.progress ? this.progress.getProgress() : 0,
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
      value: this.projectLead ? this.projectLead.getName() : null,
      type: FIELD_TYPE.TEXT,
      columnName: PROJECT_COLUMN_INDICATOR.LEAD,
      columnText: "Lead",
    };
  };

  getCreateDate = () => {
    return {
      value: this.createdate
        ? format(new Date(this.createdate), FORMAT_DATE)
        : "",
      original: this.createdate,
      type: FIELD_TYPE.DATE,
      columnName: PROJECT_COLUMN_INDICATOR.CREATED_DATE,
      columnText: "Create Date",
    };
  };

  toTableRowData = () => {
    const id = this.getId(),
      name = this.getName(),
      shortDescription = this.getShortDescription(),
      startdate = this.getStartDate(),
      enddate = this.getEndDate(),
      logo = this.getLogoUrl(),
      lead = this.getLead(),
      progress = this.getProgress(),
      createdate = this.getCreateDate();

    return {
      [id.columnName]: id.value,
      [name.columnName]: this.projectName.getProjectName(),
      [shortDescription.columnName]: shortDescription.value,
      [startdate.columnName]: startdate.value,
      [enddate.columnName]: enddate.value,
      [lead.columnName]: lead.value,
      [progress.columnName]: progress.value,
      [logo.columnName]: logo.value,
      [createdate.columnName]: createdate.value,
    };
  };

  static convertSubmittedDataToAPIService(projectData) {
    const result = projectData
      ? {
          [ESI_PROJECT_COLUMN_INDICATOR.NAME]: projectData[PROJECT_COLUMN_INDICATOR.NAME],
          [ESI_PROJECT_COLUMN_INDICATOR.START_DATE]: projectData[PROJECT_COLUMN_INDICATOR.START_DATE],
          [ESI_PROJECT_COLUMN_INDICATOR.END_DATE]: projectData[PROJECT_COLUMN_INDICATOR.END_DATE],
          [ESI_PROJECT_COLUMN_INDICATOR.LOGO]: projectData[PROJECT_COLUMN_INDICATOR.LOGO],
          [ESI_PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION]:
            projectData[PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION],
            [ESI_PROJECT_COLUMN_INDICATOR.LEAD]: JSON.stringify([1]),
        }
      : null;
    return result;
  }
}

export default ProjectModel;
