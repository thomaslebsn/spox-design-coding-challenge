import { format } from "date-fns";

import FIELD_TYPE from "../../../constants/FieldType";
import { FORMAT_DATE } from "../../../constants/FormFieldType";
import { ProgressModel } from "./ProgressModel";
import getStatus from "../../../utils/status";

import { CAMPAIGNS_FIELD_KEY } from "../../../constants/CampaignsModule";

class CampaignsModel {
  constructor(data) {
    this.id = data.id ?? 0;
    this.name = data.name ?? "";
    this.status = data.status ?? "";
    this.startdate = data.start_date ?? "";
    this.enddate = data.end_date ?? "";
    this.needtodo = data.need_to_do ?? "";
    this.schedudepost = data.schedude_post ?? "";
    this.publishedcontent = data.publish_content ?? "";
    this.progress = data.progress ? new ProgressModel(data) : 0;
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

  getStatus = () => {
    return {
      value: getStatus(this.status),
      type: FIELD_TYPE.TEXT,
      columnName: CAMPAIGNS_FIELD_KEY.STATUS,
      columnText: "Status",
    };
  };

  getStartDate = () => {
    return {
      value: format(new Date(this.startdate), FORMAT_DATE),
      original: this.startdate,
      type: FIELD_TYPE.DATE,
      columnName: CAMPAIGNS_FIELD_KEY.START_DATE,
      columnText: "Start Date",
    };
  };

  getEndDate = () => {
    return {
      value: format(new Date(this.enddate), FORMAT_DATE),
      original: this.enddate,
      type: FIELD_TYPE.DATE,
      columnName: CAMPAIGNS_FIELD_KEY.END_DATE,
      columnText: "End Date",
    };
  };

  getNeedToDo = () => {
    return {
      value: this.needtodo,
      type: FIELD_TYPE.TEXT,
      columnName: CAMPAIGNS_FIELD_KEY.NEED_TO_DO,
      columnText: "Need To Do",
    };
  };

  getSchedudePost = () => {
    return {
      value: this.schedudepost,
      type: FIELD_TYPE.TEXT,
      columnName: CAMPAIGNS_FIELD_KEY.SCHEDUDE_POST,
      columnText: "Schedude post",
    };
  };

  getPublishedContent = () => {
    return {
      value: this.publishedcontent,
      type: FIELD_TYPE.TEXT,
      columnName: CAMPAIGNS_FIELD_KEY.PUBLISHED_CONTENT,
      columnText: "Published content",
    };
  };

  getProgress = () => {
    return {
      value: this.progress.getProgress(),
      type: FIELD_TYPE.TEXT,
      columnName: CAMPAIGNS_FIELD_KEY.PROGRESS,
      columnText: "Progress",
    };
  };

  toTableRowData = () => {
    const id = this.getId(),
      name = this.getName(),
      status = this.getStatus(),
      startDate = this.getStartDate(),
      endDate = this.getEndDate(),
      needToDo = this.getNeedToDo(),
      schedudePost = this.getSchedudePost(),
      publishedContent = this.getPublishedContent(),
      progress = this.getProgress();

    return {
      [id.columnName]: id.value,
      [name.columnName]: name.value,
      [status.columnName]: status.value,
      [startDate.columnName]: startDate.value,
      [endDate.columnName]: endDate.value,
      [needToDo.columnName]: needToDo.value,
      [schedudePost.columnName]: schedudePost.value,
      [publishedContent.columnName]: publishedContent.value,
      [progress.columnName]: progress.value,
    };
  };

  static convertSubmittedDataToAPIService(campaignsData) {
    const result = campaignsData
      ? {
          name: campaignsData[CAMPAIGNS_FIELD_KEY.NAME],
          start_date: campaignsData[CAMPAIGNS_FIELD_KEY.START_DATE],
          end_date: campaignsData[CAMPAIGNS_FIELD_KEY.END_DATE],
          need_to_do: campaignsData[CAMPAIGNS_FIELD_KEY.NEED_TO_DO],
          schedude_post: campaignsData[CAMPAIGNS_FIELD_KEY.SCHEDUDE_POST],
          publish_content: campaignsData[CAMPAIGNS_FIELD_KEY.PUBLISHED_CONTENT],
          progress: campaignsData[CAMPAIGNS_FIELD_KEY.PROGRESS],
        }
      : null;
    return result;
  }
}

export default CampaignsModel;
