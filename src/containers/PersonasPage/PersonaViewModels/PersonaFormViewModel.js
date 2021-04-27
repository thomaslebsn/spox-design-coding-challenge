import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import history from '../../../routes/history';

import PAGE_STATUS from '../../../constants/PageStatus';
import { PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR } from '../../../constants/PersonaModule';

class PersonaFormViewModel {
  personaListViewModel = null;

  personaStore = null;

  personaFormComponent = null;

  formStatus = PAGE_STATUS.LOADING;

  previewPersonaData = null;

  connectedChannelMasterData = null;

  getDataValueSelectedPersona = [];

  getDataValueSelectedIds = [];

  constructor(personaStore) {
    makeAutoObservable(this);
    this.personaStore = personaStore;
  }

  setPersonaListViewModel = (personaListViewModelInstance) => {
    this.personaListViewModel = personaListViewModelInstance;
  };

  setForm = (personaFormComponent) => {
    this.personaFormComponent = personaFormComponent;
  };

  setEditPersona = (data) => {
    this.formStatus = PAGE_STATUS.READY;
    this.personaFormComponent.populatingFormDataHandler(data[0]);
  };

  getPersona = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.personaStore.getPersona(id, this.setEditPersona, this.callbackOnErrorHander);
  };

  getPersonaTemplate = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.personaStore.getPersonaRecommendationItem(
      id,
      this.setCreatePersonaByTemplate,
      this.callbackOnErrorHander
    );
  };

  setCreatePersonaByTemplate = (data) => {
    this.formStatus = PAGE_STATUS.READY;
    console.log('setCreatePersonaByTemplate');
    // Override data to recognize is to create new persona from persona template
    data[0].id = 0;
    this.personaFormComponent.populatingFormDataHandler(data[0]);
  };

  getPreviewPersona = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.personaStore.getPersona(
      id,
      (result) => {
        this.previewPersonaData = result[0];
      },
      this.callbackOnErrorHander
    );
  };

  savePersona = () => {
    //const isFormValid = this.personaFormComponent.isFormValid();

    const isFormValid = true;

    console.log('Persona Creation - isFormValid:');
    console.log(isFormValid);

    if (this.editMode) {
      const personaId = this.personaEditdata.getId();
      this.personaFormComponent.formPropsData.id = personaId.value;
    }

    if (isFormValid) {
      this.formStatus = PAGE_STATUS.LOADING;
      this.personaStore.savePersona(
        this.personaFormComponent.formPropsData,
        this.callbackOnSuccessHandler,
        this.callbackOnErrorHander
      );
    }
  };

  getConnectedChannelMasterData = () => {
    console.log('getConnectedChannelMasterData');
    this.personaStore.getConnectedChannelsMasterData(
      (dataInModel) => {
        console.log('getConnectedChannelMasterData - callbackOnSuccessHandler');
        this.connectedChannelMasterData = dataInModel ? dataInModel.toDropdownListValues() : null;

        console.log(this.connectedChannelMasterData);
      },
      (error) => {
        console.log('callbackOnErrorHander');
        console.log(error);
        notify(error.message);
      }
    );
  };

  callbackOnErrorHander = (error) => {
    console.log('callbackOnErrorHander');
    console.log(error);
    notify(error.message);
  };

  callbackOnSuccessHandler = () => {
    console.log('callbackOnSuccessHandler');
    this.formStatus = PAGE_STATUS.READY;
    history.push('/personas');
  };

  getSelectedLabels = (value) => {
    let labels = value && value.map((e) => e.label);

    this.getDataValueSelectedPersona = labels;
  };

  getSelectedIDs = () => {
    if (!this.getDataValueSelectedIds) return null;
    const convertedInArray = this.getDataValueSelectedIds
      .map((item) => {
        return item[PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.VALUE];
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);

    let result = convertedInArray;

    return result;
  };
}

export default PersonaFormViewModel;
