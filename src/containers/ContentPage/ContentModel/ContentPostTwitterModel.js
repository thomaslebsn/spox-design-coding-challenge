class ContentPostTwitterModel {
  description = null;
  images = null;
  publishedPlan = null;
  rawData = null;

  constructor(rawData) {
    this.description = rawData.twitter.description ?? rawData.description;
    this.images = rawData.twitter.images ?? rawData.images;
    this.publishedPlan = rawData.twitter.publishedPlan ?? rawData.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      publishedPlan: this.publishedPlan,
    };
  };
}

export default ContentPostTwitterModel;
    