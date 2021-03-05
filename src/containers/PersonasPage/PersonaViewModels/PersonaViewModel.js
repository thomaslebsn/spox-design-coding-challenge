import PersonaFormViewModel from "./PersonaFormViewModel";
import PersonaListViewModel from "./PersonasListViewModel";
import PersonaSelectionViewModel from "./PersonasSelectionViewModel";
import PersonaTemplateViewModel from "./PersonaTemplateViewModel";

class PersonaViewModel {
  personaListViewModel = null;
  personaSelectionViewModel = null;
  personaFormViewModel = null;
  personaTemplateViewModel = null;

  constructor(personaStore) {
    if (personaStore) {
      console.log("PersonaViewModel - Abstract");
      this.personaFormViewModel = new PersonaFormViewModel(personaStore);
      this.personaListViewModel = new PersonaListViewModel(personaStore);
      this.personaSelectionViewModel = new PersonaSelectionViewModel(
        personaStore
      );
      this.personaTemplateViewModel = new PersonaTemplateViewModel(personaStore);

      // Inject dependencies together among ViewModels
      this.personaFormViewModel.setPersonaListViewModel(
        this.personaListViewModel
      );
    }
  }

  getPersonaListViewModel = () => this.personaListViewModel;

  getPersonaFormViewModel = () => this.personaFormViewModel;

  getPersonaSelectionViewModel = () => this.personaSelectionViewModel;

  getPersonaTemplateViewModel = () => this.personaTemplateViewModel;
}

export default PersonaViewModel;
