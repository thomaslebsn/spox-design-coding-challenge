import React, { Component, lazy } from 'react';
import { observer } from 'mobx-react';
import PAGE_STATUS from '../../../constants/PageStatus';
import { withBillingPlanViewModel } from '../BillingPlanViewModel/BillingPlanViewModelContextProvider';

import Spinner from '../../../components/Spinner';
import ComponentBillingPlan from '../../../components/ComponentBillingPlan';
import ComponentPlanPayment from '../../../components/ComponentPlanPayment';

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
    }

    componentDidMount() {
      console.log('init data');
      const script = document.createElement('script');
      script.src = 'https://cdn.paddle.com/paddle/paddle.js';
      script.async = true;
      document.body.appendChild(script);
      let that = this;
      //get subscription detail
      this.billingPlanListViewModel.initializeDataMemberSubscriptionDetail(() => {
        console.log('setup - forceUpdate');
        that.forceUpdate();
      });
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
      const { tableStatus, isDisable, show, subscriptionDetail } = this.billingPlanListViewModel;

      let planName =
        (subscriptionDetail &&
          subscriptionDetail.valid &&
          subscriptionDetail.plan_name.toLowerCase()) ||
        'free';
      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <div>
          {subscriptionDetail != null && subscriptionDetail.paddle_status == 'active' && (
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

          {(subscriptionDetail == null ||
            (subscriptionDetail != null && subscriptionDetail.paddle_status == 'deleted')) && (
            <div className="mb-4">
              <ComponentBillingPlan
                handleSelectSubscriptionPlan={this.handleSelectSubscriptionPlan}
                isDisable={isDisable ? isDisable : null}
                planName={planName}
              />
            </div>
          )}
          <ModalComponent
            show={show}
            onHide={this.billingPlanListViewModel.closeModal}
            dialogClassName="modal-fullscreen modal_billing_plan"
            body={
              <ComponentBillingPlan
                handleSelectSubscriptionPlan={this.handleSelectSubscriptionPlan}
                isDisable={isDisable ? isDisable : null}
                planName={planName}
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
