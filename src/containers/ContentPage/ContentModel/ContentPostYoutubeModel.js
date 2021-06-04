import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostYoutubeModel {
  description = null;
  images = null;
  selectedPage = null;
  publishedPlan = null;
  video = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.youtube.data : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.youtube.data;
    this.images = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.youtube.media : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.youtube.media;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.youtube.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.youtube.publishedPlan;
    this.video = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.youtube.video : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.youtube.video;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      selectedPage: this.selectedPage,
      publishedPlan: this.publishedPlan,
      video: this.video
    }
  }
}

export default ContentPostYoutubeModel;
