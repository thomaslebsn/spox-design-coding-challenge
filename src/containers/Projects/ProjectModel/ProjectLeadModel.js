import { FIELD_TYPE } from "../../../constants/FieldType";

class ProjectLeadModel {
  leads = null;

  constructor(data) {
    this.leads = data
      ? Object.keys(data)
          .map((index) => {
            return [...Array(data[index])].map((item) => {
              return new ProjectLeadItemModel(item);
            });
          })
          .reduce((arr, el) => {
            return arr.concat(el);
          }, [])
      : [];
  }

  toDropdownOptions = () => {
    return this.leads.map((item, index) => {
      return item.toDropdownOption();
    });
  };
}

class ProjectLeadItemModel {
  constructor(data) {
    this.id = data.id ?? null;
    this.name = data.name ?? "";
    this.avatarUrl = data.avatar_url ?? "";
  }

  toDropdownOption = () => {
    return { key: this.id, text: this.name, value: this.id };
  };
}

export { ProjectLeadModel, ProjectLeadItemModel };
