import React from "react";

import "./scss/app.scss";

import RouterLayout from "./layouts/RouterLayout";
import { GlobalStore, GlobalStoreContextProvider } from "./store/Store";

const globalStore = new GlobalStore();

class App extends React.Component {
  render() {
    return (
      <GlobalStoreContextProvider globalStore={globalStore}>
        <RouterLayout />
      </GlobalStoreContextProvider>
    );
  }
}

export default App;
