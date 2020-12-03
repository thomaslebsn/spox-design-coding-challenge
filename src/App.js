import React from "react";

import "./scss/app.scss";

class App extends React.Component {
  render() {
    return <div className="container-fluid">{this.props.children}</div>;
  }
}

export default App;
