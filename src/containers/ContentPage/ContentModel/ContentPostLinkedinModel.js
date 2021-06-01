import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostLinkedinModel {
  description = null;
  images = null;
  selectedPage = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.linkendin.data : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.linkendin.data;
    this.images = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.linkendin.media : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.linkendin.media;
    this.selectedPage = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.linkendin.selectedPage : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.linkendin.selectedPage;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.social.linkendin.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.linkendin.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      selectedPage: this.selectedPage,
      publishedPlan: this.publishedPlan,
    }
  }
}

export default ContentPostLinkedinModel;
  