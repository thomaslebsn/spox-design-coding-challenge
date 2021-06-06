import {
  CONTENT_FIELD_KEY,
  ESI_CONTENT_API_RESPONSE_FIELD_KEY,
} from '../../../constants/ContentModule';

import ContentPostFacebookModel from './ContentPostFacebookModel';
import ContentPostLinkedinModel from './ContentPostLinkedinModel';
import ContentPostInstagramModel from './ContentPostInstagramModel';
import ContentPostTwitterModel from './ContentPostTwitterModel';
import ContentPostYoutubeModel from './ContentPostYoutubeModel';
import ContentPostGoogleMyBusinessModel from './ContentPostGoogleMyBusinessModel';
import ContentPostTumblrModel from './ContentPostTumblrModel';
import ContentPostMediumModel from './ContentPostMediumModel';
import ContentPostWordpressModel from './ContentPostWordpressModel';
import ContentPostDrupalModel from './ContentPostDrupalModel';
import ContentPostJoomlaModel from './ContentPostJoomlaModel';
import ContentPostMailchimpModel from './ContentPostMailchimpModel';

class ContentPostTemplateModel {
  rawData = null;
  data = null;

  constructor(rawData) {
    this.rawData = rawData;
    this.data = {
      facebook: null,
      linkendin: null,
      instagram: null,
      twitter: null,
      youtube: null,
      google_my_business: null,
      tumblr: null,
      medium: null,
      wordpress: null,
      drupal: null,
      joomla: null,
      mailchimp: null
    }
  }

  transformDataToContentCreation = () => {
    console.log('rawDatarawDatarawDatarawData123');
    console.log(this.rawData);

    const facebookModel = new ContentPostFacebookModel(this.rawData)
    const linkedinModel = new ContentPostLinkedinModel(this.rawData)
    const instagramModel = new ContentPostInstagramModel(this.rawData)
    const twitterModel = new ContentPostTwitterModel(this.rawData)
    const youtubeModel = new ContentPostYoutubeModel(this.rawData)
    const googleMyBusinessModel = new ContentPostGoogleMyBusinessModel(this.rawData)
    const tumblrModel = new ContentPostTumblrModel(this.rawData)
    const mediumModel = new ContentPostMediumModel(this.rawData)
    const wordpressModel = new ContentPostWordpressModel(this.rawData)
    const drupalModel = new ContentPostDrupalModel(this.rawData)
    const joomlaModel = new ContentPostJoomlaModel(this.rawData)
    const mailchimpModel = new ContentPostMailchimpModel(this.rawData)

    this.data.facebook = facebookModel.transformDataToContentCreation()
    this.data.linkendin = linkedinModel.transformDataToContentCreation()
    this.data.instagram = instagramModel.transformDataToContentCreation()
    this.data.twitter = twitterModel.transformDataToContentCreation()
    this.data.youtube = youtubeModel.transformDataToContentCreation()
    this.data.google_my_business = googleMyBusinessModel.transformDataToContentCreation()
    this.data.tumblr = tumblrModel.transformDataToContentCreation()
    this.data.medium = mediumModel.transformDataToContentCreation()
    this.data.wordpress = wordpressModel.transformDataToContentCreation()
    this.data.drupal = drupalModel.transformDataToContentCreation()
    this.data.joomla = joomlaModel.transformDataToContentCreation()
    this.data.mailchimp = mailchimpModel.transformDataToContentCreation()

    const contentId = this.rawData[CONTENT_FIELD_KEY.ID] ? this.rawData[CONTENT_FIELD_KEY.ID] : 0;
    const result = this.rawData
      ? {
          general: {
            [ESI_CONTENT_API_RESPONSE_FIELD_KEY.ID]: contentId,
            [ESI_CONTENT_API_RESPONSE_FIELD_KEY.PROJECT]: 1,
            [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CAMPAIGN]: this.rawData[CONTENT_FIELD_KEY.CAMPAIGN],
            [ESI_CONTENT_API_RESPONSE_FIELD_KEY.PERSONA]: this.rawData[CONTENT_FIELD_KEY.PERSONA],
            [ESI_CONTENT_API_RESPONSE_FIELD_KEY.HEADLINE]: this.rawData[CONTENT_FIELD_KEY.NAME],
          //   projects: [],
          //   campaigns: [
          //   ],
          //   personas: [
          //   ],
          //   headline: "test headline"
          },
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CHANNELS]: this.data
          // [ESI_CONTENT_API_RESPONSE_FIELD_KEY.ID]: contentId,
          // [ESI_CONTENT_API_RESPONSE_FIELD_KEY.PROJECT]: 1,
          // [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CAMPAIGN]: this.rawData[CONTENT_FIELD_KEY.CAMPAIGN],
          // [ESI_CONTENT_API_RESPONSE_FIELD_KEY.PERSONA]: JSON.stringify(
          //   this.rawData[CONTENT_FIELD_KEY.PERSONA]
          // ),
          // [ESI_CONTENT_API_RESPONSE_FIELD_KEY.HEADLINE]: this.rawData[CONTENT_FIELD_KEY.NAME],
          // [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CHANNEL_DESCRIPTIONS]: JSON.stringify(this.data),
          // [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CONTENT_TO_POST]: {
          //   [ESI_CONTENT_API_RESPONSE_FIELD_KEY.HEADLINE]: this.rawData[CONTENT_FIELD_KEY.NAME],
          //   [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CANVA_EXPORTED_URL]:
          //   this.rawData[CONTENT_FIELD_KEY.CANVA_EXPORTED_URL],
          //   [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CANVA_DESIGN_ID]:
          //   this.rawData[CONTENT_FIELD_KEY.CANVA_DESIGN_ID],
          // },
        }
      : null;

    // return result;
    return JSON.stringify(result);
  }
}
export default ContentPostTemplateModel; 