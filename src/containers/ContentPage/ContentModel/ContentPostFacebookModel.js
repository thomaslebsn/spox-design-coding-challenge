class ContentPostFacebookModel {
  description = null;
  images = null;
  selectedPage = null;
  publishedPlan = null;
  rawData = null;

  constructor(rawData) {
    this.description = rawData.facebook.description ?? rawData.description;
    this.images = rawData.facebook.images ?? rawData.images;
    this.selectedPage = rawData.facebook.selectedPage ?? rawData.selectedPage;
    this.publishedPlan = rawData.facebook.publishedPlan ?? rawData.publishedPlan;
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

export default ContentPostFacebookModel;
