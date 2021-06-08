import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostDrupalModel {
  description = null;
  assets = null;
  selectedPage = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.drupal.description : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.drupal.description;
    this.assets = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.drupal.assets : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.drupal.assets;
    this.selectedPage = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.drupal.selectedPage : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.drupal.selectedPage;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.drupal.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.drupal.publishedPlan;
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

export default ContentPostDrupalModel;