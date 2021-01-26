import { makeAutoObservable } from "mobx";
import { notify } from "../../../components/Toast";
import history from "../../../routes/history";

import PAGE_STATUS from "../../../constants/PageStatus";

class PersonaFormViewModel {
  personaListViewModel = null;

  personaStore = null;
  personaFormComponent = null;

  formStatus = PAGE_STATUS.LOADING;

  constructor(personaStore) {
    makeAutoObservable(this);
    this.personaStore = personaStore;
  }

  setPersonaListViewModel = (personaListViewModelInstance) => {
    this.personaListViewModel = personaListViewModelInstance;
  };

  setForm = (personaFormComponent) => {
    this.personaFormComponent = personaFormComponent;
  };

  setEditPersona = (data) => {
    this.formStatus = PAGE_STATUS.READY;
    this.personaFormComponent.populatingFormDataHandler(data[0]);
  };

  getPersona = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.personaStore.getPersona(
      id,
      this.setEditPersona,
      this.callbackOnErrorHander
    );
  };

  savePersona = () => {
    const isFormValid = this.personaFormComponent.isFormValid();

    if (isFormValid) {
      this.formStatus = PAGE_STATUS.LOADING;
      this.personaStore.savePersona(
        this.personaFormComponent.formPropsData,
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHander
      );
    }
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessHandler = () => {
    console.log("callbackOnSuccessHandler");
    this.formStatus = PAGE_STATUS.READY;
    history.push("/personas");
  };
}

export default PersonaFormViewModel;
