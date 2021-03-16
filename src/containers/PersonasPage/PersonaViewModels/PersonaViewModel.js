import PersonaFormViewModel from "./PersonaFormViewModel";
import PersonaListViewModel from "./PersonasListViewModel";
import PersonaTemplateViewModel from "./PersonaTemplateViewModel";

class PersonaViewModel {
  personaListViewModel = null;
  personaFormViewModel = null;
  personaTemplateViewModel = null;

  constructor(personaStore) {
    if (personaStore) {
      console.log("PersonaViewModel - Abstract");
      this.personaFormViewModel = new PersonaFormViewModel(personaStore);
      this.personaListViewModel = new PersonaListViewModel(personaStore);
      
      this.personaTemplateViewModel = new PersonaTemplateViewModel(personaStore);

      // Inject dependencies together among ViewModels
      this.personaFormViewModel.setPersonaListViewModel(
        this.personaListViewModel
      );
    }
  }

  getPersonaListViewModel = () => this.personaListViewModel;

  getPersonaFormViewModel = () => this.personaFormViewModel;

  getPersonaTemplateViewModel = () => this.personaTemplateViewModel;
}

export default PersonaViewModel;
