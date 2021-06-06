import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostMediumModel {
  description = null;
  assets = null;
  selectedPage = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.medium.description : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.medium.description;
    this.assets = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.medium.assets : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.medium.assets;
    this.selectedPage = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.medium.selectedPage : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.medium.selectedPage;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.medium.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.medium.publishedPlan;
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

export default ContentPostMediumModel;