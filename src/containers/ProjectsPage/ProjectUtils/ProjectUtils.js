import ProjectModel from "../ProjectModel/ProjectModel";
import { ProjectLeadModel } from "../ProjectModel/ProjectLeadModel";

class ProjectUtils {
  transformProjectResponseIntoModel = (response) => {
    console.log(response);
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

  transformProjectModelIntoTableDataRow = (projectModels) => {
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

  transformProjectLeadResponseIntoModel = (response) => {
    return new ProjectLeadModel(response);
  };
}

const utils = new ProjectUtils();

export default utils;
