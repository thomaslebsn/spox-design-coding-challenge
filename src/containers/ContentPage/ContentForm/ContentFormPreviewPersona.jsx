import React, { lazy } from "react";
import PersonaStore from "../../PersonasPage/PersonaStore/PersonaStore";
import PersonaViewModel from "../../PersonasPage/PersonaViewModels/PersonaViewModel";
import { PersonaViewModelContextProvider } from "../../PersonasPage/PersonaViewModels/PersonaViewModelContextProvider";

const personaStore = new PersonaStore();
const personaViewModel = new PersonaViewModel(personaStore);

const FormPreviewPersona = lazy(() =>
  import("../../PersonasPage/FormPreviewPersona/FormPreviewPersona")
);

const ContentFormPreviewPersona = () => {
  return (
    <PersonaViewModelContextProvider viewModel={personaViewModel}>
      <FormPreviewPersona />
    </PersonaViewModelContextProvider>
  );
};

export { ContentFormPreviewPersona };
