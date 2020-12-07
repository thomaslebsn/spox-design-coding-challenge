import React from "react";

import Header from "./containers/Header";
import SbarLeft from "./containers/SbarLeft";

import "./scss/app.scss";

class App extends React.Component {
  render() {
    let pathName = window.location.pathname;
    let checkPathName = (pathName == "/login" || pathName == "/signup" || pathName == "/forgot-password");
    return (
      <div className="main-panel">
        <div className="container-fluid">
            <div className="row">
              <div>
                {
                  !checkPathName && (
                    <SbarLeft />
                  )
                }
                <div className="content">
                  {
                    !(checkPathName) && (
                      <Header />
                    )
                  }
                  {this.props.children}
                </div>
              </div>
            </div>
        </div>
        
      </div>
    );
  }
}

export default App;
