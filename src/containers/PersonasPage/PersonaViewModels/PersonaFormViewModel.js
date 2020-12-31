import { makeAutoObservable } from "mobx";

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
    alert(error);
  };

  callbackOnSuccessHandler = () => {
    console.log("callbackOnSuccessHandler");
    this.closeModal();
    this.personaListViewModel.refreshTablePersonaList();
  };
}

export default PersonaFormViewModel;