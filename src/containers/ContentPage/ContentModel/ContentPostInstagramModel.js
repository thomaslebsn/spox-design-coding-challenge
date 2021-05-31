class ContentPostInstagramModel {
  description = null;
  images = null;

  constructor(rawData) {
    this.description = rawData.instagram.description ?? rawData.description;
    this.images = rawData.instagram.images ?? rawData.images;
    this.publishedPlan = rawData.instagram.publishedPlan ?? rawData.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      publishedPlan: this.publishedPlan,
    };
  };
}

export default ContentPostInstagramModel;
  