import React, { lazy } from "react";

import PersonaActionBar from "./PersonaForm/PersonaActionBar";
import PersonaStore from "./PersonaStore/PersonaStore";
import PersonaViewModel from "./PersonaViewModels/PersonaViewModel";
import { PersonaViewModelContextProvider } from "./PersonaViewModels/PersonaViewModelContextProvider";


const PersonaFormPage = lazy(() => import("./PersonaForm/PersonaFormPage"));
const PersonasList = lazy(() => import("./PersonasList/PersonasList"));

const personaStore = new PersonaStore();
const personaViewModel = new PersonaViewModel(personaStore);

function Personas({ match, location }) {
  let form = false;
  let id = 0;

  if (location.pathname === "/personas/create") {
    form = true;
  }

  if (typeof match.params.id !== "undefined") {
    form = true;
    id = match.params.id;
  }

  console.log("Debugging Route Personas");
  console.log(personaViewModel);
  return (
    <PersonaViewModelContextProvider viewModel={personaViewModel}>
      <div className="py-4 px-3">
        {form ? (
          <PersonaFormPage id={id} />
        ) : (
          <>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="text-blue-0">List Personas</h2>
              <PersonaActionBar />
            </div>
            <PersonasList />
          </>
        )}
      </div>
    </PersonaViewModelContextProvider>
  );
}

export default Personas;
