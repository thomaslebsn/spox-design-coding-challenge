import FIELD_TYPE from '../../../constants/FieldType';
import {
  CONTENT_FIELD_KEY,
  ESI_CONTENT_API_RESPONSE_FIELD_KEY,
} from '../../../constants/ContentModule';

import getStatus from '../../../utils/status';
import { DescriptionsModel } from './DescriptionsModel';

import ChannelUtils from '../../ChannelsPage/ChannelUtils/ChannelUtils';
import CampaignsStore from '../../CampaignsPage/CampaignsStore/CampaignsStore';
import PersonaStore from '../../PersonasPage/PersonaStore/PersonaStore';

import ContentThemeStore from '../ContentStore/ContentThemeStore';


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

    return JSON.stringify(this.data);
  }
}
export default ContentPostTemplateModel; 