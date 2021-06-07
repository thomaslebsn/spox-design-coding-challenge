import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostTumblrModel {
  description = null;
  assets = null;
  selectedPage = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.tumblr.description : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.tumblr.description;
    this.assets = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.tumblr.assets : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.tumblr.assets;
    this.selectedPage = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.tumblr.selectedPage : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.tumblr.selectedPage;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.tumblr.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.tumblr.publishedPlan;
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

export default ContentPostTumblrModel;