import { EasiiMemberApiService } from 'easii-io-web-service-library';
import { runInAction } from 'mobx';

export default class ActivateMemberStore {
  async activateMember(activationData, callbackOnSuccess, callbackOnError) {
    try {
      let resultOnSave;
      const activateMemberAPIService = new EasiiMemberApiService();
      const accessToken = localStorage.getItem('access_token');
      let resultOnRefreshANewTokenOnBrowser = !!accessToken;
      if(!resultOnRefreshANewTokenOnBrowser){
        resultOnRefreshANewTokenOnBrowser = await activateMemberAPIService.refreshANewTokenOnWebBrowser();
      }
      if(resultOnRefreshANewTokenOnBrowser){
        resultOnSave = await activateMemberAPIService.activateMember(
          activationData
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
