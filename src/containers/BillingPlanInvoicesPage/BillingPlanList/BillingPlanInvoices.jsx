import React, { Component, lazy } from 'react';
import { observer } from 'mobx-react';
import PAGE_STATUS from '../../../constants/PageStatus';
import { withBillingPlanViewModel } from '../BillingPlanViewModel/BillingPlanViewModelContextProvider';

import Spinner from '../../../components/Spinner';
import ComponentInvoices from '../../../components/ComponentInvoices';
import './index.scss';

const ModalComponent = lazy(() => import('../../../components/Modal'));

const BillingPlanInvoices = observer(
  class BillingPlanInvoices extends Component {
    billingPlanListViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel } = props;

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

    render() {
      const {
        tableStatus,
        invoices,
      } = this.billingPlanListViewModel;
      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <div>
          <div>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="text-blue-0 mb-0">Invoices</h2>
            </div>
            {invoices && <ComponentInvoices data={invoices} />}
          </div>
        </div>
      );
    }
  }
);

export default withBillingPlanViewModel(BillingPlanInvoices);
