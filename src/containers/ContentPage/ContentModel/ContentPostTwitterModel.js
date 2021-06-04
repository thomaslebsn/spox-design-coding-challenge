import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostTwitterModel {
  description = null;
  images = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.twitter.data : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.twitter.data;
    this.images = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.twitter.media : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.twitter.media;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.twitter.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.twitter.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      publishedPlan: this.publishedPlan,
    }
  }
}

export default ContentPostTwitterModel;
    