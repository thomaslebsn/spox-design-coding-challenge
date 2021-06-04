import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostMediumModel {
  description = null;
  images = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.medium.data : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.medium.data;
    this.images = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.medium.media : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.medium.media;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.medium.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.medium.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      publishedPlan: this.publishedPlan,
    }
  }
}

export default ContentPostMediumModel;