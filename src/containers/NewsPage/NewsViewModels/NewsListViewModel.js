import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import NewsUtils from '../NewsUtils/NewsUtils';
import { PROJECT_COLUMN_INDICATOR } from '../../../constants/NewsModule';
import { notify } from '../../../components/Toast';
class NewsListViewModel {
  projectStore = null;

  projects = null;

  pagination = null;

  tableRowHeader = null;

  tableStatus = PAGE_STATUS.LOADING;

  projectIdsSelected = null;

  dataFilter = null;

  facebookConnected = false;

  facebookAdsConnected = false;

  youtubeConnected = false;

  twitterConnected = false;

  linkedinConnected = false;

  mailchimpConnected = false;

  instagramConnected = false;

  wordpressConnected = false;

  listFaceBookFanpage = null;

  listFaceBookFanpageView = null;

  listFacebookFanpageConnected = null;

  listFacebookAdsAccount = null;

  listFacebookAdsAccountView = null;

  showModalCMS = true;

  isList = true;

  pageSize = 5;

  constructor(projectStore) {
    makeAutoObservable(this);
    this.projectStore = projectStore;
  }

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.projectStore.fetchNews(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      0,
      this.pageSize
    );
  };

  refreshTableNewsList = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.projectStore.fetchNews(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      0,
      this.pageSize
    );
  };

  deleteNews = () => {
    let getArrayId = this.projectIdsSelected;

    if (getArrayId === null) {
      notify('Please true add list an item for delete');
    } else {
      this.tableStatus = PAGE_STATUS.LOADING;

      this.projectStore.deleteNews(
        this.projectIdsSelected,
        this.refreshTableNewsList,
        this.callbackOnErrorHander
      );
    }
  };

  getPagination = (paginationStep, isList) => {
    console.log('paginationStep', paginationStep);
    this.tableStatus = PAGE_STATUS.LOADING;
    this.isList = isList;
    this.projectStore.fetchNews(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      paginationStep,
      this.pageSize
    );
  };

  searchNews = (dataFilter) => {
    this.dataFilter = dataFilter;

    this.projectStore.searchNews(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      dataFilter
    );
  };

  callbackOnErrorHander = (error) => {
    console.log('callbackOnErrorHander');
    console.log(error);
    // notify(error.message);
  };

  callbackOnSuccessHandler = (projectModelData) => {
    console.log('callbackOnSuccessHandler');
    console.log(projectModelData);
    if (projectModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      const rowDataTransformed = NewsUtils.transformNewsModelIntoTableDataRow(
        projectModelData.list
      );

      console.log('Row Data is Formatted');
      console.log(rowDataTransformed);

      this.projects = rowDataTransformed;
      this.pagination = projectModelData.pagination;
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default NewsListViewModel;
