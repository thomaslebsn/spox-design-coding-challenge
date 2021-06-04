import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostTumblrModel {
  description = null;
  images = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.tumblr.data : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.tumblr.data;
    this.images = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.tumblr.media : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.tumblr.media;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.tumblr.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.tumblr.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      publishedPlan: this.publishedPlan,
    }
  }
}

export default ContentPostTumblrModel;