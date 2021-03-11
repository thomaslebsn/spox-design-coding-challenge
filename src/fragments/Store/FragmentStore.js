import { runInAction } from "mobx";
import { ProjectMasterDataModel } from "../../store/Models/MasterDataModels/ProjectMasterDataModel";

class FragmentStore {
  globalStore = null;
  constructor(args = {}) {
    if (args) {
      this.globalStore = args.globalStore ? args.globalStore : null;
    }
  }

  async getProjectMasterData(callbackOnSuccess, callbackOnError) {
    try {
      if (!this.globalStore) {
        runInAction(() => {
          callbackOnError({
            message: "Global Store is NULL",
          });
        });
      } else {
        await this.globalStore.getMasterData(
          {
            isForProjectMaster: true,
          },
          (result) => {
            const resultInModel = new ProjectMasterDataModel(
              result && result.projectMasterData
                ? result.projectMasterData
                : null
            );
            console.log(
              "AAAAA - FragmentStore - getProjectMasterData - RESULT"
            );
            console.log(resultInModel);
            if (resultInModel) {
              runInAction(() => {
                callbackOnSuccess(resultInModel);
              });
            } else {
              runInAction(() => {
                callbackOnError({
                  message:
                    "AAAAA - FragmentStore - getProjectMasterData - Something went wrong from Server response",
                });
              });
            }
          },
          (error) => {
            runInAction(() => {
              callbackOnError({
                message:
                  "BBBBBB - FragmentStore - getProjectMasterData - Something went wrong from Server response" +
                  error,
              });
            });
          }
        );
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}

export default FragmentStore;