import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import PersonaUtils from "../PersonaUtils/PersonaUtils";
import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

import { notify } from "../../../components/Toast";

class PersonasSelectionViewModel {
  show = false;

  multi = false;

  personaStore = null;

  personas = null;

  tableStatus = PAGE_STATUS.LOADING;

  personaSelectionData = [];

  channelSelectionData = [];

  constructor(personaStore) {
    makeAutoObservable(this);
    this.personaStore = personaStore;
  }

  openModal = () => {
    console.log("openModal");
    this.show = true;
  };

  closeModal = () => {
    console.log("closeModal");
    this.show = false;
  };

  setSelectionData = (data) => {
    console.log("setSelectionData");
    console.log(data);

    if (!this.multi) {
      this.personaSelectionData = [];
    }

    this.personaSelectionData.push(data);
  };

  setMulti = (multi) => {
    this.multi = multi;
  };

  getSectionsValue = () => {
    return this.personaSelectionData
      .map((item) => {
        return {
          value: item[PERSONA_FIELD_KEY.ID],
          label: item[PERSONA_FIELD_KEY.NAME],
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
    return this.personaSelectionData;
  };

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.personaStore.getPersonaMasterData(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessHandler = (personaModelData) => {
    console.log("callbackOnSuccessHandler - persona");
    console.log(personaModelData);
    if (personaModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      this.personas = personaModelData.toDropdownFullListValues();

      console.log(this.personas);
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default PersonasSelectionViewModel;
