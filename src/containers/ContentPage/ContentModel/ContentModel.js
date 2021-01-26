import FIELD_TYPE from "../../../constants/FieldType";

import {
  CONTENT_FIELD_KEY,
  ESI_CONTENT_API_RESPONSE_FIELD_KEY,
} from "../../../constants/ContentModule";
import getStatus from "../../../utils/status";
import { DescriptionsModel } from "./DescriptionsModel";

import ChannelUtils from "../../ChannelsPage/ChannelUtils/ChannelUtils";
import CampaignsStore from "../../CampaignsPage/CampaignsStore/CampaignsStore";
import PersonaStore from "../../PersonasPage/PersonaStore/PersonaStore";

class ContentModel {
  constructor(data) {
    console.log("datadatadatadatadatadatadatadata", data);
    this.id = data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.ID] ?? 0;
    this.name = data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.HEADLINE] ?? "";
    this.channels = data.channel_descriptions ?? "";

    this.channelsModel = ChannelUtils.transformChannelResponseIntoModel(
      this.channels
    );

    this.channelsData = this.status = data.status ?? "";

    this.descriptions =
      data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.CHANNEL_DESCRIPTIONS].items ?? [];

    this.descriptionsModel = this.descriptions
      ? new DescriptionsModel(
          data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.CHANNEL_DESCRIPTIONS].items
        )
      : null;

    this.campaignId = data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.CAMPAIGN] ?? "";
    this.personaId = data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.PERSONA] ?? "";
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
    console.log(
      "this.descriptionsModel.getChannelDescriptions()",
      this.descriptionsModel.getChannelDescriptions()
    );
    return {
      value: this.descriptionsModel.getChannelDescriptions(),
      type: FIELD_TYPE.TEXT,
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

  getCampaign = () => {
    if (this.campaignId) {
      const campaignsStore = new CampaignsStore();
      campaignsStore.getCampaigns(
        this.campainId,
        (data) => {
          console.log("this.campaignModel campaignModel", data);
        },
        () => {}
      );
    }
    return null;
  };

  getPersona = () => {
    if (this.personaId) {
      const personaStore = new PersonaStore();
      personaStore.getPersona(
        this.personaId,
        (data) => {
          console.log("this.personaModel", data);
        },
        () => {}
      );
    }
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
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.HEADLINE]:
            contentData[CONTENT_FIELD_KEY.NAME],
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.THEME]: 1,
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CUSTOMIZE_SCHEDULE_FOR_EACH_CHANNEL]: 1,
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.PUBLISH_DATE]:
            "2020-11-02T00:00:00+00:00",
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.PUBLISH_REGULARLY]: 1,
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.SCHEDULE_CHANNEL]: 1,
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.DATE_FROM]: new Date(),
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.DATE_UNTIL]: new Date(),
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.TIME]: new Date(),
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CAMPAIGN]: 366,
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CHANNEL_DESCRIPTIONS]: [
            {
              channel_id: 215,
              description: contentData[CONTENT_FIELD_KEY.DESCRIPTION],
            },
          ],
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.PERSONA]: 7,
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.STATUS]: 1,
        }
      : null;
    return result;
  }
}

export default ContentModel;
