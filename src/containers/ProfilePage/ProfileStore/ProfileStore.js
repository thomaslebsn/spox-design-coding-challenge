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

  async updateGeneral(updateGeneralData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData = ProfileModel.convertSubmittedGeneralDataToAPIService(
        updateGeneralData,
      );

      let resultOnSave;
      const updateGeneralApiService = new EasiiMemberApiService();
      const accessToken = localStorage.getItem('access_token');
      let resultOnRefreshANewTokenOnBrowser = !!accessToken;

      if (!resultOnRefreshANewTokenOnBrowser) {
        resultOnRefreshANewTokenOnBrowser = await updateGeneralApiService.refreshANewTokenOnWebBrowser();
      }
      if (resultOnRefreshANewTokenOnBrowser) {
        resultOnSave = await updateGeneralApiService.updateMember(
          convertedUpdateGeneralData,
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

  async getMember(userSession, callbackOnSuccess, callbackOnError) {
    if (!userSession) return false;

    try {
      const results = true;

      if (results) {
        const getMemberInfoAPIService = new EasiiMemberApiService();
        const respondedData = await getMemberInfoAPIService.getMemberInfo(
          userSession
        );
        if (respondedData) {
          runInAction(() => {
            callbackOnSuccess(respondedData);
          });
        } else {
          callbackOnError({
            message: "Something went wrong from Server response",
          });
        }
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
