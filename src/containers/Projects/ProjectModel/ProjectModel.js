import { ProjectLeadItemModel } from "./ProjectLeadModel";
import FIELD_TYPE from "../../../constants/FieldType";
import { FORMAT_DATE } from "../../../constants/FormFieldType";
import { PROJECT_COLUMN_INDICATOR } from "../../../constants/ProjectModule";

import moment from "moment";

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
      value: this.projectLead,
      type: FIELD_TYPE.MULTIPLE_SELECTION,
    };
  };

  toTableRowData = () => {
    const id = this.getId(),
      name = this.getName(),
      shortDescription = this.getShortDescription(),
      startdate = this.getStartDate(),
      enddate = this.getEndDate(),
      progress = this.getProgress(),
      logo = this.getLogoUrl();

    return {
      [id.columnName]: id.value,
      [name.columnName]: name.value,
      [shortDescription.columnName]: shortDescription.value,
      [startdate.columnName]: startdate.value,
      [enddate.columnName]: enddate.value,
      [progress.columnName]: progress.value,
      [logo.columnName]: logo.value,
    };
  };

  static convertSubmittedDataToAPIService(projectData) {
    const result = projectData
      ? {
          name: projectData[PROJECT_COLUMN_INDICATOR.NAME],
          start_date: moment(
            projectData[PROJECT_COLUMN_INDICATOR.START_DATE]
          ).format(FORMAT_DATE),
          end_date: moment(
            projectData[PROJECT_COLUMN_INDICATOR.END_DATE]
          ).format(FORMAT_DATE),
          logo_url: projectData[PROJECT_COLUMN_INDICATOR.LOGO],
          short_description:
            projectData[PROJECT_COLUMN_INDICATOR.SHORT_DESCRIPTION],
        }
      : null;
    return result;
  }
}

export default ProjectModel;
