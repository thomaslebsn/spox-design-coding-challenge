import { format } from "date-fns";

import FIELD_TYPE from "../../../constants/FieldType";
import { FORMAT_DATE } from "../../../constants/FormFieldType";
import { ProgressModel } from "./ProgressModel";
import getStatus from "../../../utils/status";

import {
  CAMPAIGNS_FIELD_KEY,
  CAMPAIGN_API_FIELD_KEY,
} from "../../../constants/CampaignsModule";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

class CampaignsModel {
  constructor(data) {
    console.log('----- DATA -----', data[CAMPAIGN_API_FIELD_KEY.ID]);
    this.id = data[CAMPAIGN_API_FIELD_KEY.ID];
    this.name = data[CAMPAIGN_API_FIELD_KEY.NAME] ?? "";
    this.status = data[CAMPAIGN_API_FIELD_KEY.STATUS] ?? "";
    this.startdate = data[CAMPAIGN_API_FIELD_KEY.START_DATE] ?? "";
    this.enddate = data[CAMPAIGN_API_FIELD_KEY.END_DATE] ?? "";
    this.needtodo = data.[CAMPAIGN_API_FIELD_KEY.NEED_TO_DO] ?? "";
    this.schedudepost = data[CAMPAIGN_API_FIELD_KEY.SCHEDUDE_POST] ?? "";
    this.publishedcontent = data[CAMPAIGN_API_FIELD_KEY.PUBLISHED_CONTENT] ?? "";

    this.project = data[CAMPAIGN_API_FIELD_KEY.PROJECT] ?? "";

    this.percentComplete = data[CAMPAIGN_API_FIELD_KEY.PERCENT_COMPLETE] ?? "";
    this.progress = data[CAMPAIGN_API_FIELD_KEY.PROGRESS] ? new ProgressModel(data) : 0;
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

  getPercentComplete = () => {
    return {
      value: this.percentComplete,
      type: FIELD_TYPE.TEXT,
      columnName: CAMPAIGNS_FIELD_KEY.PERCENT_COMPLETE,
      columnText: "Percent Complete",
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
      value: this.startdate
        ? format(new Date(this.startdate), FORMAT_DATE)
        : "",
      original: this.startdate,
      type: FIELD_TYPE.DATE,
      columnName: CAMPAIGNS_FIELD_KEY.START_DATE,
      columnText: "Start Date",
    };
  };

  getEndDate = () => {
    return {
      value: this.enddate ? format(new Date(this.enddate), FORMAT_DATE) : "",
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
      value: this.progress ? this.progress.getProgress() : "",
      type: FIELD_TYPE.TEXT,
      columnName: CAMPAIGNS_FIELD_KEY.PROGRESS,
      columnText: "Progress",
    };
  };

  toTableRowData = () => {
    try {
      const id = this.getId(),
        name = this.getName(),
        status = this.getStatus(),
        startDate = this.getStartDate(),
        endDate = this.getEndDate(),
        needToDo = this.getNeedToDo(),
        schedudePost = this.getSchedudePost(),
        publishedContent = this.getPublishedContent(),
        progress = this.getProgress();
      const result = {
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
      console.log("Campaign - toTableRowData");
      console.log(result);
      return result;
    } catch (error) {
      console.log("Campaign - toTableRowData = ERROR ");
      console.log(error);
      return null;
    }
  };

  static convertSubmittedDataToAPIService(campaignsData) {
    campaignsData[CAMPAIGNS_FIELD_KEY.PROJECT] = 199;

    const result = campaignsData
      ? {
          [CAMPAIGN_API_FIELD_KEY.ID]:
            campaignsData[CAMPAIGNS_FIELD_KEY.ID] ?? "",
          [CAMPAIGN_API_FIELD_KEY.NAME]:
            campaignsData[CAMPAIGNS_FIELD_KEY.NAME] ?? "",
          [CAMPAIGN_API_FIELD_KEY.START_DATE]:
            campaignsData[CAMPAIGNS_FIELD_KEY.START_DATE] ?? "",
          [CAMPAIGN_API_FIELD_KEY.END_DATE]:
            campaignsData[CAMPAIGNS_FIELD_KEY.END_DATE] ?? "",
          [CAMPAIGN_API_FIELD_KEY.PROJECT]:
            campaignsData[CAMPAIGNS_FIELD_KEY.PROJECT] ?? "",
          [CAMPAIGN_API_FIELD_KEY.NEED_TO_DO]:
            campaignsData[CAMPAIGNS_FIELD_KEY.NEED_TO_DO] ?? "",
          [CAMPAIGN_API_FIELD_KEY.SCHEDUDE_POST]:
            campaignsData[CAMPAIGNS_FIELD_KEY.SCHEDUDE_POST] ?? "",
          [CAMPAIGN_API_FIELD_KEY.PUBLISHED_CONTENT]:
            campaignsData[CAMPAIGNS_FIELD_KEY.PUBLISHED_CONTENT] ?? "",
          [CAMPAIGN_API_FIELD_KEY.PROGRESS]:
            campaignsData[CAMPAIGNS_FIELD_KEY.PROGRESS] ?? "",
        }
      : null;

    return result;
  }
}

export default CampaignsModel;
