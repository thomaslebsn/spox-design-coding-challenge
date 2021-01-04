import { ChannelModel } from "../ChannelModel/ChannelModel";

class ChannelUtils {
  transformChannelResponseIntoModel = (response) => {
    return Object.keys(response)
      .map((index) => {
        return [...Array(response[index])].map((item) => {
          return new ChannelModel(item);
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  transformChannelModelIntoTableDataRow = (channelModels) => {
    return channelModels
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

const utils = new ChannelUtils();

export default utils;
