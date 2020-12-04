import React from "react";

import Header from "./containers/Header";
import SbarLeft from "./containers/SbarLeft";

import "./scss/app.scss";

class App extends React.Component {
  render() {
    return (
      <div className="main-panel">
        <SbarLeft />
        <div className="content">
          <div className="container-fluid">
            <Header />
            <div className="row">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
