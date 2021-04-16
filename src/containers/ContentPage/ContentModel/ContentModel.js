import FIELD_TYPE from "../../../constants/FieldType";

import {
  CONTENT_FIELD_KEY,
  ESI_CONTENT_API_RESPONSE_FIELD_KEY,
} from "../../../constants/ContentModule";

import {
  PERSONA_FIELD_KEY,
  ESI_PERSONA_FIELD_KEY,
} from "../../../constants/PersonaModule";

import {
  CAMPAIGNS_FIELD_KEY,
  CAMPAIGN_API_FIELD_KEY,
} from "../../../constants/CampaignsModule";

import getStatus from "../../../utils/status";
import { DescriptionsModel } from "./DescriptionsModel";

import ChannelUtils from "../../ChannelsPage/ChannelUtils/ChannelUtils";
import CampaignsStore from "../../CampaignsPage/CampaignsStore/CampaignsStore";
import PersonaStore from "../../PersonasPage/PersonaStore/PersonaStore";

import ContentThemeStore from "../ContentStore/ContentThemeStore";

class ContentModel {
  constructor(data) {
    this.id = data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.ID] ?? 0;
    this.name = data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.HEADLINE] ?? "";
    this.channelsData = this.status = data.status ?? "";

    this.descriptions =
      data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.CHANNEL_DESCRIPTIONS].items ?? [];

    this.descriptionsModel =
      this.descriptions.length > 0
        ? new DescriptionsModel(
            data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.CHANNEL_DESCRIPTIONS].items
          )
        : null;

    this.campaignId = data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.CAMPAIGN] ?? "";
    this.personaId = data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.PERSONA] ?? "";
    this.themeId = data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.THEME] ?? "";
    this.channelAttachments =
      data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.CHANNEL_ATTACHMENTS] ?? "";
    this.channels = [];

    if (this.channelAttachments) {
      this.channelAttachments.getItems().map((element) => {
        let icoImage = null;
        switch (element.channelName.toLowerCase()) {
          case "facebook":
            icoImage = "/assets/images/facebook.png";
            break;
          case "youtube":
            icoImage = "/assets/images/youtube.png";
            break;
          case "twitter":
            icoImage = "/assets/images/twitter.png";
            break;
          case "linkedin":
            icoImage = "/assets/images/linkedin.png";
            break;
          case "mailchimp":
            icoImage = "/assets/images/mailchimp.png";
            break;
          case "wordpress":
            icoImage = "/assets/images/wordpress.png";
            break;
          case "instagram":
            icoImage = "/assets/images/instagram.png";
            break;
          case "joomla":
            icoImage = "/assets/images/joomla.png";
            break;
          case "medium":
            icoImage = "/assets/images/medium.png";
            break;
          default:
            icoImage = null;
        }

        this.channels.push({
          id: element.channelId,
          name: element.channelName,
          image: icoImage,
          icon: icoImage,
          checked: true,
        });
      });
    }

    this.channelsModel = ChannelUtils.transformChannelResponseIntoModel(
      this.channels
    );
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
      value:
        this.descriptionsModel !== null
          ? this.descriptionsModel.getChannelDescriptions()
          : null,
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

  getTheme = () => {
    if (this.themeId) {
      const contentThemeStore = new ContentThemeStore();
      contentThemeStore.getContentTheme(
        this.themeId,
        (data) => {
          console.log("this.contentThemeStore", data);
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
    const id = this.getId();
    const name = this.getName();
    console.log("===============34");
    const description = this.getDescription();
    const status = this.getStatus();
    const channels = this.getChannels();

    return {
      [id.columnName]: id.value,
      [name.columnName]: name.value,
      [description.columnName]: description.value,
      [status.columnName]: status.value,
      [channels.columnName]: channels.value,
    };
  };

  static convertSubmittedDataToAPIService(contentData) {
    console.log("convertSubmittedDataToAPIService");

    const contentId = contentData[CONTENT_FIELD_KEY.ID]
      ? contentData[CONTENT_FIELD_KEY.ID]
      : 0;
    // hard code "1" as project-id for demo purpose
    const result = contentData
      ? {
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.ID]: contentId,
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.PROJECT]: 1,
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CAMPAIGN]:
            contentData[CONTENT_FIELD_KEY.CAMPAIGN],
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.PERSONA]: JSON.stringify(
            contentData[CONTENT_FIELD_KEY.PERSONA]
          ),
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CONTENT_TO_POST]: {
            [ESI_CONTENT_API_RESPONSE_FIELD_KEY.HEADLINE]:
              contentData[CONTENT_FIELD_KEY.NAME],
            [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CANVA_EXPORTED_URL]:
              contentData[CONTENT_FIELD_KEY.CANVA_EXPORTED_URL],
            [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CANVA_DESIGN_ID]:
              contentData[CONTENT_FIELD_KEY.CANVA_DESIGN_ID],
          },
        }
      : null;
    return result;
  }
}

export default ContentModel;
