import PersonaFormViewModel from "./PersonaFormViewModel";
import PersonaListViewModel from "./PersonasListViewModel";

class PersonaViewModel {
  personaListViewModel = null;
  personaFormViewModel = null;

  constructor(personaStore) {
    if (personaStore) {
      console.log("PersonaViewModel - Abstract");
      this.personaFormViewModel = new PersonaFormViewModel(personaStore);
      this.personaListViewModel = new PersonaListViewModel(personaStore);

      // Inject dependencies together among ViewModels
      this.personaFormViewModel.setPersonaListViewModel(
        this.personaListViewModel
      );
    }
  }

  getPersonaListViewModel = () => this.personaListViewModel;

  getPersonaFormViewModel = () => this.personaFormViewModel;
}

export default PersonaViewModel;
