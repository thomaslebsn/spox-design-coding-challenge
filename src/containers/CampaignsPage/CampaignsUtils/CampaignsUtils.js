import CampaignsModel from "../CampaignsModel/CampaignsModel";

class CampaignsUtils {
  transformCampaignsResponseIntoModel = (response) => {
    return Object.keys(response)
      .map((index) => {
        return [...Array(response[index])].map((item) => {
          return new CampaignsModel(item);
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  transformCampaignsModelIntoTableDataRow = (CampaignsModels) => {
    return CampaignsModels.map((item) => {
      console.log("Debug An Item");
      console.log(item);
      return item.toTableRowData();
    }).reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  };
}

const utils = new CampaignsUtils();

export default utils;
