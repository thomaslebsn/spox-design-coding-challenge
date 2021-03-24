import React, { Component } from "react";
import { observer } from "mobx-react";
import PAGE_STATUS from "../../../constants/PageStatus";
import { withBillingPlanViewModel } from "../BillingPlanViewModel/BillingPlanViewModelContextProvider";

import Spinner from "../../../components/Spinner";
import ComponentBillingPlan from "../../../components/ComponentBillingPlan";

const BillingPlanList = observer(
  class BillingPlanList extends Component {
    billingPlanListViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel } = props;
      console.log("BillingPlanList - Debug View Model");
      console.log(viewModel);

      this.billingPlanListViewModel = viewModel
        ? viewModel.getBillingPlanListViewModel()
        : null;

      console.log("this.billingPlanListViewModel - Debug View Model");
      console.log(this.billingPlanListViewModel);
    }

    componentDidMount() {
      const script = document.createElement("script");
      script.src = "https://cdn.paddle.com/paddle/paddle.js";
      script.async = true;
      document.body.appendChild(script);
    }

    handleSelectSubscriptionPlan = (planName) => {
      this.billingPlanListViewModel.getPayLinkModel(planName);
    };

    render() {
      const { tableStatus, isDisable } = this.billingPlanListViewModel;

      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <ComponentBillingPlan
          handleSelectSubscriptionPlan={this.handleSelectSubscriptionPlan}
          isDisable={isDisable ? isDisable : null}
        />
      );
    }
  }
);

export default withBillingPlanViewModel(BillingPlanList);
