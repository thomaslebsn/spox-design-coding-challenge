import React, { lazy } from "react";

import PersonaStore from "../../PersonasPage/PersonaStore/PersonaStore";
import PersonaViewModel from "../../PersonasPage/PersonaViewModels/PersonaViewModel";
import { PersonaViewModelContextProvider } from "../../PersonasPage/PersonaViewModels/PersonaViewModelContextProvider";
import GlobalStore from "../../../store/Store";

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}

const globalStore = window.globalStore;
const personaStore = new PersonaStore({
  globalStore: globalStore,
});

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
