class ContentPostGoogleMyBusinessModel {
  description = null;
  images = null;
  publishedPlan = null;

  constructor(rawData) {
    this.description = rawData.google_my_business.description ?? rawData.description;
    this.images = rawData.google_my_business.images ?? rawData.images;
    this.publishedPlan = rawData.google_my_business.publishedPlan ?? rawData.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      publishedPlan: this.publishedPlan,
    };
  };
}

export default ContentPostGoogleMyBusinessModel;
    