import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../constants/PageStatus";
import { PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR } from "../../constants/PersonaModule";
import { notify } from "../../components/Toast";

class PersonaTableSelectionModalViewModel {
  show = false;

  multi = false;

  fragmentStore = null;

  personasMasterData = null;

  tableStatus = PAGE_STATUS.LOADING;

  personasSelectionData = [];

  channelSelectionData = [];

  inputRef = null;
  constructor(fragmentStore) {
    makeAutoObservable(this);
    this.fragmentStore = fragmentStore;
  }

  openModal = (inputRef) => {
    this.show = true;
    this.inputRef = inputRef;
  };

  closeModal = () => {
    this.show = false;
    this.inputRef = null;
  };

  setSelectionData = (data) => {
    if (!this.multi) {
      this.personasSelectionData = [];
    }
    if (data) {
      this.personasSelectionData.push(data);
    }
  };

  setMulti = (multi) => {
    this.multi = multi;
  };

  getSectionsValue = () => {
    return this.personasSelectionData
      .map((item) => {
        return {
          value: item[PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.ID],
          label: item[PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.NAME],
        };
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
  };

  getSelectionData = () => {
    return this.personasSelectionData;
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

  loadDataIntoUI = () => {
    console.log("loadDataIntoUI");
    this.tableStatus = PAGE_STATUS.LOADING;
    this.fragmentStore.getPersonaMasterData(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  resetObservableProperties() {
    this.multi = false;
    this.personasSelectionData = [];
    this.channelSelectionData = [];
    this.personasMasterData = null;
    this.tableStatus = PAGE_STATUS.LOADING;
  }

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessHandler = (personaModelData) => {
    console.log("callbackOnSuccessHandler - persona selection");
    console.log(personaModelData);
    if (personaModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      this.personasMasterData = personaModelData.toTableRowsData();
      console.log("toTableRowsData");
      console.log(this.personasMasterData);
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default PersonaTableSelectionModalViewModel;
