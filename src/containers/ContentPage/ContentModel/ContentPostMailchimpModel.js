class ContentPostMailchimpModel {
  description = null;
  images = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData.mailchimp.description ?? rawData.description;
    this.images = rawData.mailchimp.images ?? rawData.images;
    this.publishedPlan = rawData.mailchimp.publishedPlan ?? rawData.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      publishedPlan: this.publishedPlan,
    };
  };
}

export default ContentPostMailchimpModel;
  