class BaseMasterDataItemModel {
  id = 0;
  name = "";

  constructor(entity) {
    if (entity) {
      this.id = entity.id ?? 0;
      this.name = entity.title ?? "";
    }
  }

  getId = () => {
    return this.id;
  };

  getName = () => {
    return this.name;
  };

  toDropdownSelectionItem = () => {
    return {
      value: this.id,
      label: this.name,
    };
  };
}

export default BaseMasterDataItemModel;
