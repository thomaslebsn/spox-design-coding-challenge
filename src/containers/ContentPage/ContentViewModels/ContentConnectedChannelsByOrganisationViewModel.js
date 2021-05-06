import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import PAGE_STATUS from '../../../constants/PageStatus';
import { PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR } from '../../../constants/PersonaModule';

class ContentConnectedChannelsByOrganisationViewModel {
  contentsStore = null;

  formStatus = PAGE_STATUS.LOADING;

  connectedChannels = null;

  show = false;

  multi = false;

  isAdvanceMode = false;

  newArrayConnectChannels = [];

  getDataValueSelected = [];

  getValueSelectedChannels = [];

  arrayConnectedChannelsFinal = [];

  dataContentDescriptionSingle = {
    data: '',
    media: [],
  };

  dataContentDescriptionSocial = {
    social: {
      facebook: {
        data: '',
        media: [],
      },
      instagram: {
        data: '',
        media: [],
      },
      linkedIn: {
        data: '',
        media: [],
      },
    },
    cms: {
      joomla: {
        data: '',
        media: [],
      },
      wordpress: {
        data: '',
        media: [],
      },
    },
    mail: {
      mailchimp: {
        data: '',
        media: [],
      },
    },
  };

  constructor(contentsStore) {
    makeAutoObservable(this);
    this.contentsStore = contentsStore;
  }

  setMulti = (multi) => {
    this.multi = multi;
  };

  openModal = (inputRef) => {
    this.show = true;
  };

  closeModal = () => {
    this.show = false;
  };

  resetObservableProperties() {
    this.connectedChannels = null;
  }

  renderChannelByOrganizationID = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    console.log('renderChannelByOrganizationID');
    this.contentsStore.getConnectedChannelsByOrganizationID(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  renderConnectedChannelByPersonaIds = (personaIds) => {
    console.log('personaIds idsidsids viewModel', personaIds);
    this.contentsStore.getConnectedChannelByPersonaIds(
      this.callbackOnSuccessHandlerPersonaIds,
      this.callbackOnErrorHander,
      personaIds
    );
  };

  getSelectedIDs = () => {
    if (!this.getDataValueSelected) return null;
    const convertedInArray = this.getDataValueSelected
      .map((item) => {
        return item[PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.VALUE];
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);

    let result = convertedInArray;

    return result;
  };

  getArrayConnectedChannelsFinal = () => {
    this.arrayConnectedChannelsFinal =
      this.getValueSelectedChannels.length > 0
        ? this.getValueSelectedChannels
        : this.connectedChannels;

    this.arrayConnectedChannelsFinal = Object.values(
      this.arrayConnectedChannelsFinal.reduce(
        (acc, cur) => Object.assign(acc, { [cur.des]: cur }),
        {}
      )
    );
  };

  handleDeleteConnectChannel = (index) => {
    let arrayConnectedChannelsFinal = this.arrayConnectedChannelsFinal;

    arrayConnectedChannelsFinal.splice(index, 1);

    this.arrayConnectedChannelsFinal = [...arrayConnectedChannelsFinal];
  };

  callbackOnErrorHander = (error) => {
    console.log('callbackOnErrorHander - content');
    console.log(error);
    this.formStatus = PAGE_STATUS.READY;
    notify(error.message);
  };

  callbackOnSuccessHandler = (contentConnectedChannelsModel) => {
    console.log('callbackOnSuccessHandler - contentConnectedChannelsModel ------');
    const resultInModel = contentConnectedChannelsModel ? contentConnectedChannelsModel : null;
    console.log('resultInModel - resultInModel ------');
    console.log(resultInModel);
    this.connectedChannels = resultInModel
      ? resultInModel.toListConnectedChannelsOnContentForm()
      : null;

    this.formStatus = PAGE_STATUS.READY;
    console.log('this.connectedChannels - this.connectedChannels ------');
    console.log(this.connectedChannels);

    this.getArrayConnectedChannelsFinal();
  };

  callbackOnSuccessHandlerPersonaIds = (contentConnectedChannelsModel) => {
    console.log('callbackOnSuccessHandler - contentConnectedChannelsModel ------');
    const resultInModel = contentConnectedChannelsModel ? contentConnectedChannelsModel : null;
    console.log('resultInModel - resultInModel ------');
    console.log(resultInModel);

    this.getValueSelectedChannels = resultInModel
      ? resultInModel.toListConnectedChannelsOnContentForm()
      : null;
    this.formStatus = PAGE_STATUS.READY;
    console.log('this.getValueSelectedChannels - this.getValueSelectedChannels ------');
    console.log(this.getValueSelectedChannels);

    this.getArrayConnectedChannelsFinal();
  };

  handleAdvanceMode = () => {
    this.isAdvanceMode = !this.isAdvanceMode;
  };
}

export default ContentConnectedChannelsByOrganisationViewModel;
