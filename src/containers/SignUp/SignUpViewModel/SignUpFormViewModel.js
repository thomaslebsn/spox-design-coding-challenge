import history from '../../../routes/history';
import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { SIGNUP_FIELD_KEY } from '../../../constants/SignUpModule';

class SignUpFormViewModel {
  signupStore = null;
  formStatus = PAGE_STATUS.READY;
  signupFormViewModel = null;
  successResponse = true;

  constructor(signupStore) {
    makeAutoObservable(this);
    this.signupStore = signupStore;
  }

  setAllValue = (signupFormComponent) => {
    this.signupFormComponent = signupFormComponent;
  };

  saveMemberOnPage = () => {
    console.log(this.signupFormComponent.formPropsData)
    this.signupStore.saveMember(
      this.signupFormComponent.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
    );
  };

  callbackOnErrorHandler = (error) => {
    console.log(error)
    notify('Wrong Data')
    this.successResponse = false;
  };

  callbackOnSuccessHandler = () => {
    //if (history.location.pathname === '/signup') {
    history.push('/verify');
    //}

  };
}

export default SignUpFormViewModel;