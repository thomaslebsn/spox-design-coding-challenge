import { default as BaseModel } from "../../../store/Models/Abstract/BaseModel";
import BaseItemModel from "../../../store/Models/Abstract/BaseItemModel";
import {
  ESI_ORGANIZATION_CHANNEL_API_FIELD_KEY,
  ESI_ORGANIZATION_CHANNEL_FIELD_KEY,
} from "../../../constants/OrganizationChannelsModule";

class ContentConnectedChannelsModel extends BaseModel {
  items = [];
  unTransformedItems = [];
  constructor(entities) {
    if (entities) {
      console.log("constructor - ContentConnectedChannelsModel");
      super(entities);
      const organizationChannels = entities;
      console.log(organizationChannels);
      this.unTransformedItems = organizationChannels;
      this.items = organizationChannels.map((element) => {
        return new ContentConnectedChannelItemModel(element);
      });
    }
  }

  toListConnectedChannelsOnContentForm = () => {
    if (!this.items) return null;
    return this.items.map((element) => {
      return element ? element.toConnectedChannelItemOnContentForm() : null;
    });
  };
}

class ContentConnectedChannelItemModel extends BaseItemModel {
  channelId = null;
  channelName = "";

  constructor(entity) {
    if (entity) {
      super(entity);
      this.channelId = entity[ESI_ORGANIZATION_CHANNEL_API_FIELD_KEY.ID] ?? [0];
      this.channelName =
        entity[ESI_ORGANIZATION_CHANNEL_API_FIELD_KEY.CHANNEL_NAME] ?? "";
    }
  }

  extractCustomFieldValues = () => {
    const customFieldValues = this.getCustomfieldValues();
    if (customFieldValues) {
    }
  };

  getChannelId = () => {
    return this.channelId;
  };

  toConnectedChannelItemOnContentForm = () => {
    let icoImage = null;
    switch (this.channelName.toLowerCase()) {
      case "facebook":
        icoImage = "/assets/images/facebook.png";
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
      default:
        icoImage = null;
    }
    return {
      images: icoImage,
      des: this.channelName,
    };
  };

  toObject = () => {
    return {
      [ESI_ORGANIZATION_CHANNEL_FIELD_KEY.ID]: this.channelId,
      [ESI_ORGANIZATION_CHANNEL_FIELD_KEY.CHANNEL_NAME]: this.channelName,
    };
  };
}

export { ContentConnectedChannelsModel, ContentConnectedChannelItemModel };
