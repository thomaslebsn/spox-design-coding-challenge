import BaseMasterDataItemModel from "../Abstract/BaseMasterDataItemModel";
import BaseMasterDataModel from "../Abstract/BaseMasterDataModel";
class CampaignMasterDataItemModel extends BaseMasterDataItemModel {
  constructor(entity) {
    if (entity) {
      super(entity);
    }
  }
}

class CampaignMasterDataModel extends BaseMasterDataModel {
  constructor(entities) {
    if (entities) {
      console.log('CampaignMasterDataModel - debug');
      console.log(entities);
      super(entities);
      this.unTransformedItems = entities;
      this.items = entities.result.map((element) => {
        return new CampaignMasterDataItemModel(element);
      });
    }
  }
}
export { CampaignMasterDataModel, CampaignMasterDataItemModel };
