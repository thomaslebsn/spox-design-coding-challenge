import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostLinkedinModel {
  description = null;
  assets = null;
  selectedPage = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.linkedin.description : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.linkedin.description;
    this.assets = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.linkedin.assets : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.linkedin.assets;
    this.selectedPage = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.linkedin.selectedPage : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.linkedin.selectedPage;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.linkedin.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.linkedin.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      assets: this.assets,
      selectedPage: this.selectedPage,
      publishedPlan: this.publishedPlan
    }
  }
}

export default ContentPostLinkedinModel;
  