import React from "react";

import Header from "./containers/Header";
import SbarLeft from "./containers/SbarLeft";

import "./scss/app.scss";

class App extends React.Component {
  render() {
    let pathName = window.location.pathname;
    let checkPathName =
      pathName == "/login" ||
      pathName == "/signup" ||
      pathName == "/forgot-password" ||
      pathName == "/verify";
    return (
      <div className="main-panel">
        <div className="container-fluid">
          <div className="row">
            <div className={`wrapper_content ${!checkPathName ? "p-0" : ""}`}>
              {!checkPathName && <Header />}
              <div
                className={`main_content vh-100 ${
                  !checkPathName ? "main_content_dashboard pd-t-80 d-flex" : ""
                }`}
              >
                {!checkPathName && <SbarLeft />}
                <div
                  className={`content ${
                    !checkPathName
                      ? "flex-auto flex-1 border-start-1 border-gray"
                      : ""
                  }`}
                >
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
