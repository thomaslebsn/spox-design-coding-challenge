import React, { Component, lazy } from 'react';
import { observer } from 'mobx-react';
import PAGE_STATUS from '../../../constants/PageStatus';
import { withBillingPlanViewModel } from '../BillingPlanViewModel/BillingPlanViewModelContextProvider';

import Spinner from '../../../components/Spinner';
import ComponentBillingPlan from '../../../components/ComponentBillingPlan';
import ComponentPlanPayment from '../../../components/ComponentPlanPayment';
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
    }

    componentDidMount() {
      console.log('init data');
      const script = document.createElement('script');
      script.src = 'https://cdn.paddle.com/paddle/paddle.js';
      script.async = true;
      document.body.appendChild(script);

      //get subscription detail
      this.billingPlanListViewModel.initializeData();
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
      } = this.billingPlanListViewModel;
      console.log("subscriptionDetaillala", subscriptionDetail)
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
