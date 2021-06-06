import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostJoomlaModel {
  description = null;
  assets = null;
  selectedPage = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.joomla.description : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.joomla.description;
    this.assets = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.joomla.assets : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.joomla.assets;
    this.selectedPage = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.joomla.selectedPage : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.joomla.selectedPage;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.cms.joomla.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.joomla.publishedPlan;
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

export default ContentPostJoomlaModel;