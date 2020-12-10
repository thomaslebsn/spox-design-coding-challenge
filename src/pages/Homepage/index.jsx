import React from "react";

import "./index.scss";
import Complete from "../../components/Complete";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="py-4 px-3">
        <div>
          <h2 className="mb-3 fw-normal text-blue-0">Good morning, <strong className="fw-bold">William White</strong></h2>
          <Complete />
        </div>
      </div>
    );
  }
}

export default HomePage;
