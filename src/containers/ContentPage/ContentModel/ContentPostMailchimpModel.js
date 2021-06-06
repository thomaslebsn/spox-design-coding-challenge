import {
  CONTENT_FIELD_KEY
} from '../../../constants/ContentModule';

class ContentPostMailchimpModel {
  description = null;
  assets = null;
  selectedPage = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.mail.mailchimp.description : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.mailchimp.description;
    this.assets = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.mail.mailchimp.assets : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.mailchimp.assets;
    this.selectedPage = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.mail.mailchimp.selectedPage : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.mailchimp.selectedPage;
    this.publishedPlan = rawData[CONTENT_FIELD_KEY.DESCRIPTION].advance_mode ? rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.mail.mailchimp.publishedPlan : rawData[CONTENT_FIELD_KEY.DESCRIPTION].list_channels.mailchimp.publishedPlan;
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

export default ContentPostMailchimpModel;
  