import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons/faCloudUploadAlt';
import { faUserCog } from '@fortawesome/free-solid-svg-icons/faUserCog';
import SimpleReactValidator from 'simple-react-validator';
import { UPDATE_GENERAL_FIELD_KEY } from '../../../constants/ProfileModule';
import { witheProfileViewModel } from '../ProfileViewModel/ProfileViewModelContextProvider';
import { notify } from '../../../components/Toast';
import Spinner from '../../../components/Spinner';
import 'react-datepicker/dist/react-datepicker.css';
import CustomizedDatePicker from '../../../components/DatePicker';

const UpdateGeneral = observer(
  class UpdateGeneral extends Component {
    updateGeneralViewModel = null;
    formPropsData = {
      [UPDATE_GENERAL_FIELD_KEY.ID]: localStorage.getItem('member_id'),
      [UPDATE_GENERAL_FIELD_KEY.USERNAME]: '',
      [UPDATE_GENERAL_FIELD_KEY.FULLNAME]: '',
      [UPDATE_GENERAL_FIELD_KEY.EMAIL]: '',
      [UPDATE_GENERAL_FIELD_KEY.BIRTHDAY]: '',
      [UPDATE_GENERAL_FIELD_KEY.PHONE]: '',
      [UPDATE_GENERAL_FIELD_KEY.ADDRESS]: '',
      [UPDATE_GENERAL_FIELD_KEY.ADDRESS_2]: '',
      [UPDATE_GENERAL_FIELD_KEY.ZIPCODE]: '',
      [UPDATE_GENERAL_FIELD_KEY.CITY]: '',
      [UPDATE_GENERAL_FIELD_KEY.STATE]: '',
      [UPDATE_GENERAL_FIELD_KEY.COUNTRY]: '',
    };

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
      };
      this.validator = new SimpleReactValidator();
      const { viewModel } = props;
      this.updateGeneralViewModel = viewModel
        ? viewModel.getUpdateGeneralViewModel()
        : null;
      this.updateGeneralViewModel.setAllValue(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.validateInfoBeforeSending = this.validateInfoBeforeSending.bind(this);
    }

    componentDidMount() {
      this.updateGeneralViewModel.initializeData();
    }

    resetValue(content_id) {
      if (content_id === 'wrong_current_password') {
        notify('The current password is wrong', 'error');

        this.currentPassword.current.value = '';

        this.setState({ loading: false });
      }
      this.updateGeneralViewModel.successResponse.state = true;
    }

    handleInputChange(type, value) {
      if (type === 'birthday') {
        this.formPropsData[type] = value.getFullYear() + '-' + (parseInt(value.getMonth()) + 1) + '-' + value.getDate() + ' 00:00:00';
        console.log(this.formPropsData);
      } else {
        this.formPropsData[type] = value;
        console.log(this.formPropsData);
      }
      this.forceUpdate();
    }

    saveGeneralHandler = () => {
      this.updateGeneralViewModel.saveGeneralInformationOnPage();
    };

    onKeyPress = (e) => {
      if (e.which === 13) {
        this.validateInfoBeforeSending();
      }
    };

    blurringFieldHandler = () => {
      this.validator.hideMessageFor('password');
    };

    validateInfoBeforeSending = () => {
      if (this.validator.allValid()) {
        this.setState({ loading: true });
        this.saveGeneralHandler();
      } else {
        this.validator.showMessages();
        this.forceUpdate();
        return false;
      }
    };

    render() {
      const { memberInfo } = this.updateGeneralViewModel;
      return (
        <>
          {
            !memberInfo ? (
                <Spinner />
              ) :
              <form>
                <div className='bg-white p-3'>
                  <div className='row'>
                    <div className='col-6'>
                      <label className='form-label mb-3' htmlFor='name'>
                        <span className='text-black opacity-75'>Avatar</span>
                      </label>
                      <div className='border-da-1 mb-3'>
                        <Dropzone onDrop={this.onDrop}>
                          {({ getRootProps, getInputProps }) => (
                            <div className='position-relative  cursor-pointer'>
                              <div
                                {...getRootProps()}
                                className='d-flex align-items-center justify-content-center p-3 pb-4'
                              >
                                <div className='d-flex align-items-center p-4'>
                                  <i className='fs-1 text-blue-0 opacity-25'>
                                    <FontAwesomeIcon icon={faCloudUploadAlt} />
                                  </i>
                                  <div className='text-center ms-1'>
                                    <p className='mb-0 fs-6'>
                                      Currently, disabled to integrate DAM Button
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                      </div>
                    </div>
                    <div className='col-6'>
                      <div>
                        <label className='form-label mb-3' htmlFor='status'>
                          <span className='text-black opacity-75'>Username</span>
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          id='username'
                          name='username'
                          value={memberInfo.username}
                          disabled
                        />
                      </div>
                      <div>
                        <label className='form-label mt-3 mb-2' htmlFor='status'>
                          <span className='text-black opacity-75'>Status</span>
                        </label>
                        <input
                          type='text'
                          className='form-control mb-3 '
                          style={{ color: 'green' }}
                          id='status'
                          name='status'
                          value='Active'
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className='d-flex align-items-center row'>
                    <div className='col-6'>
                      <label className='form-label mb-3' htmlFor='fullname'>
                        <span className='text-black opacity-75'>Full name</span>
                      </label>
                      <input
                        type='text'
                        className='form-control mb-3'
                        id='fullname'
                        name='fullname'
                        value={this.formPropsData[UPDATE_GENERAL_FIELD_KEY.FULLNAME]}
                        onChange={event => this.handleInputChange([UPDATE_GENERAL_FIELD_KEY.FULLNAME], event.target.value)}
                      />
                    </div>
                    <div className='col-6'>
                      <label className='form-label mb-3' htmlFor='email'>
                        <span className='text-black opacity-75'>Email</span>
                      </label>
                      <input
                        type='email'
                        className='form-control mb-3'
                        id='email'
                        name='email'
                        value={memberInfo.email}
                        disabled
                      />
                    </div>
                  </div>
                  <div className='d-flex align-items-center row'>
                    <div className='col-6'>
                      <label className='form-label mb-3' htmlFor='phone'>
                        <span className='text-black opacity-75'>Phone</span>
                      </label>
                      <input
                        type='tel'
                        className='form-control mb-3'
                        id='phone'
                        name='phone'
                        value={this.formPropsData[UPDATE_GENERAL_FIELD_KEY.PHONE]}
                        onChange={event => this.handleInputChange([UPDATE_GENERAL_FIELD_KEY.PHONE], event.target.value)}
                      />
                    </div>
                    <div className='col-6'>
                      <label className='form-label mb-3' htmlFor='birthday'>
                        <span className='text-black opacity-75'>Birthday</span>
                      </label>
                      <div className='form-control mb-3'>
                        <CustomizedDatePicker
                          handleOnChange={(date) => this.handleInputChange(UPDATE_GENERAL_FIELD_KEY.BIRTHDAY, date)}
                          defaultDate={memberInfo.birthday.substr(0, 10)} />
                      </div>
                    </div>
                  </div>
                  <div className='d-flex align-items-center row'>
                    <div className='col-6'>
                      <label className='form-label mb-3' htmlFor='address'>
                        <span className='text-black opacity-75'>Address 1</span>
                      </label>
                      <input
                        type='text'
                        className='form-control mb-3'
                        id='address'
                        name='address'
                        value={this.formPropsData[UPDATE_GENERAL_FIELD_KEY.ADDRESS]}
                        onChange={event => this.handleInputChange([UPDATE_GENERAL_FIELD_KEY.ADDRESS], event.target.value)}
                      />
                    </div>
                    <div className='col-6'>
                      <label className='form-label mb-3' htmlFor='address_2'>
                        <span className='text-black opacity-75'>Address 2</span>
                      </label>
                      <input
                        type='text'
                        className='form-control mb-3'
                        id='address_2'
                        name='address_2'
                        value={this.formPropsData[UPDATE_GENERAL_FIELD_KEY.ADDRESS_2]}
                        onChange={event => this.handleInputChange([UPDATE_GENERAL_FIELD_KEY.ADDRESS_2], event.target.value)}
                      />
                    </div>
                  </div>
                  <div className='d-flex align-items-center row'>
                    <div className='col-6'>
                      <label className='form-label mb-3' htmlFor='city'>
                        <span className='text-black opacity-75'>City</span>
                      </label>
                      <input
                        type='text'
                        className='form-control mb-3'
                        id='city'
                        name='city'
                        value={this.formPropsData[UPDATE_GENERAL_FIELD_KEY.CITY]}
                        onChange={event => this.handleInputChange([UPDATE_GENERAL_FIELD_KEY.CITY], event.target.value)}
                      />
                    </div>
                    <div className='col-6'>
                      <label className='form-label mb-3' htmlFor='state'>
                        <span className='text-black opacity-75'>State</span>
                      </label>
                      <input
                        type='text'
                        className='form-control mb-3'
                        id='state'
                        name='state'
                        value={this.formPropsData[UPDATE_GENERAL_FIELD_KEY.STATE]}
                        onChange={event => this.handleInputChange([UPDATE_GENERAL_FIELD_KEY.STATE], event.target.value)}
                      />
                    </div>
                  </div>
                  <div className='d-flex align-items-center row'>
                    <div className='col-6'>
                      <label className='form-label mb-3' htmlFor='country'>
                        <span className='text-black opacity-75'>Country</span>
                      </label>
                      <input
                        type='text'
                        className='form-control mb-3'
                        id='country'
                        name='country'
                        value={this.formPropsData[UPDATE_GENERAL_FIELD_KEY.COUNTRY]}
                        onChange={event => this.handleInputChange([UPDATE_GENERAL_FIELD_KEY.COUNTRY], event.target.value)}
                      />
                    </div>
                    <div className='col-6'>
                      <label className='form-label mb-3' htmlFor='zipcode'>
                        <span className='text-black opacity-75'>Zipcode</span>
                      </label>
                      <input
                        type='text'
                        className='form-control mb-3'
                        id='zipcode'
                        name='zipcode'
                        value={this.formPropsData[UPDATE_GENERAL_FIELD_KEY.ZIPCODE]}
                        onChange={event => this.handleInputChange([UPDATE_GENERAL_FIELD_KEY.ZIPCODE], event.target.value)}
                      />
                    </div>
                  </div>
                  <div className='d-flex align-items-center row'>
                    <div>
                      <button onClick={(e) => {
                        e.preventDefault();
                        this.validateInfoBeforeSending();
                      }}
                              className='btn d-flex align-items-center border-1 border-green bg-green rounded-2 ps-3 pe-2'>
                        <i className='text-white'>
                          <FontAwesomeIcon icon={faUserCog} />
                        </i>
                        <span className='flex-1 ps-2 text-white'>Update</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
          }
        </>
      );
    }
  },
);

export default witheProfileViewModel(UpdateGeneral);
