import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import PersonaUtils from "../PersonaUtils/PersonaUtils";
import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

import { notify } from "../../../components/Toast";

class PersonasListViewModel {
  personaStore = null;

  personas = null;

  pagination = null;

  tableRowHeader = null;

  tableStatus = PAGE_STATUS.LOADING;

  personaIdsSelected = null;

  constructor(personaStore) {
    makeAutoObservable(this);
    this.personaStore = personaStore;
  }

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.personaStore.fetchPersonas(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  refreshTablePersonaList = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.personaStore.fetchPersonas(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  deletePersonas = () => {
    this.tableStatus = PAGE_STATUS.LOADING;

    this.personaStore.deletePersonas(
      this.personaIdsSelected,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  getPagination = (paginationStep) => {
    console.log("paginationStep", paginationStep);
    this.tableStatus = PAGE_STATUS.LOADING;
    this.personaStore.fetchPersonas(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      paginationStep
    );
  };

  callbackOnErrorHander = (error) => {
    console.log("callbackOnErrorHander");
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessHandler = (personaModelData) => {
    console.log("callbackOnSuccessHandler");
    console.log(personaModelData);
    if (personaModelData) {
      this.tableStatus = PAGE_STATUS.READY;
      this.tableRowHeader = [
        {
          Header: "Name",
          accessor: PERSONA_FIELD_KEY.NAME, // accessor is the "key" in the data
        },

        {
          Header: "Created Date",
          accessor: PERSONA_FIELD_KEY.CREATED_DATE,
        },
        {
          Header: "Updated Date",
          accessor: PERSONA_FIELD_KEY.UPDATED_DATE,
        },
      ];

      console.log("Row Data is tableRowHeader");
      console.log(this.tableRowHeader);

      const rowDataTransformed = PersonaUtils.transformPersonaModelIntoTableDataRow(
        personaModelData.list
      );

      console.log("Row Data is Formatted");
      console.log(rowDataTransformed);

      this.personas = rowDataTransformed;
      this.pagination = personaModelData.pagination;

      console.log("this.pagination this.pagination", this.pagination);
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default PersonasListViewModel;
