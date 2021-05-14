import React from 'react';
import './index.scss';
import { observer } from 'mobx-react';
import { SIGNUP_FIELD_KEY } from '../../../constants/SignUpModule';
import ButtonNormal from '../../../components/ButtonNormal';
import { withSignUpViewModel } from '../SignUpViewModel/SignUpViewModelContextProvider';

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

    render() {
      const t = this.props.t;
      return (
        <>
          <form>
            <label className='form-label mb-3' htmlFor='username'>
              {t('txt_username')} <span>*</span>
            </label>
            <input type='text'
                   className='form-control mb-4'
                   id='username'
                   onChange={event => this.formPropsData[SIGNUP_FIELD_KEY.USERNAME] = event.target.value}
                   ref={this.usernameInput} />

            <label className='form-label mb-3' htmlFor='email'>
              {t('txt_email')} <span>*</span>
            </label>
            <input type='email'
                   className='form-control mb-4'
                   onChange={event => this.formPropsData[SIGNUP_FIELD_KEY.EMAIL] = event.target.value}
                   id='email' />

            <label className='form-label mb-3' htmlFor='password'>
              {t('txt_password')} <span>*</span>
            </label>
            <input type='password'
                   className='form-control mb-4'
                   onChange={event => this.formPropsData[SIGNUP_FIELD_KEY.PASSWORD] = event.target.value}
                   id='password'
                   onKeyPress={this.onKeyPress}
            />
            <ButtonNormal text='Sign up' onClick={this.saveMemberHandler} />
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
