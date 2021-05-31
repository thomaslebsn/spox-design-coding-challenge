class ContentPostTumblrModel {
  description = null;
  images = null;

  constructor(rawData) {
    this.description = rawData.tumblr.description ?? rawData.description;
    this.images = rawData.tumblr.images ?? rawData.images;
    this.publishedPlan = rawData.tumblr.publishedPlan ?? rawData.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      publishedPlan: this.publishedPlan,
    };
  };
}

export default ContentPostTumblrModel;