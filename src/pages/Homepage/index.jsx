import React from "react";

import "./index.scss";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="py-4 px-3">
        <div className="d-flex align-items-center">
          <h2 className="mb-0 fw-normal text-blue-0">Good morning, <strong className="fw-bold">William White</strong></h2>
        </div>
      </div>
    );
  }
}

export default HomePage;
