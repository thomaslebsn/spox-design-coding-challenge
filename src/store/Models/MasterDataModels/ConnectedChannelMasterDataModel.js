import BaseMasterDataItemModel from "../Abstract/BaseMasterDataItemModel";
import BaseMasterDataModel from "../Abstract/BaseMasterDataModel";
class ConnectedChannelMasterDataItemModel extends BaseMasterDataItemModel {
  constructor(entity) {
    if (entity) {
      super(entity);
    }
  }
}

class ConnectedChannelMasterDataModel extends BaseMasterDataModel {
  constructor(entities) {
    if (entities) {
      super(entities);
      this.unTransformedItems = entities;
      this.items = entities.map((element) => {
        return new ConnectedChannelMasterDataItemModel(element);
      });
    }
  }
}
export { ConnectedChannelMasterDataModel, ConnectedChannelMasterDataItemModel };
