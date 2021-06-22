import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { UPDATE_GENERAL_FIELD_KEY } from '../../../constants/ProfileModule';

class UpdateGeneralViewModel {
  profileStore = null;
  formStatus = PAGE_STATUS.READY;
  updateGeneralViewModel = null;
  memberInfo = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(profileStore) {
    makeAutoObservable(this);
    this.profileStore = profileStore;
  }

  setAllValue = (updateGeneralViewModel) => {
    this.updateGeneralViewModel = updateGeneralViewModel;
  };

  initializeData = () => {
    this.profileStore.getMember(
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.ID],
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
    );
  };

  saveGeneralInformationOnPage = () => {
    this.profileStore.updateGeneral(
      this.updateGeneralViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
    );
  };

  callbackOnErrorHandler = (error) => {
    notify('Update unsuccessfully', 'error');
    console.log('error');
    console.log(error);
    this.successResponse.state = false;
    this.successResponse.content_id = error.result.content_id;
  };

  callbackOnSuccessHandler = (result) => {
    if (result.id) { // get member info
      this.memberInfo = result;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.FULLNAME] = result.full_name
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.BIRTHDAY] = result.birthday.substr(0, 10) + " 00:00:00";
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.PHONE] = result.phone;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.ADDRESS] = result.address;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.ADDRESS_2] = result.address_2;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.ZIPCODE] = result.zipcode;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.CITY] = result.city;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.STATE] = result.state;
      this.updateGeneralViewModel.formPropsData[UPDATE_GENERAL_FIELD_KEY.COUNTRY] = result.country;
    }
    else {
      notify('Update successfully', 'success');
    }
  };
}

export default UpdateGeneralViewModel;