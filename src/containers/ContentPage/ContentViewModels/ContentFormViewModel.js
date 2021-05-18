import { makeAutoObservable, runInAction } from 'mobx';
import { notify } from '../../../components/Toast';
import history from '../../../routes/history';

import PAGE_STATUS from '../../../constants/PageStatus';

class ContentFormViewModel {
  contentEditdata = null;
  editMode = false;
  contentListViewModel = null;
  contentConnectedChannelsViewModel = null;
  contentDisplayProjectNameInWizardStep3ViewModel = null;
  contentStore = null;
  contentFormComponent = null;

  publishContentConnectChannels = [
    {
      name: 'Social Media',
      media: [
        {
          avatar: '/assets/images/avatar-1.png',
          images: '/assets/images/facebook.png',
        },
        {
          avatar: '/assets/images/avatar-2.png',
          images: '/assets/images/twitter.png',
        },
        {
          avatar: '/assets/images/avatar-2.png',
          images: '/assets/images/linkedin.png',
        },
        {
          avatar: '/assets/images/avatar-1.png',
          images: '/assets/images/facebook.png',
        },
        {
          avatar: '/assets/images/avatar-1.png',
          images: '/assets/images/facebook.png',
        },
        {
          avatar: '/assets/images/avatar-1.png',
          images: '/assets/images/facebook.png',
        },
        {
          avatar: '/assets/images/avatar-1.png',
          images: '/assets/images/facebook.png',
        },
        {
          avatar: '/assets/images/avatar-1.png',
          images: '/assets/images/facebook.png',
        },
        {
          avatar: '/assets/images/avatar-1.png',
          images: '/assets/images/facebook.png',
        },
        {
          avatar: '/assets/images/avatar-1.png',
          images: '/assets/images/facebook.png',
        },
      ],
    },
    {
      name: 'Content Management System',
      media: [
        {
          avatar: '/assets/images/avatar-1.png',
          images: '/assets/images/facebook.png',
        },
      ],
    },
    {
      name: 'Email Marketing',
      media: [
        {
          avatar: '/assets/images/avatar-1.png',
          images: '/assets/images/facebook.png',
        },
      ],
    },
  ];

  formStatus = PAGE_STATUS.READY;

  constructor(contentStore) {
    console.log('[ContentFormViewModel] ...constructor ');
    console.log(contentStore);
    makeAutoObservable(this);
    this.contentStore = contentStore;
  }

  setContentListViewModel = (contentListViewModelInstance) => {
    this.contentListViewModel = contentListViewModelInstance;
  };

  setContentConnectedChannelsViewModel = (contentConnectedChannelsViewModel) => {
    this.contentConnectedChannelsViewModel = contentConnectedChannelsViewModel;
  };

  getContentConnectedChannelsViewModel = () => this.contentConnectedChannelsViewModel;

  setContentDisplayProjectNameInWizardStep3ViewModel = (
    contentDisplayProjectNameInWizardStep3ViewModel
  ) => {
    this.contentDisplayProjectNameInWizardStep3ViewModel = contentDisplayProjectNameInWizardStep3ViewModel;
  };

  getContentDisplayProjectNameInWizardStep3ViewModel = () =>
    this.contentDisplayProjectNameInWizardStep3ViewModel;

  setForm = (contentFormComponent) => {
    this.contentFormComponent = contentFormComponent;
  };

  setEditContent = (data) => {
    this.formStatus = PAGE_STATUS.READY;
    console.log('setEditContent');
    console.log(data[0]);
    this.contentFormComponent.populatingFormDataHandler(data[0]);
  };

  getContent = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.contentStore.getContent(id, this.setEditContent, this.callbackOnErrorHander);
  };

  post = (data) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.contentStore.saveContent(data, this.callbackOnSuccessHandler, this.callbackOnErrorHander);
  };

  callbackOnErrorHander = (error) => {
    console.log('callbackOnErrorHander');
    console.log(error);
    this.formStatus = PAGE_STATUS.READY;
    notify(error);
  };

  callbackOnSuccessHandler = () => {
    console.log('callbackOnSuccessHandler');
    this.formStatus = PAGE_STATUS.READY;
    // Return list page
    history.push('/content');
  };
}

export default ContentFormViewModel;
