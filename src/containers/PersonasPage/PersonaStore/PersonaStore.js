import React from "react";
import { runInAction } from "mobx";

import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

import PersonaUtils from "../PersonaUtils/PersonaUtils";
import PersonaModel from "../PersonaModel/PersonaModel";

let personas = [
  {
    id: 1,
    name: "Hieu - simple",
    created_date: "2020-10-13",
    updated_date: "2020-10-13",
    image: "/assets/images/annotation.png",
    channels: [
      {
        id: 1,
        name: "facebook 1",
        image: "/assets/images/icon-pepsi.png",
        icon: "/assets/images/facebook.png",
        checked: true,
      },
      {
        id: 2,
        name: "instagram 1",
        image: "/assets/images/icon-pepsi.png",
        icon: "/assets/images/instagram.png",
        checked: true,
      },
    ],
  },
  {
    id: 2,
    name: "Hieu - simple 2",
    created_date: "2020-10-13",
    updated_date: "2020-10-13",
    image: "/assets/images/annotation.png",
    channels: [
      {
        id: 1,
        name: "facebook 1",
        image: "/assets/images/icon-pepsi.png",
        icon: "/assets/images/facebook.png",
        checked: true,
      },
      {
        id: 2,
        name: "instagram 1",
        image: "/assets/images/icon-pepsi.png",
        icon: "/assets/images/instagram.png",
        checked: true,
      },
    ],
  },
];

export default class PersonaStore {
  async fetchPersonas(callbackOnSuccess, callbackOnError) {
    try {
      console.log("Persona Store - Fetch Personas");
      const repondedDataFromLibrary = personas;
      const personaDataModels = PersonaUtils.transformPersonaResponseIntoModel(
        repondedDataFromLibrary
      );

      if (personaDataModels) {
        runInAction(() => {
          callbackOnSuccess(personaDataModels);
        });
      } else {
        callbackOnError({
          message: "Something went wrong from Server response",
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async savePersona(personaData, callbackOnSuccess, callbackOnError) {
    try {
      console.log("Saving Persona via call web service lib function");
      console.log(personaData);

      const convertedPersonaData = PersonaModel.convertSubmittedDataToAPIService(
        personaData
      );

      const resultOnSave = await personas.push(convertedPersonaData);

      if (resultOnSave) {
        runInAction(() => {
          callbackOnSuccess();
        });
      } else {
        runInAction(() => {
          callbackOnError({
            message: "Something went wrong from Server response",
          });
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async deletePersonas(ids, callbackOnSuccess, callbackOnError) {
    if (!ids) return false;

    try {
      const results = true;

      personas = personas.filter(function (e) {
        return ids.indexOf(e.id) === -1;
      });

      if (results) {
        const repondedDataFromLibrary = personas;
        const personaDataModels = PersonaUtils.transformPersonaResponseIntoModel(
          repondedDataFromLibrary
        );

        if (personaDataModels) {
          runInAction(() => {
            callbackOnSuccess(personaDataModels);
          });
        } else {
          callbackOnError({
            message: "Something went wrong from Server response",
          });
        }

        console.log(`Deleting Persona ids: ${ids}`);
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getPersona(id, callbackOnSuccess, callbackOnError) {
    if (!id) return false;

    try {
      const results = true;

      const editPersona = personas.filter(
        (persona) => persona.id !== parseInt(id)
      );

      if (results) {
        const repondedDataFromLibrary = editPersona;
        const personaDataModels = PersonaUtils.transformPersonaResponseIntoModel(
          repondedDataFromLibrary
        );

        if (personaDataModels) {
          runInAction(() => {
            callbackOnSuccess(personaDataModels);
          });
        } else {
          callbackOnError({
            message: "Something went wrong from Server response",
          });
        }
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
