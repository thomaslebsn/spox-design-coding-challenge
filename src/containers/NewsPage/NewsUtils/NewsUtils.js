import NewsModel from "../NewsModel/NewsModel";
import { NewsLeadModel } from "../NewsModel/NewsLeadModel";

class NewsUtils {
  transformNewsResponseIntoModel = (response) => {
    return Object.keys(response)
      .map((index) => {
        return [...Array(response[index])].map((item) => {
          return new NewsModel(item);
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  transformNewsModelIntoTableDataRow = (projectModels) => {
    return projectModels
      .map((item) => {
        console.log("Debug An Item");
        console.log(item);
        return item.toTableRowData();
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  transformNewsLeadResponseIntoModel = (response) => {
    return new NewsLeadModel(response);
  };
}

const utils = new NewsUtils();

export default utils;
