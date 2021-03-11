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

  constructor(entity) {
    if (entity) {
      super(entity);
      this.channel = entity[ESI_PROJECT_CHANNEL_API_FIELD_KEY.CHANNEL] ?? [0];
      this.project = entity[ESI_PROJECT_CHANNEL_API_FIELD_KEY.PROJECT] ?? [0];
      this.handle = entity[ESI_PROJECT_CHANNEL_API_FIELD_KEY.HANDLE] ?? "";
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
    const images = null;
    // switch()
    return {
        images: "/assets/images/ic-facebook.svg",
        des: this.channel,
    };
  };

  toObject = () => {
    return {
      [ESI_PROJECT_CHANNEL_FIELD_KEY.ID]: this.id,
      [ESI_PROJECT_CHANNEL_FIELD_KEY.CHANNEL]: this.channel,
      [ESI_PROJECT_CHANNEL_FIELD_KEY.PROJECT]: this.project,
      [ESI_PROJECT_CHANNEL_FIELD_KEY.HANDLE]: this.handle,
    };
  };
}

export { ContentConnectedChannelsModel, ContentConnectedChannelItemModel };
