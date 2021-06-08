import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostGoogleMyBusinessModel {
  description = null;
  assets = null;
  selectedPage = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.google_my_business.description : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.google_my_business.description;
    this.assets = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.google_my_business.assets : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.google_my_business.assets;
    this.selectedPage = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.google_my_business.selectedPage : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.google_my_business.selectedPage;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.google_my_business.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.google_my_business.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      assets: this.assets,
      selectedPage: this.selectedPage,
      publishedPlan: this.publishedPlan,
    }
  }
}

export default ContentPostGoogleMyBusinessModel;
    