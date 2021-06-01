import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostDrupalModel {
  description = null;
  images = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.drupal.data : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.drupal.data;
    this.images = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.drupal.media : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.drupal.media;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.drupal.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.drupal.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      publishedPlan: this.publishedPlan,
    }
  }
}

export default ContentPostDrupalModel;