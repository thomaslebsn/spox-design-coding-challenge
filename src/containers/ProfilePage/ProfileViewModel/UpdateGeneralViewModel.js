import history from '../../../routes/history';
import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';

class UpdateGeneralViewModel {
  profileStore = null;
  formStatus = PAGE_STATUS.READY;
  updateGeneralViewModel = null;
  successResponse = {
    state: true,
    content_id: ''
  };

  constructor(profileStore) {
    makeAutoObservable(this);
    this.profileStore = profileStore;
  }

  setAllValue = (updateGeneralFormComponent) => {
    this.updateGeneralFormComponent = updateGeneralFormComponent;
  };

  saveGeneralInformationOnPage = () => {
    console.log(this.updateGeneralFormComponent.formPropsData)
    this.profileStore.updateGeneral(
      this.updateGeneralFormComponent.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
    );
  };

  callbackOnErrorHandler = (error) => {
    console.log('error')
    console.log(error)
    this.successResponse.state = false;
    this.successResponse.content_id = error.result.content_id;
  };

  callbackOnSuccessHandler = () => {
    // history.push('/verify');
  };
}

export default UpdateGeneralViewModel;