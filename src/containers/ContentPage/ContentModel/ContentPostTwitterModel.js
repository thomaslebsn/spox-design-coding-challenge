import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostTwitterModel {
  description = null;
  assets = null;
  selectedPage = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.twitter.description : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.twitter.description;
    this.assets = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.twitter.assets : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.twitter.assets;
    this.selectedPage = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.twitter.selectedPage : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.twitter.selectedPage;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.twitter.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.twitter.publishedPlan;
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

export default ContentPostTwitterModel;
    