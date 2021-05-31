class ContentPostLinkedinModel {
  description = null;
  images = null;
  selectedPage = null;
  publishedPlan = null;
  rawData = null;

  constructor(rawData) {
    this.description = rawData.linkedin.description ?? rawData.description;
    this.images = rawData.linkedin.images ?? rawData.images;
    this.selectedPage = rawData.linkedin.selectedPage ?? rawData.selectedPage;
    this.publishedPlan = rawData.linkedin.publishedPlan ?? rawData.publishedPlan;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      selectedPage: this.selectedPage,
      publishedPlan: this.publishedPlan,
    };
  };
}

export default ContentPostLinkedinModel;
  