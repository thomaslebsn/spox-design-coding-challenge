class ContentPostJoomlaModel {
  description = null;
  images = null;

  constructor(rawData) {
    this.description = rawData.joomla.description ?? rawData.description;
    this.images = rawData.joomla.images ?? rawData.images;
    this.publishedPlan = rawData.joomla.publishedPlan ?? rawData.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      publishedPlan: this.publishedPlan,
    };
  };
}

export default ContentPostJoomlaModel;