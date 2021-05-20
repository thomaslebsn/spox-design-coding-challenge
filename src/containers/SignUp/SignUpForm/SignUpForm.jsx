import React from 'react';
import './index.scss';
import { observer } from 'mobx-react';
import { SIGNUP_FIELD_KEY } from '../../../constants/SignUpModule';
import { withSignUpViewModel } from '../SignUpViewModel/SignUpViewModelContextProvider';
import ButtonNormal from '../../../components/ButtonNormal';
import { notify } from '../../../components/Toast';
import SimpleReactValidator from 'simple-react-validator';
import { login } from '../../../auth';

const SignUpForm = observer(
  class SignUpForm extends React.Component {
    signupFormViewModel = null;
    formPropsData = {
      [SIGNUP_FIELD_KEY.USERNAME]: '',
      [SIGNUP_FIELD_KEY.EMAIL]: '',
      [SIGNUP_FIELD_KEY.PASSWORD]: '',
    };

    constructor(props) {
      super(props);
      this.state = {
        selectedOption: null,
      };
      const { viewModel } = props;
      this.signupFormViewModel = viewModel
        ? viewModel.getSignUpFormViewModel()
        : null;
      this.validator = new SimpleReactValidator();
      this.signupFormViewModel.setAllValue(this);
      this.usernameInput = React.createRef();

    }

    saveMemberHandler = () => {
      this.signupFormViewModel.saveMemberOnPage();
    };

    onKeyPress = (e) => {
      if (e.which === 13) {
        this.handleSubmit();
      }
    };

    validateInfoBeforeSending = () => {
      if (this.validator.allValid()) {
        this.saveMemberHandler();
      } else {
        this.validator.showMessages();
        this.forceUpdate();
        return false;
      }
      /*if (this.validateEmailData() && this.formPropsData[SIGNUP_FIELD_KEY.USERNAME] && this.formPropsData[SIGNUP_FIELD_KEY.PASSWORD]) {
        this.saveMemberHandler();
      } else {
        if (!this.formPropsData[SIGNUP_FIELD_KEY.USERNAME])
          notify('The username is empty.', 'error');
        if (!this.formPropsData[SIGNUP_FIELD_KEY.PASSWORD])
          notify('The password is empty.', 'error');
        if (!this.validateEmailData())
          notify('The email is not correct.', 'error');
      }*/
    };

    validateEmailData = () => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(this.formPropsData[SIGNUP_FIELD_KEY.EMAIL]).toLowerCase());
    };

    render() {
      const t = this.props.t;
      return (
        <>
          <form>
            <label className='form-label' htmlFor='username'>
              {t('txt_username')} <span>*</span>
            </label>
            <input type='text'
                   className='form-control'
                   id='username'
                   onChange={event => this.formPropsData[SIGNUP_FIELD_KEY.USERNAME] = event.target.value}
                   required
                   ref={this.usernameInput} />
            {this.validator.message(
              "username",
              this.formPropsData[SIGNUP_FIELD_KEY.USERNAME],
              "required|min:6|max:30",
              { className: "text-danger" }
            )}
            <label className='form-label mt-3' htmlFor='email'>
              {t('txt_email')} <span>*</span>
            </label>
            <input type='email'
                   className='form-control '
                   onChange={event => {
                     this.formPropsData[SIGNUP_FIELD_KEY.EMAIL] = event.target.value;
                     console.log(this.formPropsData);
                   }}
                   required
                   id='email' />
            {this.validator.message(
              "email",
              this.formPropsData[SIGNUP_FIELD_KEY.EMAIL],
              "required|email",
              { className: "text-danger" }
            )}
            <label className='form-label mt-3' htmlFor='password'>
              {t('txt_password')} <span>*</span>
            </label>
            <input type='password'
                   className='form-control'
                   onChange={event => this.formPropsData[SIGNUP_FIELD_KEY.PASSWORD] = event.target.value}
                   id='password'
                   required
                   onKeyPress={this.onKeyPress}
            />
            {this.validator.message(
              "password",
              this.formPropsData[SIGNUP_FIELD_KEY.PASSWORD],
              "required|min:6|max:30",
              { className: "text-danger" }
            )}
            <ButtonNormal text='Sign up' onClick={this.validateInfoBeforeSending} className='btn btn-success mt-3'/>
            <div className='mt-3'>
              {t('txt_you_agree_to_our')}{' '}
              <a href='#'>{t('txt_terms_of_service')} </a> {t('txt_and')}{' '}
              <a href='#'>{t('txt_privacy_policy')}</a>.
            </div>
            <a href='/login' className='d-flex justify-content-center mt-4'>
              {t('txt_already_have_an_account')}
            </a>
          </form>
        </>
      );
    }
  },
);

export default withSignUpViewModel(SignUpForm);
