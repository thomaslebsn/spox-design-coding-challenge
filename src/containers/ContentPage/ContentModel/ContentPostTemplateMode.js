class ContentPostTemplateModel {
  rawData = null;
  constructor() {
    this.data = {
      facebook: {
        description: {},
        images: {},
        selectedPage:{
          page1: {
            pageID: 13123,
            pageInfo: "dasdasdas"    
          },
          page2: {
            pageID: 1312312321,
            pageInfo: "dasdasdasxcvxbb"    
          }    
        },
        publishPlan:{
          page1: {
            postNow: false,
            scheduled: {}
          },
          page2: {
            postNow: true,
            scheduled: false,     
          }   
        }
      }, 
      linkedIn: {
        description: {},
        images: {},
        selectedPage:{
          page1: {
            pageID: 13123,
            pageInfo: "dasdasdas"    
          },
          page2: {
            pageID: 1312312321,
            pageInfo: "dasdasdasxcvxbb"    
          }    
        },
        publishPlan:{
          page1: {
            postNow: false,
            scheduled: {
            }
          },
          page2: {
            postNow: true,
            scheduled: false,     
          }   
        }
      }, 
    };
  }

  formatData = () => {
    this.data = []; 
  }

  static __transformDataToContentCreation = (rawDataDescription, rawDataPublishingPlan) => {
    const contentPostTemplateModel = new ContentPostTemplateModel();
    contentPostTemplateModel.rawDataDescription = rawDataDescription;
    contentPostTemplateModel.rawDataPublishingPlan = rawDataPublishingPlan;

    contentPostTemplateModel.formatData();

    return contentPostTemplateModel.data;
  }
​
}
​
export default ContentPostTemplateModel; 