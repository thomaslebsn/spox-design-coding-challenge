import { EasiiMemberApiService } from 'easii-io-web-service-library';
import { runInAction } from 'mobx';
import SignUpModel from '../SignUpModel/SignUpModel';
import { notify } from '../../../components/Toast';
import { SIGNUP_FIELD_KEY } from '../../../constants/SignUpModule';

export default class SignUpStore {
  async saveMember(signUpData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedSignUpData = SignUpModel.convertSubmittedDataToAPIService(
        signUpData,
      );
      let resultOnSave;
      const signupAPIService = new EasiiMemberApiService();
      const accessToken = localStorage.getItem('access_token');
      let resultOnRefreshANewTokenOnBrowser = !!accessToken;
      if(!resultOnRefreshANewTokenOnBrowser){
        resultOnRefreshANewTokenOnBrowser = await signupAPIService.refreshANewTokenOnWebBrowser();
      }
      if(resultOnRefreshANewTokenOnBrowser){
        resultOnSave = await signupAPIService.createMember(
          convertedSignUpData
        );
        resultOnSave = JSON.parse(resultOnSave);
      }

      if (resultOnSave.result.success) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave);
        });
      } else {
        runInAction(() => {
          callbackOnError(resultOnSave)
        })
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
