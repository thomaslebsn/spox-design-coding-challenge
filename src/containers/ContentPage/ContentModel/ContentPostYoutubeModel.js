class ContentPostYoutubeModel {
  description = null;
  images = null;
  selectedPage = null;
  publishedPlan = null;
  video = null;

  constructor(rawData) {
    this.description = rawData.youtube.description ?? rawData.description;
    this.images = rawData.youtube.images ?? rawData.images;
    this.selectedPage = rawData.youtube.selectedPage ?? rawData.selectedPage;
    this.publishedPlan = rawData.youtube.publishedPlan ?? rawData.publishedPlan;
    this.video = rawData.youtube.video ?? rawData.video;
  }

  transformDataToContentCreation = () => {
    return {
      description: this.description,
      images: this.images,
      selectedPage: this.selectedPage,
      publishedPlan: this.publishedPlan,
      video: this.video
    };
  };
}

export default ContentPostYoutubeModel;
