import React from 'react';
import { observer } from 'mobx-react';
import { SIGNUP_FIELD_KEY } from '../../../constants/SignUpModule';
import { withSignUpViewModel } from '../SignUpViewModel/SignUpViewModelContextProvider';
import ButtonNormal from '../../../components/ButtonNormal';
import SimpleReactValidator from 'simple-react-validator';
import { notify } from '../../../components/Toast';

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
        loading: false,
      };
      this.validator = new SimpleReactValidator();
      const { viewModel } = props;
      this.signupFormViewModel = viewModel
        ? viewModel.getSignUpFormViewModel()
        : null;
      this.signupFormViewModel.setAllValue(this);
      this.usernameInput = React.createRef();
      this.emailInput = React.createRef();
      this.handleInputChange = this.handleInputChange.bind(this);
      this.validateInfoBeforeSending = this.validateInfoBeforeSending.bind(this);
    }

    resetValue(content_id) {
      if(content_id === 'existed_email'){
        notify('Email existed. Choose another email', 'error')
        this.emailInput.current.value = ''
        this.setState({loading: false})
      }
      else if(content_id === 'duplicated_username'){
        notify('Username existed. Choose another username', 'error')
        this.usernameInput.current.value = ''
        this.setState({loading: false})
      }
      this.signupFormViewModel.successResponse.state = true;
    }

    handleInputChange(type, value) {
      this.formPropsData[type] = value;
      this.forceUpdate()
    }

    saveMemberHandler = () => {
      this.signupFormViewModel.saveMemberOnPage();
    };

    onKeyPress = (e) => {
      if (e.which === 13) {
        this.handleSubmit();
      }
    };

    blurringFieldHandler = () => {
      this.validator.hideMessageFor('username');
    };

    validateInfoBeforeSending = () => {
      if (this.validator.allValid()) {
        this.setState({ loading: true });
        this.saveMemberHandler();
      } else {
        this.validator.showMessages();
        this.forceUpdate();
        return false;
      }
    };

    componentDidMount() {
      this.usernameInput.current.focus();
    }

    render() {
      const t = this.props.t;
      let successResponse = this.signupFormViewModel ? this.signupFormViewModel.successResponse : null;
      if(!successResponse.state) this.resetValue(successResponse.content_id);
      this.validator.purgeFields();
      return (
        <>
          <form>
            <label className='form-label' htmlFor='username'>
              {t('txt_username')} <span>*</span>
            </label>
            <input type='text'
                   className='form-control'
                   id='username'
                   disabled={this.state.loading}
                   name='username'
                   onBlur={this.blurringFieldHandler}
                   onChange={event => this.handleInputChange('username', event.target.value)}
                   ref={this.usernameInput} />
            {this.validator.message(
              'username',
              this.formPropsData[SIGNUP_FIELD_KEY.USERNAME],
              'required|min:6|max:30',
              { className: 'text-danger' },
            )}
            <label className='form-label mt-3' htmlFor='email'>
              {t('txt_email')} <span>*</span>
            </label>
            <input type='email'
                   className='form-control'
                   onBlur={this.blurringFieldHandler}
                   disabled={this.state.loading}
                   name='email'
                   ref={this.emailInput}
                   onChange={event => this.handleInputChange('email', event.target.value)}
                   id='email' />
            {this.validator.message(
              'email',
              this.formPropsData[SIGNUP_FIELD_KEY.EMAIL],
              'required|email',
              { className: 'text-danger' },
            )}
            <label className='form-label mt-3' htmlFor='password'>
              {t('txt_password')} <span>*</span>
            </label>
            <input type='password'
                   className='form-control'
                   onBlur={this.blurringFieldHandler}
                   disabled={this.state.loading}
                   onChange={event => this.handleInputChange('password', event.target.value)}
                   id='password'
                   name='password'
                   onKeyPress={this.onKeyPress}
            />
            {this.validator.message(
              'password',
              this.formPropsData[SIGNUP_FIELD_KEY.PASSWORD],
              'required|min:6|max:30',
              { className: 'text-danger' },
            )}
            {this.state.loading && successResponse.state ?
              <button className='btn btn-success mt-3' disabled={this.state.loading}>
                <div className='spinner-border text-secondary' role='status'>
                  <span className='sr-only'>Loading...</span>
                </div>
              </button>
              :
              <ButtonNormal text='Sign up' onClick={this.validateInfoBeforeSending} className='btn btn-success mt-3' />}
            <div className='mt-3'>
              {t('txt_you_agree_to_our')}{' '}
              <a href='#'>{t('txt_terms_of_service')} </a> {t('txt_and')}{' '}
              <a href='#'>{t('txt_privacy_policy')}</a>.
            </div>
            <a href='/login' className='d-flex justify-content-center mt-1 mb-4'>
              {t('txt_already_have_an_account')}
            </a>
          </form>
        </>
      );
    }
  },
);

export default withSignUpViewModel(SignUpForm);
