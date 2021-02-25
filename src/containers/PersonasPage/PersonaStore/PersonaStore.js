import React from "react";
import { runInAction } from "mobx";

import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

import PersonaUtils from "../PersonaUtils/PersonaUtils";
import PersonaModel from "../PersonaModel/PersonaModel";
import { EasiiPersonaApiService } from "easii-io-web-service-library";

export default class PersonaStore {
  async fetchPersonas(callbackOnSuccess, callbackOnError, paginationStep) {
    try {
      console.log("Persona Store - Fetch Personas");
      const PersonaService = new EasiiPersonaApiService();

      const repondedDataFromLibrary = await PersonaService.getPersonas(
        paginationStep,
        25
      );
      console.log("repondedDataFromLibrary repondedDataFromLibrary");
      console.log(repondedDataFromLibrary);

      if (repondedDataFromLibrary) {
        const personaDataModels = PersonaUtils.transformPersonaResponseIntoModel(
          repondedDataFromLibrary.list
        );

        console.log("personaDataModels personaDataModels");
        console.log(personaDataModels);

        if (personaDataModels) {
          runInAction(() => {
            callbackOnSuccess({
              list: personaDataModels,
              pagination: repondedDataFromLibrary.pagination,
            });
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

  async savePersona(personaData, callbackOnSuccess, callbackOnError) {
    try {
      console.log("Saving Persona via call web service lib function");
      console.log(personaData);

      const convertedPersonaData = PersonaModel.convertSubmittedDataToAPIService(
        personaData
      );

      const personaService = new EasiiPersonaApiService();

      // const resultOnSave = await personaService.createPersona(
      //   convertedPersonaData
      // );

      let resultOnSave;

      if (personaData.id == undefined) {
        console.log("CREATE PERSONA");
        resultOnSave = await personaService.createPersona(convertedPersonaData);
      } else {
        console.log("UPDATE PERSONA", convertedPersonaData);
        //convertedProjectData.logo = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
        resultOnSave = await personaData.updatePersona(convertedPersonaData);
      }

      console.log("resultOnSave", resultOnSave);

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

    console.log("DELETE PERSONA IDS");
    console.log(ids);

    try {
      const personaService = new EasiiPersonaApiService();
      const deleteIds = ids.join();
      const respondedFromApi = await personaService.deletePersona(deleteIds);

      if (respondedFromApi.result === true) {
        runInAction(() => {
          callbackOnSuccess();
        });
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
      const personaService = new EasiiPersonaApiService();

      const repondedDataFromLibrary = await personaService.getPersona(id);

      console.log("Persona Store - getPersona");
      console.log(repondedDataFromLibrary);

      if (repondedDataFromLibrary) {
        const personaDataModels = PersonaUtils.transformPersonaResponseIntoModel(
          [repondedDataFromLibrary]
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
