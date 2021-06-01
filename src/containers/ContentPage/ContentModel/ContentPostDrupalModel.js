class ContentPostDrupalModel {
  description = null;
  images = null;

  constructor(rawData) {
    this.description = rawData.drupal.description ?? rawData.description;
    this.images = rawData.drupal.images ?? rawData.images;
    this.publishedPlan = rawData.drupal.publishedPlan ?? rawData.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      publishedPlan: this.publishedPlan,
    };
  };
}

export default ContentPostDrupalModel;