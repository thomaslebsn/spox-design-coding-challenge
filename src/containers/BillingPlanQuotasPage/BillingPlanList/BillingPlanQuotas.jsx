import React, { Component, lazy } from 'react';
import { observer } from 'mobx-react';
import PAGE_STATUS from '../../../constants/PageStatus';
import { withBillingPlanViewModel } from '../BillingPlanViewModel/BillingPlanViewModelContextProvider';

import Spinner from '../../../components/Spinner';
import ComponentBillingInfo from '../../../components/ComponentBillingInfo'
import { CHANNEL_ADS_GOOGLE } from '../../../constants/ChannelModule';
import './index.scss';

const ModalComponent = lazy(() => import('../../../components/Modal'));

const BillingPlanQuotas = observer(
  class BillingPlanQuotas extends Component {
    billingPlanListViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel } = props;
      console.log('BillingPlanList - Debug View Model');
      console.log(viewModel);

      this.billingPlanListViewModel = viewModel ? viewModel.getBillingPlanListViewModel() : null;
      this.channelsListViewModel = viewModel ? viewModel.getChannelsListViewModel() : null;
      this.channelsListViewModel.checkConnectedChannels([
        'linkedin',
        'youtube',
        'twitter',
        'instagram',
        'facebook',
        'mailchimp',
        'wordpress',
        'tumblr',
        'drupal',
        'medium',
        'joomla',
        'fbad',
        CHANNEL_ADS_GOOGLE,
        'google_my_business',
      ]);
      console.log('lala',this.channelsListViewModel.countCMSConnected)
    }

    componentDidMount() {
      console.log('init data');
      const script = document.createElement('script');
      script.src = 'https://cdn.paddle.com/paddle/paddle.js';
      script.async = true;
      document.body.appendChild(script);

      //get subscription detail
      this.billingPlanListViewModel.initializeData();
      this.channelsListViewModel.resetObservableProperties();
      this.channelsListViewModel.initMemberFeaturesMasterData();
    }

    render() {
      const {
        tableStatus,
        subscriptionDetail,
        uploadHistoryQuotas
      } = this.billingPlanListViewModel;
      const {
        cmsFeaturesMasterData,
        countCMSConnected,
        countAdvertisingConnected,
        countEmailMarketingConnected,
        countSocialMediaConnected,
      } = this.channelsListViewModel;
      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <div>
          <div>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="text-blue-0 mb-0">Quotas</h2>
            </div>
            {uploadHistoryQuotas && <ComponentBillingInfo
              subscriptionDetail={subscriptionDetail}
              uploadHistoryQuotas={uploadHistoryQuotas}
              countSocialMediaConnected={countSocialMediaConnected}
              countAdvertisingConnected={countAdvertisingConnected}
              countCMSConnected={countCMSConnected}
              countEmailMarketingConnected={countEmailMarketingConnected}
              cmsFeaturesMasterData={cmsFeaturesMasterData}
            />}
          </div>
        </div>
      );
    }
  }
);

export default withBillingPlanViewModel(BillingPlanQuotas);
