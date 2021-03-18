import React, { Component } from "react";
import { observer } from "mobx-react";
import PAGE_STATUS from "../../../constants/PageStatus";
import { withCalendarViewModel } from "../CalendarViewModels/CalendarViewModelContextProvider";
import Spinner from "../../../components/Spinner";
import BigCalendarFull from "../../../components/BigCalendarFull";

const CalendarList = observer(
  class CalendarList extends Component {
    constructor(props) {
      super(props);
      const { viewModel } = props;
      console.log("CalendarList - Debug View Model");
      console.log(viewModel);

      this.calendarListViewModel = viewModel
        ? viewModel.getCalendarListViewModel()
        : null;
    }

    componentDidMount() {
      this.calendarListViewModel.initializeData();
    }

    render() {
      const { tableStatus } = this.calendarListViewModel;

      return tableStatus === PAGE_STATUS.LOADING ? (
        <Spinner />
      ) : (
        <div className="py-4 px-3 h-100">
          <div className="wrapper_calendar wrapper_calendar_full h-100">
            <BigCalendarFull />
          </div>
        </div>
      );
    }
  }
);

export default withCalendarViewModel(CalendarList);
