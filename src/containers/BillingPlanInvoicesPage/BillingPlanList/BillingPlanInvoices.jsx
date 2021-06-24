import React, { Component, lazy } from 'react';
import { observer } from 'mobx-react';
import { withBillingPlanViewModel } from '../../BillingPlanPage/BillingPlanViewModel/BillingPlanViewModelContextProvider';
import Spinner from '../../../components/Spinner';
import ComponentInvoices from '../../../components/ComponentInvoices';

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
      // get subscription detail
      this.billingPlanListViewModel.initializeDataMemberInvoices();
    }

    render() {
      const { invoices } = this.billingPlanListViewModel;

      return invoices == null ? (
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
