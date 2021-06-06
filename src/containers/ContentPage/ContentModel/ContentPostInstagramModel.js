import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostInstagramModel {
  description = null;
  assets = null;
  selectedPage = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.instagram.description : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.instagram.description;
    this.assets = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.instagram.assets : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.instagram.assets;
    this.selectedPage = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.instagram.selectedPage : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.instagram.selectedPage;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.instagram.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.instagram.publishedPlan;
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

export default ContentPostInstagramModel;
  