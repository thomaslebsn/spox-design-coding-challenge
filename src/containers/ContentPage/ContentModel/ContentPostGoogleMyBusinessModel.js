import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostGoogleMyBusinessModel {
  description = null;
  images = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.google_my_business.data : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.google_my_business.data;
    this.images = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.google_my_business.media : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.google_my_business.media;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.google_my_business.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.google_my_business.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      publishedPlan: this.publishedPlan,
    }
  }
}

export default ContentPostGoogleMyBusinessModel;
    