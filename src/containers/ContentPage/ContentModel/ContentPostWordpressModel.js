import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostWordpressModel {
  description = null;
  assets = null;
  selectedPage = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.wordpress.description : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.wordpress.description;
    this.assets = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.wordpress.assets : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.wordpress.assets;
    this.selectedPage = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.wordpress.selectedPage : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.wordpress.selectedPage;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.wordpress.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.wordpress.publishedPlan;
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

export default ContentPostWordpressModel;