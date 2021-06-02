import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostLinkedinModel {
  description = null;
  images = null;
  selectedPage = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.linkedin.data : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.linkedin.data;
    this.images = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.linkedin.media : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.linkedin.media;
    this.selectedPage = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.linkedin.selectedPage : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.linkedin.selectedPage;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.linkedin.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.linkedin.publishedPlan;
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

export default ContentPostLinkedinModel;
  