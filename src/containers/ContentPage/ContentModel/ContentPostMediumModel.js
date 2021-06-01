class ContentPostMediumModel {
  description = null;
  images = null;

  constructor(rawData) {
    this.description = rawData.medium.description ?? rawData.description;
    this.images = rawData.medium.images ?? rawData.images;
    this.publishedPlan = rawData.medium.publishedPlan ?? rawData.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      publishedPlan: this.publishedPlan,
    };
  };
}

export default ContentPostMediumModel;