import { makeAutoObservable } from "mobx";
import { notify } from "../../../components/Toast";

class PersonaFormViewModel {
  show = false;
  personaEditdata = null;
  editMode = false;
  personaListViewModel = null;

  personaStore = null;
  personaFormComponent = null;

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
    console.log("setEditPersona");
    console.log(data);
    this.editMode = true;
    this.personaEditdata = data;
  };

  getPersona = (id) => {
    this.editMode = true;
    this.personaStore.getPersona(
      id,
      this.setEditPersona,
      this.callbackOnErrorHander
    );
  };

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.editMode = false;
    this.show = false;
  };

  saveOnModal = () => {
    const isFormValid = this.personaFormComponent.isFormValid();

    if (isFormValid) {
      this.personaStore.savePersona(
        this.personaFormComponent.formPropsData,
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHander
      );

      this.closeModal();
    } else {
    }
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessHandler = () => {
    console.log("callbackOnSuccessHandler");
    this.closeModal();
    this.personaListViewModel.refreshTablePersonaList();
  };
}

export default PersonaFormViewModel;
