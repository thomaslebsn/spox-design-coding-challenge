import React, { lazy } from "react";

import PersonaStore from "../../PersonasPage/PersonaStore/PersonaStore";
import PersonaViewModel from "../../PersonasPage/PersonaViewModels/PersonaViewModel";
import { PersonaViewModelContextProvider } from "../../PersonasPage/PersonaViewModels/PersonaViewModelContextProvider";

const personaStore = new PersonaStore();
const personaViewModel = new PersonaViewModel(personaStore);

const PersonasSelection = lazy(() =>
  import("../../PersonasPage/PersonasSelection/PersonasSelection")
);

const PersonalSelectionPage = () => {
  return (
    <PersonaViewModelContextProvider viewModel={personaViewModel}>
      <PersonasSelection />
    </PersonaViewModelContextProvider>
  );
};

const personaSelectionViewModal = personaViewModel.getPersonaSelectionViewModel();

export { PersonalSelectionPage, personaSelectionViewModal };
