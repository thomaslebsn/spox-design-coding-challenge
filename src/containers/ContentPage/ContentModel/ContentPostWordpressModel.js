class ContentPostWordpressModel {
  description = null;
  images = null;

  constructor(rawData) {
    this.description = rawData.wordpress.description ?? rawData.description;
    this.images = rawData.wordpress.images ?? rawData.images;
    this.publishedPlan = rawData.wordpress.publishedPlan ?? rawData.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      publishedPlan: this.publishedPlan,
    };
  };
}

export default ContentPostWordpressModel;