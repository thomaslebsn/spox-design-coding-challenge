import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostInstagramModel {
  description = null;
  images = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.instagram.data : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.instagram.data;
    this.images = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.instagram.media : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.instagram.media;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.instagram.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.instagram.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      publishedPlan: this.publishedPlan,
    }
  }
}

export default ContentPostInstagramModel;
  