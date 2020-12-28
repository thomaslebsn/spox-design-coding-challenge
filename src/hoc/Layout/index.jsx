import React, { Component } from "react";

import Aux from "../Aux/Aux";
import Header from "../../containers/Header";
import SbarLeft from "../../containers/SbarLeft";

class Layout extends Component {
  render() {
    let { fullPage, settingPage } = this.props;

    return (
      <Aux>
        <div className="main-panel">
          <div className="container-fluid">
            <div className="row">
              <main className={`${!fullPage ? "p-0" : ""}`}>
                {!fullPage && <Header />}
                <div
                  className={`main_content vh-100 ${
                    !fullPage ? "main_content_dashboard pd-t-80 d-flex" : ""
                  }`}
                >
                  {!fullPage && <SbarLeft settingPage={settingPage} />}
                  <div
                    className={`${
                      !fullPage
                        ? "flex-1 border-start-1 border-gray bg-blue mh-100 overflow-hidden overflow-y-auto"
                        : ""
                    }`}
                  >
                    {this.props.children}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default Layout;
