import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostWordpressModel {
  description = null;
  images = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.wordpress.data : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.wordpress.data;
    this.images = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.wordpress.media : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.wordpress.media;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.wordpress.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.wordpress.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      publishedPlan: this.publishedPlan,
    }
  }
}

export default ContentPostWordpressModel;