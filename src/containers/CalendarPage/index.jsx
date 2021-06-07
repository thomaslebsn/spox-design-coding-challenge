import React from "react";
import CalendarList from "./CalendarList/CalendarList";
import CalendarStore from "./CalendarStore/CalendarStore";
import CalendarViewModel from "./CalendarViewModels/CalendarViewModel";
import { CalendarViewModelContextProvider } from "./CalendarViewModels/CalendarViewModelContextProvider";

const calendarStore = new CalendarStore();
const calendarViewModel = new CalendarViewModel(calendarStore);

class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CalendarViewModelContextProvider viewModel={calendarViewModel}>
        <CalendarList />
      </CalendarViewModelContextProvider>
    );
  }
}

export default CalendarPage;
