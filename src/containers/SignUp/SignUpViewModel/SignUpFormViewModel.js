import history from '../../../routes/history';
import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';

class SignUpFormViewModel {
  signupStore = null;
  formStatus = PAGE_STATUS.READY;
  signupFormViewModel = null;

  constructor(signupStore) {
    makeAutoObservable(this);
    this.signupStore = signupStore;
  }

  setAllValue = (signupFormComponent) => {
    this.signupFormComponent = signupFormComponent;
  };

  saveMemberOnPage = () => {

    this.signupStore.saveMember(
      this.signupFormComponent.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
    );
  };

  callbackOnErrorHandler = (error) => {
    console.log('callbackOnErrorHandler');
    console.log(error);
  };

  callbackOnSuccessHandler = (projectId) => {
    console.log('callbackOnSuccessHandler');
    //if (history.location.pathname === '/signup') {
    history.push('/verify');
    //}

  };
}

export default SignUpFormViewModel;