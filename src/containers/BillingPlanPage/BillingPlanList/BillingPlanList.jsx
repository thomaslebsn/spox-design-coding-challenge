import React, { Component, lazy } from 'react';
import { observer } from 'mobx-react';
import PAGE_STATUS from '../../../constants/PageStatus';
import { withBillingPlanViewModel } from '../BillingPlanViewModel/BillingPlanViewModelContextProvider';

import Spinner from '../../../components/Spinner';
import ComponentBillingPlan from '../../../components/ComponentBillingPlan';
import ComponentPlanPayment from '../../../components/ComponentPlanPayment';
import ComponentInvoices from '../../../components/ComponentInvoices';
import ComponentBillingInfo from '../../../components/ComponentBillingInfo'
import { CHANNEL_ADS_GOOGLE } from '../../../constants/ChannelModule';
import './index.scss';

const ModalComponent = lazy(() => import('../../../components/Modal'));

const BillingPlanList = observer(
  class BillingPlanList extends Component {
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

    handleSelectSubscriptionPlan = (planName) => {
      this.billingPlanListViewModel.getPayLinkModel(planName);
    };

    handleChangePlan = () => {
      this.billingPlanListViewModel.openModal();
    };

    handleCancelPlan = () => {
      this.billingPlanListViewModel.cancelPlan();
    };

    render() {
      const {
        tableStatus,
        isDisable,
        show,
        hideChangePlanTable,
        subscriptionDetail,
        invoices,
        uploadHistoryQuotas
      } = this.billingPlanListViewModel;
      const {
        cmsFeaturesMasterData,
        countCMSConnected,
        countAdvertisingConnected,
        countEmailMarketingConnected,
        countSocialMediaConnected,
      } = this.channelsListViewModel;
      console.log('data', cmsFeaturesMasterData)
      console.log('================ subscriptionDetail');
      console.log(invoices);
      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <div>
          {hideChangePlanTable && subscriptionDetail !== null && (
            <div className="mb-4">
              <div className="py-3 bg-white d-inline-block">
                <ComponentPlanPayment
                  subscriptionDetail={subscriptionDetail}
                  handleChangePlan={this.handleChangePlan}
                  handleCancelPlan={this.handleCancelPlan}
                />
              </div>
            </div>
          )}

          {!hideChangePlanTable && (
            <div className="mb-4">
              <ComponentBillingPlan
                handleSelectSubscriptionPlan={this.handleSelectSubscriptionPlan}
                isDisable={isDisable ? isDisable : null}
                subscriptionDetail={subscriptionDetail}
              />
            </div>
          )}
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
          <div>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="text-blue-0 mb-0">Invoices</h2>
            </div>
            {invoices && <ComponentInvoices data={invoices} />}
          </div>
          <ModalComponent
            show={show}
            onHide={this.billingPlanListViewModel.closeModal}
            dialogClassName="modal-fullscreen modal_billing_plan"
            body={
              <ComponentBillingPlan
                handleSelectSubscriptionPlan={this.handleSelectSubscriptionPlan}
                isDisable={isDisable ? isDisable : null}
                subscriptionDetail={subscriptionDetail}
              />
            }
            key={Math.random(40, 200)}
          />
        </div>
      );
    }
  }
);

export default withBillingPlanViewModel(BillingPlanList);
