import ContentModel from "../ContentModel/ContentModel";

class ContentUtils {
  transformContentResponseIntoModel = (response) => {
    return Object.keys(response)
      .map((index) => {
        return [...Array(response[index])].map((item) => {
          return new ContentModel(item);
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  transformContentModelIntoTableDataRow = (contentModels) => {
    return contentModels
      .map((item) => {
        console.log("Debug An Item");
        console.log(item);
        return item.toTableRowData();
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };
}

const utils = new ContentUtils();

export default utils;
