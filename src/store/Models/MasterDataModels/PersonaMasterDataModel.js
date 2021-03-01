import BaseMasterDataItemModel from "../Abstract/BaseMasterDataItemModel";
import BaseMasterDataModel from "../Abstract/BaseMasterDataModel";
class PersonaMasterDataItemModel extends BaseMasterDataItemModel {
  constructor(entity) {
    if (entity) {
      super(entity);
    }
  }
}

class PersonaMasterDataModel extends BaseMasterDataModel {
  constructor(entities) {
    if (entities) {
      super(entities);
      this.unTransformedItems = entities;
      this.items = entities.result.map((element) => {
        return new PersonaMasterDataItemModel(element);
      });
    }
  }
}
export { PersonaMasterDataModel, PersonaMasterDataItemModel };
