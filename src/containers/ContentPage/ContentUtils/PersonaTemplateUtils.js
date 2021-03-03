import PersonaTemplateModel from "../ContentModel/PersonaTemplateModel";

class ContentUtils {
  transformPersonaTemplateResponseIntoModel = (response) => {
    return Object.keys(response)
      .map((index) => {
        return [...Array(response[index])].map((item) => {
          return new PersonaTemplateModel(item);
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  transformPersonaTemplateModelIntoTableDataRow = (personaModels) => {
    return personaModels
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
