import history from '../../../routes/history';
import { makeAutoObservable } from 'mobx';

class ActivateMemberLoadingViewModel {
  activateMemberStore = null;
  activateMemberLoadingViewModel = null;

  constructor(activateMemberStore) {
    makeAutoObservable(this);
    this.activateMemberStore = activateMemberStore;
  }

  setValue = (activateMemberComponent) => {
    this.activateMemberComponent = activateMemberComponent;
  };

  activateMemberOnPage = () => {
    this.activateMemberStore.activateMember(
      {
        'activation_code': 'd2fe29ee331953408d13ba3add3384fa',
      },
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
    );
  };

  callbackOnErrorHandler = (error) => {
    console.log('error')
    console.log(error)
  };

  callbackOnSuccessHandler = () => {
    history.push('/login');
  };
}

export default ActivateMemberLoadingViewModel;