import React, { Component } from "react";

class ContentFormPublish extends Component {
  constructor(props) {
    super(props);

    this.viewModel = this.props.viewModel;
  }

  render() {
    console.log("[Content - FormPublish] - re-render .........");

    return (
      <div className="bg-white p-4">
        <div className="col-6">
          <h3 className="mb-4">Publish</h3>
        </div>
      </div>
    );
  }
}
export default ContentFormPublish;
