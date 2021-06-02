import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostFacebookModel {
  description = null;
  images = null;
  selectedPage = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.facebook.data : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.facebook.data;
    this.images = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.facebook.media : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.facebook.media;
    this.selectedPage = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.facebook.selectedPage : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.facebook.selectedPage;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.facebook.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.facebook.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      selectedPage: this.selectedPage,
      publishedPlan: this.publishedPlan,
    }
  }
}

export default ContentPostFacebookModel;
