import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostFacebookModel {
  description = null;
  assets = null;
  selectedPage = null;
  publishedPlan = null;
  // canvaAssets = null;
  // damAssets = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.facebook.description : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.facebook.description;
    this.assets = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.facebook.assets : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.facebook.assets;
    this.selectedPage = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.facebook.selectedPage : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.facebook.selectedPage;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.facebook.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.facebook.publishedPlan;
    //this.canvaAssets = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.facebook.assets.canvaAssets : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.facebook.facebook.assets.canvaAssets;
    //this.damAssets = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.facebook.assets.damAssets : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.facebook.facebook.assets.damAssets;
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

export default ContentPostFacebookModel;
