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
  arrayConnectedChannelsFinal = null;

  constructor(rawData, arrayConnectedChannelsFinal) {
    this.rawData = rawData;
<<<<<<< Updated upstream
    this.arrayConnectedChannelsFinal = arrayConnectedChannelsFinal;
    this.data = {}
=======
>>>>>>> Stashed changes
  }

  transformDataToContentCreation = () => {
    console.log('rawDatarawDatarawDatarawData123');
    console.log(this.rawData);
    console.log(this.arrayConnectedChannelsFinal);

    let labelsConnectedChannels = this.arrayConnectedChannelsFinal && this.arrayConnectedChannelsFinal.map((value) => value.des)

    console.log('labelsConnectedChannels123tranfer');
    console.log(labelsConnectedChannels);

    const facebookModel = new ContentPostFacebookModel(this.rawData);
    const linkedinModel = new ContentPostLinkedinModel(this.rawData);
    const instagramModel = new ContentPostInstagramModel(this.rawData);
    const twitterModel = new ContentPostTwitterModel(this.rawData);
    const youtubeModel = new ContentPostYoutubeModel(this.rawData);
    const googleMyBusinessModel = new ContentPostGoogleMyBusinessModel(this.rawData);
    const tumblrModel = new ContentPostTumblrModel(this.rawData);
    const mediumModel = new ContentPostMediumModel(this.rawData);
    const wordpressModel = new ContentPostWordpressModel(this.rawData);
    const drupalModel = new ContentPostDrupalModel(this.rawData);
    const joomlaModel = new ContentPostJoomlaModel(this.rawData);
    const mailchimpModel = new ContentPostMailchimpModel(this.rawData);

<<<<<<< Updated upstream
    {
      labelsConnectedChannels.includes("facebook") && (
        this.data.facebook = facebookModel.transformDataToContentCreation()
      )
    }
    {
      labelsConnectedChannels.includes("linkedin") && (
        this.data.linkedin = linkedinModel.transformDataToContentCreation()
      )
    }
    {
      labelsConnectedChannels.includes("instagram") && (
        this.data.instagram = instagramModel.transformDataToContentCreation()
      )
    }
    {
      labelsConnectedChannels.includes("twitter") && (
        this.data.twitter = twitterModel.transformDataToContentCreation()
      )
    }
    {
      labelsConnectedChannels.includes("youtube") && (
        this.data.youtube = youtubeModel.transformDataToContentCreation()
      )
    }
    {
      labelsConnectedChannels.includes("google_my_business") && (
        this.data.google_my_business = googleMyBusinessModel.transformDataToContentCreation()
      )
    }
    {
      labelsConnectedChannels.includes("tumblr") && (
        this.data.tumblr = tumblrModel.transformDataToContentCreation()
      )
    }
    {
      labelsConnectedChannels.includes("medium") && (
        this.data.medium = mediumModel.transformDataToContentCreation()
      )
    }
    {
      labelsConnectedChannels.includes("wordpress") && (
        this.data.wordpress = wordpressModel.transformDataToContentCreation()
      )
    }
    {
      labelsConnectedChannels.includes("drupal") && (
        this.data.drupal = drupalModel.transformDataToContentCreation()
      )
    }
    {
      labelsConnectedChannels.includes("joomla") && (
        this.data.joomla = joomlaModel.transformDataToContentCreation()
      )
    }
    {
      labelsConnectedChannels.includes("mailchimp") && (
        this.data.mailchimp = mailchimpModel.transformDataToContentCreation()
      )
    }
    
=======
    this.data.facebook = facebookModel.transformDataToContentCreation();
    this.data.linkendin = linkedinModel.transformDataToContentCreation();
    this.data.instagram = instagramModel.transformDataToContentCreation();
    this.data.twitter = twitterModel.transformDataToContentCreation();
    this.data.youtube = youtubeModel.transformDataToContentCreation();
    this.data.google_my_business = googleMyBusinessModel.transformDataToContentCreation();
    this.data.tumblr = tumblrModel.transformDataToContentCreation();
    this.data.medium = mediumModel.transformDataToContentCreation();
    this.data.wordpress = wordpressModel.transformDataToContentCreation();
    this.data.drupal = drupalModel.transformDataToContentCreation();
    this.data.joomla = joomlaModel.transformDataToContentCreation();
    this.data.mailchimp = mailchimpModel.transformDataToContentCreation();

>>>>>>> Stashed changes
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
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CHANNELS]: this.data,
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
  };
}
export default ContentPostTemplateModel;
