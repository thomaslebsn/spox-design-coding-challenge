import PersonaModel from "../PersonaModel/PersonaModel";

class PersonaUtils {
  transformPersonaResponseIntoModel = (response) => {
    return Object.keys(response)
      .map((index) => {
        return [...Array(response[index])].map((item) => {
          return new PersonaModel(item);
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  transformPersonaModelIntoTableDataRow = (personaModels) => {
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

const utils = new PersonaUtils();

export default utils;
