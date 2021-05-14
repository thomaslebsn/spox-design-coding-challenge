import SignUpFormViewModel from './SignUpFormViewModel';

class SignUpViewModel {
  signupFormViewModel = null;

  constructor(signupStore) {
    if (signupStore) {
      console.log('SignUpViewModel - Abstract');
      this.signupFormViewModel = new SignUpFormViewModel(signupStore);

      /*
      * Inject dependencies together among ViewModels
      * Empty
      * */
    }
  }

  getSignUpFormViewModel = () => this.signupFormViewModel;
}

export default SignUpViewModel;