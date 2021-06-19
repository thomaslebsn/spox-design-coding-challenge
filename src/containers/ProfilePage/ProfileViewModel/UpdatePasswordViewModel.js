import history from '../../../routes/history';
import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';

class UpdatePasswordViewModel {
  profileStore = null;
  formStatus = PAGE_STATUS.READY;
  updatePasswordViewModel = null;
  successResponse = {
    state: true,
    content_id: ''
  };

  constructor(profileStore) {
    makeAutoObservable(this);
    this.profileStore = profileStore;
  }

  setAllValue = (updatePasswordViewModel) => {
    this.updatePasswordViewModel = updatePasswordViewModel;
  };

  savePasswordInformationOnPage = () => {
    console.log(this.updatePasswordViewModel.formPropsData)
    this.profileStore.updatePassword(
      this.updatePasswordViewModel.formPropsData,
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

export default UpdatePasswordViewModel;