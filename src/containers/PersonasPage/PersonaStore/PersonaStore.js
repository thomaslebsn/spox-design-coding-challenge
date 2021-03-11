import React from "react";
import { runInAction } from "mobx";

import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

import PersonaUtils from "../PersonaUtils/PersonaUtils";
import PersonaModel from "../PersonaModel/PersonaModel";
import { EasiiPersonaApiService, EasiiPersonaTemplateApiService } from "easii-io-web-service-library";
import { PersonaMasterDataModel } from "../../../store/Models/MasterDataModels/PersonaMasterDataModel";
import PersonaTemplateUtils from "../PersonaUtils/PersonaTemplateUtils";

export default class PersonaStore {
  globalStore = null;
  constructor(args = {}) {
    if (args) {
      this.globalStore = args.globalStore ? args.globalStore : null;
    }
  }

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
      // return;

      const convertedPersonaData = PersonaModel.convertSubmittedDataToAPIService(
        personaData
      );

      const personaService = new EasiiPersonaApiService();

      // const resultOnSave = await personaService.createPersona(
      //   convertedPersonaData
      // );

      let resultOnSave = null;

      console.log("personaData personaData", personaData);
      console.log(
        "convertedPersonaData convertedPersonaData",
        convertedPersonaData
      );

      const personaId = convertedPersonaData.id

      if (personaId === undefined || personaId === null || personaId === 0) {
        console.log("CREATE PERSONA");
        resultOnSave = await personaService.createPersona(convertedPersonaData);
      } else {
        console.log("UPDATE PERSONA", convertedPersonaData);
        //convertedProjectData.logo = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
        resultOnSave = await personaService.updatePersona(convertedPersonaData);
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

  async getPersonaMasterData(callbackOnSuccess, callbackOnError) {
    try {
      if (!this.globalStore) {
        runInAction(() => {
          callbackOnError({
            message: "Global Store is NULL",
          });
        });
      } else {
        console.log("Persona Store - Get Global Store");
        console.log(this.globalStore);
        await this.globalStore.getMasterData(
          {
            isForPersonaMasterData: true
          },
          (result) => {
            try {
              console.log('Persona - getMasterData');
              console.log(result);
              const resultPersonaInModel = new PersonaMasterDataModel(result && result.personaMasterData ? result.personaMasterData : null);
              console.log('resultInModel');
              console.log(resultPersonaInModel);
              console.log("persona - resultPersonaInModel");
              console.log(result);
              console.log("persona - resultToDropdownlistValues");
  
              runInAction(() => {
                callbackOnSuccess(resultPersonaInModel);
              });
            } catch(error) {
              runInAction(() => {
                callbackOnError({
                  message: "resultInModel - personaStore - getMasterData - Something went wrong from Server response",
                });
              });
            }
          },
          (error) => {
            runInAction(() => {
              callbackOnError({
                message: "personaStore - getMasterData - Something went wrong from Server response : " + error,
              });
            });
          }
        );
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getPersonaRecommendations(callbackOnSuccess, callbackOnError, paginationStep) {
    try {
      console.log("Content Store - getPersonaRecommendations");
      const personaTemplateAPIService = new EasiiPersonaTemplateApiService();

      const repondedDataFromLibrary = await personaTemplateAPIService.getPersonaTemplates(
        paginationStep,
        100
      );
      console.log(
        "repondedDataFromLibrary repondedDataFromLibrary",
        repondedDataFromLibrary
      );

      const personaTemplateDataModels = PersonaTemplateUtils.transformPersonaTemplateResponseIntoModel(
        repondedDataFromLibrary.list
      );
      console.log("personaTemplateDataModels");
      console.log(personaTemplateDataModels);

      if (personaTemplateDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: personaTemplateDataModels,
            pagination: repondedDataFromLibrary.pagination,
          });
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

  getPersonaRecommendationItem = async (id, callbackOnSuccess, callbackOnError) => {
    if (!id) return false;

    try {
      const personaTemplateService = new EasiiPersonaTemplateApiService();

      const repondedDataFromLibrary = await personaTemplateService.getPersonaTemplate(id);

      console.log("Persona Store - getPersonaRecommendationItem");
      console.log(repondedDataFromLibrary);
      if (repondedDataFromLibrary) {
        const personaDataModels = PersonaTemplateUtils.transformPersonaTemplateResponseIntoModel(
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

  async searchPersonas(
    callbackOnSuccess,
    callbackOnError,
    dataFilter = {},
    paginationStep = 1
  ) {
    try {
      console.log("Persona Store - searchPersonas");
      console.log(dataFilter);
      console.log(paginationStep);
      const personaAPIService = new EasiiPersonaApiService();
      const respondedDataFromLibrary = await personaAPIService.searchPersonas(
        dataFilter,
        paginationStep,
        25
      );

      console.log("Debugging ---- searchPersonas");
      console.log(respondedDataFromLibrary);
      let personaDataModels = null;

      if (respondedDataFromLibrary !== null) {
        personaDataModels = PersonaUtils.transformPersonaResponseIntoModel(
          respondedDataFromLibrary.list
        );
      }

      if (personaDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: personaDataModels,
            pagination: respondedDataFromLibrary.pagination,
          });
        });
      } else {
        callbackOnError({
          message: "No result",
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
