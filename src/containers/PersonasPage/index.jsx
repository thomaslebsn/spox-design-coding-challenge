import React, { lazy } from "react";

import { Route } from "react-router-dom";
import PersonaActionBar from "./PersonaForm/PersonaActionBar";
import PersonaStore from "./PersonaStore/PersonaStore";
import PersonaViewModel from "./PersonaViewModels/PersonaViewModel";
import { PersonaViewModelContextProvider } from "./PersonaViewModels/PersonaViewModelContextProvider";
import ComponentHeaderPage from "../../components/ComponentHeaderPage";
import { faSave } from "@fortawesome/free-regular-svg-icons/faSave";

const PersonaFormPage = lazy(() => import("./PersonaForm/PersonaFormPage"));
const PersonasList = lazy(() => import("./PersonasList/PersonasList"));

const personaStore = new PersonaStore();
const personaViewModel = new PersonaViewModel(personaStore);

function Personas({ match }) {
  console.log("Debugging Route Personas");
  console.log(personaViewModel);
  return (
    <PersonaViewModelContextProvider viewModel={personaViewModel}>
      <div className="p-3">
        <Route exact path="/personas">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="text-blue-0">List Personas</h2>
            <PersonaActionBar />
          </div>
          <PersonasList />
        </Route>

        <Route exact path={["/personas/create", "/personas/edit/:id"]}>
          <div className="py-4 px-3">
            <PersonaFormPage match={match} />
          </div>
        </Route>
      </div>
    </PersonaViewModelContextProvider>
  );
}

export default Personas;
