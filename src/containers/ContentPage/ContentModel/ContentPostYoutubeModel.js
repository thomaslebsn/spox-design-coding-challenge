import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostYoutubeModel {
  description = null;
  assets = null;
  selectedPage = null;
  publishedPlan = null;
  videoAssets = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.youtube.description : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.youtube.description;
    this.selectedPage = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.youtube.selectedPage : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.youtube.selectedPage;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.youtube.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.youtube.publishedPlan;
    this.videoAssets = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.youtube.assets.videoAssets : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.youtube.assets.videoAssets;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      selectedPage: this.selectedPage,
      publishedPlan: this.publishedPlan,
      videoAssets: this.videoAssets
    }
  }
}

export default ContentPostYoutubeModel;
