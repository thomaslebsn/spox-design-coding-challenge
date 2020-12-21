import ProjectModel from "../ProjectModel/ProjectModel";
import { ProjectLeadModel } from "../ProjectModel/ProjectLeadModel";

class ProjectUtils {
  transformProjectResponseIntoModel = (response) => {
    return Object.keys(response)
      .map((index) => {
        return [...Array(response[index])].map((item) => {
          return new ProjectModel(item);
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  transformProjectModelIntoTableDataRow = (productModels, tableRowHeader) => {
    return productModels
      .map((item) => {
        return item.toTableRowData(tableRowHeader);
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  transformProjectLeadResponseIntoModel = (response) => {
    return new ProjectLeadModel(response);
  };
}

const utils = new ProjectUtils();

export default utils;
