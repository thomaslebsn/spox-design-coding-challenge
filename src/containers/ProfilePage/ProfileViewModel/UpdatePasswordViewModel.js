import history from '../../../routes/history';
import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import {logout} from '../../../auth';
import { notify } from '../../../components/Toast';

class UpdatePasswordViewModel {
  profileStore = null;
  formStatus = PAGE_STATUS.READY;
  updatePasswordViewModel = null;
  updateGeneralViewModel = null;

  successResponse = {
    state: true,
    content_id: ''
  };

  constructor(profileStore) {
    makeAutoObservable(this);
    this.profileStore = profileStore;
  }

  setUpdateGeneralViewModel = (updateGeneralViewModelInstance) => {
    this.updateGeneralViewModel = updateGeneralViewModelInstance;
  };

  setAllValue = (updatePasswordViewModel) => {
    this.updatePasswordViewModel = updatePasswordViewModel;
  };

  savePasswordInformationOnPage = () => {
    this.profileStore.updatePassword(
      this.updatePasswordViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
    );
  };

  callbackOnErrorHandler = (error) => {
    console.log('error')
    console.log(this.successResponse)
    console.log(error)
    this.successResponse.state = false;
    this.successResponse.content_id = error.result.content_id;
  };

  callbackOnSuccessHandler = () => {
    logout();
    notify('Change password successfully, please re-login with your new password.', 'success');
  };
}

export default UpdatePasswordViewModel;