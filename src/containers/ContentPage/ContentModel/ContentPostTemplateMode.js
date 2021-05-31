import ContentPostFacebookModel from './ContentPostFacebookModel';

class ContentPostTemplateModel {
  rawData = null;
  data = null;
  constructor(rawData) {
    this.rawData = rawData;
    this.data = {
      facebook: null,
      linkendin: null
    };
  }


  transformDataToContentCreation = () => {
    const facebookModel = new ContentPostFacebookModel(this.rawData);
    this.data.facebook = facebookModel.transformDataToContentCreation();

    return this.data;
  }
​
}
​
export default ContentPostTemplateModel; 