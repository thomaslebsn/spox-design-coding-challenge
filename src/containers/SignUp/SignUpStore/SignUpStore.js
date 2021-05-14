import { EasiiMemberApiService } from 'easii-io-web-service-library';
import { runInAction } from 'mobx';
import SignUpModel from '../SignUpModel/SignUpModel';

export default class SignUpStore {
  async saveMember(signUpData, callbackOnSuccess, callbackOnError) {
    try {
      console.log('Saving Project via call web service lib function');
      console.log(signUpData);

      const convertedSignUpData = SignUpModel.convertSubmittedDataToAPIService(
        signUpData,
      );
      console.log('SignUp Converted Data');
      console.log(convertedSignUpData);

      const signupAPIService = new EasiiMemberApiService();

      let resultOnSave = await signupAPIService.createMember(
        convertedSignUpData
      );

      console.log('resultOnSave ', resultOnSave);

      if (resultOnSave) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave);
        });
      } else {
        runInAction(() => {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
