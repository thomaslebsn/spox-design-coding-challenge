import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostYoutubeModel {
  description = null;
  assets = null;
  selectedPage = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.youtube.description : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.youtube.description;
    this.assets = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.youtube.assets : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.youtube.assets;
    this.selectedPage = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.youtube.selectedPage : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.youtube.selectedPage;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.youtube.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.youtube.publishedPlan;
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

export default ContentPostYoutubeModel;
