import { makeAutoObservable } from "mobx";
import { notify } from "../../../components/Toast";
import PAGE_STATUS from "../../../constants/PageStatus";
import { PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR } from "../../../constants/PersonaModule";

class ContentConnectedChannelsByOrganisationViewModel {
  contentsStore = null;

  formStatus = PAGE_STATUS.LOADING;

  connectedChannels = null;

  show = false;

  newArrayConnectChannels = [];

  getValueSelected = [];

  constructor(contentsStore) {
    makeAutoObservable(this);
    this.contentsStore = contentsStore;
  }

  openModal = (inputRef) => {
    this.show = true;
  };

  closeModal = () => {
    this.show = false;
  };

  resetObservableProperties() {
    this.connectedChannels = null;
  }

  renderChannelByOrganizationID = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    console.log("renderChannelByOrganizationID");
    this.contentsStore.getConnectedChannelsByOrganizationID(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  renderConnectedChannelByPersonaIds = (personaIds) => {
    console.log("personaIds idsidsids", personaIds);
    this.contentsStore.getConnectedChannelByPersonaIds(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      personaIds
    );
  };

  getSelectedIDs = () => {
    if (!this.personasSelectionData) return null;
    const convertedInArray = this.personasSelectionData
      .map((item) => {
        console.log("itemitemitemitemitem", item);
        return item[PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.ID];
      })
      .reduce((arr, el) => {
        const i = arr.findIndex((e) => e.value === el.value);

        if (i === -1) {
          arr.push(el);
        } else {
          arr[i] = el;
        }
        return arr;
      }, []);
    let result = convertedInArray;
    if (!this.multi) {
      result = convertedInArray.length > 0 ? convertedInArray[0] : null;
    }
    return result;
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander - content");
    console.log(error);
    this.formStatus = PAGE_STATUS.READY;
    notify(error.message);
  };

  callbackOnSuccessHandler = (contentConnectedChannelsModel) => {
    console.log(
      "callbackOnSuccessHandler - contentConnectedChannelsModel ------"
    );
    const resultInModel = contentConnectedChannelsModel
      ? contentConnectedChannelsModel
      : null;
    console.log("resultInModel - resultInModel ------");
    console.log(resultInModel);
    this.connectedChannels = resultInModel
      ? resultInModel.toListConnectedChannelsOnContentForm()
      : null;
    this.formStatus = PAGE_STATUS.READY;
    console.log("this.connectedChannels - this.connectedChannels ------");
    console.log(this.connectedChannels);
  };
}

export default ContentConnectedChannelsByOrganisationViewModel;
