import React from 'react';
import { observer } from 'mobx-react';
import { withActivateMemberViewModel } from '../ActivateMemberViewModel/ActivateMemberContextProvider';

const ActivateMemberLoading = observer(
  class ActivateMemberLoading extends React.Component {
    activateMemberLoadingViewModel = null;
    activationData = {
      'activation_code': '',
    };

    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.activateMemberLoadingViewModel = viewModel
        ? viewModel.getActivateMemberLoadingFormViewModel()
        : null;
      this.activateMemberLoadingViewModel.setValue(this);
    }

    activateMemberHandler = () => {
      this.activateMemberLoadingViewModel.activateMemberOnPage();
    };

    render() {
      return (
        <button onClick={this.activateMemberHandler}>
          Click
        </button>
      );
    }
  },
);

export default withActivateMemberViewModel(ActivateMemberLoading);