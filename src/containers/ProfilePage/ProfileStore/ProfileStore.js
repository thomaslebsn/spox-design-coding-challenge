import { EasiiMemberApiService } from 'easii-io-web-service-library';
import { runInAction } from 'mobx';
import ProfileModel from '../ProfileModel/ProfileModel';

export default class ProfileStore {
  async updatePassword(updatePasswordData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdatePasswordData = ProfileModel.convertSubmittedPasswordDataToAPIService(
        updatePasswordData,
      );

      let resultOnSave;
      const updatePasswordApiService = new EasiiMemberApiService();
      const accessToken = localStorage.getItem('access_token');
      let resultOnRefreshANewTokenOnBrowser = !!accessToken;

      if (!resultOnRefreshANewTokenOnBrowser) {
        resultOnRefreshANewTokenOnBrowser = await updatePasswordApiService.refreshANewTokenOnWebBrowser();
      }
      if (resultOnRefreshANewTokenOnBrowser) {
        resultOnSave = await updatePasswordApiService.updateMemberPassword(
          convertedUpdatePasswordData,
        );
      }

      if (resultOnSave.result.success) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave);
        });
      } else {
        runInAction(() => {
          callbackOnError(resultOnSave);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async updateGeneral(updatePasswordData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdatePasswordData = ProfileModel.convertSubmittedPasswordDataToAPIService(
        updatePasswordData,
      );

      let resultOnSave;
      const updatePasswordApiService = new EasiiMemberApiService();
      const accessToken = localStorage.getItem('access_token');
      let resultOnRefreshANewTokenOnBrowser = !!accessToken;

      if (!resultOnRefreshANewTokenOnBrowser) {
        resultOnRefreshANewTokenOnBrowser = await updatePasswordApiService.refreshANewTokenOnWebBrowser();
      }
      if (resultOnRefreshANewTokenOnBrowser) {
        resultOnSave = await updatePasswordApiService.updateMemberPassword(
          convertedUpdatePasswordData,
        );
        resultOnSave = JSON.parse(resultOnSave);
      }

      if (resultOnSave.result.success) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave);
        });
      } else {
        runInAction(() => {
          callbackOnError(resultOnSave);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

}
