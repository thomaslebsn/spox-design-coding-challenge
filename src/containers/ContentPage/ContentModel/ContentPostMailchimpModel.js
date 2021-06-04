import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostMailchimpModel {
  description = null;
  images = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.mail.mailchimp.data : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.mailchimp.data;
    this.images = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.mail.mailchimp.media : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.mailchimp.media;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.mail.mailchimp.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.mailchimp.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      publishedPlan: this.publishedPlan,
    }
  }
}

export default ContentPostMailchimpModel;
  