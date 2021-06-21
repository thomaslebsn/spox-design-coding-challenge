import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { UPDATE_GENERAL_FIELD_KEY } from '../../../constants/ProfileModule';

class UpdateGeneralViewModel {
  profileStore = null;
  formStatus = PAGE_STATUS.READY;
  updateGeneralViewModel = null;
  memberInfo = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(profileStore) {
    makeAutoObservable(this);
    this.profileStore = profileStore;
  }

  setAllValue = (updateGeneralViewModel) => {
    this.updateGeneralViewModel = updateGeneralViewModel;
  };

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.profileStore.getMember(
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.ID],
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
    );
  };

  saveGeneralInformationOnPage = () => {
    this.profileStore.updateGeneral(
      this.updateGeneralViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
    );
  };

  callbackOnErrorHandler = (error) => {
    console.log('error');
    console.log(error);
    this.successResponse.state = false;
    this.successResponse.content_id = error.result.content_id;
  };

  callbackOnSuccessHandler = (result) => {
    if (result.id) { // get member info
      console.log('--------------------asdasdasdasdsasd------------------')
      console.log(result)
      this.memberInfo = result;
    }
    else {
      this.successResponse.state = false;
    }
  };
}

export default UpdateGeneralViewModel;