import { default as BaseModel } from "../../../store/Models/Abstract/BaseModel";
import BaseItemModel from "../../../store/Models/Abstract/BaseItemModel";
import {
  ESI_PROJECT_CHANNEL_API_FIELD_KEY,
  ESI_PROJECT_CHANNEL_FIELD_KEY,
} from "../../../constants/ProjectChannelsModule";

class ContentConnectedChannelsModel extends BaseModel {
  items = [];
  unTransformedItems = [];
  constructor(entities) {
    if (entities) {
      super(entities);
      const projectChannels = entities;
      this.unTransformedItems = projectChannels;
      this.items = projectChannels.map((element) => {
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
  channel = null;
  project = null;
  handle = "";
  channelName = "";

  constructor(entity) {
    if (entity) {
      super(entity);
      this.channel = entity[ESI_PROJECT_CHANNEL_API_FIELD_KEY.CHANNEL] ?? [0];
      this.project = entity[ESI_PROJECT_CHANNEL_API_FIELD_KEY.PROJECT] ?? [0];
      this.handle = entity[ESI_PROJECT_CHANNEL_API_FIELD_KEY.HANDLE] ?? "";
      this.channelName =
        entity[ESI_PROJECT_CHANNEL_API_FIELD_KEY.CHANNEL_NAME] ?? "";
    }
  }

  extractCustomFieldValues = () => {
    const customFieldValues = this.getCustomfieldValues();
    if (customFieldValues) {
    }
  };

  getChannel = () => {
    return this.channel;
  };

  getProject = () => {
    return this.project;
  };

  getHandle = () => {
    return this.handle;
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
      [ESI_PROJECT_CHANNEL_FIELD_KEY.ID]: this.id,
      [ESI_PROJECT_CHANNEL_FIELD_KEY.CHANNEL]: this.channel,
      [ESI_PROJECT_CHANNEL_FIELD_KEY.PROJECT]: this.project,
      [ESI_PROJECT_CHANNEL_FIELD_KEY.HANDLE]: this.handle,
      [ESI_PROJECT_CHANNEL_FIELD_KEY.CHANNEL_NAME]: this.channelName,
    };
  };
}

export { ContentConnectedChannelsModel, ContentConnectedChannelItemModel };
